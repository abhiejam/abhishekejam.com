"use server";

import { createHmac } from "node:crypto";
import { headers } from "next/headers";
import { db } from "@/lib/db";

export type WaitlistState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string };

const RATE_LIMIT_PER_HOUR = 5;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const SOURCE_PATTERN = /^[a-z0-9_-]{1,32}$/;
const GENERIC_ERROR = "Something went wrong. Please try again.";

export async function joinWaitlist(
  _previous: WaitlistState,
  formData: FormData,
): Promise<WaitlistState> {
  // Honeypot: real visitors never see this field. Bots get a fake success.
  if (String(formData.get("website") ?? "") !== "") {
    return { status: "success" };
  }

  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  if (email.length > 254 || !EMAIL_PATTERN.test(email)) {
    return { status: "error", message: "Enter a valid email address" };
  }

  const ref = String(formData.get("ref") ?? "").toLowerCase();
  const source = SOURCE_PATTERN.test(ref) ? ref : "direct";

  const salt = process.env.WAITLIST_IP_SALT;
  if (!salt) {
    console.error("[waitlist] WAITLIST_IP_SALT is not set");
    return { status: "error", message: GENERIC_ERROR };
  }

  const ip =
    (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown";
  const ipHash = createHmac("sha256", salt).update(ip).digest("hex");

  try {
    const sql = db();
    const [{ attempts }] = (await sql`
      select count(*)::int as attempts from waitlist_attempts
      where ip_hash = ${ipHash} and created_at > now() - interval '1 hour'
    `) as { attempts: number }[];
    if (attempts >= RATE_LIMIT_PER_HOUR) {
      return {
        status: "error",
        message: "Too many sign-ups from this network. Try again in an hour.",
      };
    }

    // Duplicates are ignored and get the same success message, so the form
    // never reveals who is already on the list.
    await sql.transaction([
      sql`insert into waitlist_attempts (ip_hash) values (${ipHash})`,
      sql`insert into waitlist (email, source) values (${email}, ${source})
          on conflict (email) do nothing`,
      sql`delete from waitlist_attempts where created_at < now() - interval '1 day'`,
    ]);
  } catch (error) {
    // Never log the submitted address.
    console.error(
      "[waitlist] insert failed:",
      error instanceof Error ? error.name : "unknown",
    );
    return { status: "error", message: GENERIC_ERROR };
  }

  return { status: "success" };
}
