"use client";

import { useActionState, useEffect, useState } from "react";
import { joinWaitlist, type WaitlistState } from "@/app/airmic/actions";
import { airmic } from "@/content/airmic";
import { trackConversion } from "@/lib/analytics";

const initialState: WaitlistState = { status: "idle" };

export function WaitlistForm() {
  const { waitlist } = airmic;
  const [state, formAction, pending] = useActionState(
    joinWaitlist,
    initialState,
  );
  const [email, setEmail] = useState("");
  // Read ?ref= on the client so the page itself can stay static.
  const [ref, setRef] = useState("");

  useEffect(() => {
    setRef(new URLSearchParams(window.location.search).get("ref") ?? "");
  }, []);

  useEffect(() => {
    if (state.status === "success") {
      trackConversion("airmic_waitlist_join", "airmic_waitlist");
    }
  }, [state.status]);

  if (state.status === "success") {
    return (
      <p
        role="status"
        className="rounded-[10px] border border-border bg-surface px-5 py-4 text-lg font-semibold"
      >
        {waitlist.success}
      </p>
    );
  }

  const error = state.status === "error" ? state.message : undefined;

  return (
    <div className="flex flex-col gap-2.5">
      <form
        action={formAction}
        noValidate
        className="flex flex-col gap-2.5 sm:flex-row"
      >
        <label htmlFor="waitlist-email" className="sr-only">
          Your email
        </label>
        <input
          id="waitlist-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="Your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "waitlist-error" : undefined}
          className="h-[50px] min-h-[50px] min-w-0 rounded-[10px] border border-border-strong bg-surface px-4 text-base outline-none focus-visible:border-airmic aria-invalid:border-error sm:flex-1"
        />
        <input type="hidden" name="ref" value={ref} />
        <div
          aria-hidden="true"
          className="absolute -left-[9999px] h-px w-px overflow-hidden"
        >
          <label htmlFor="waitlist-website">Website</label>
          <input
            id="waitlist-website"
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            defaultValue=""
          />
        </div>
        <button
          type="submit"
          disabled={pending}
          className="h-[50px] cursor-pointer rounded-[10px] bg-airmic px-6 text-base font-semibold text-on-airmic transition-opacity hover:opacity-90 disabled:cursor-wait disabled:opacity-70"
        >
          {pending ? "Joining…" : waitlist.cta}
        </button>
      </form>
      {error && (
        <p id="waitlist-error" role="alert" className="text-sm text-error">
          {error}
        </p>
      )}
      <p className="text-sm text-muted">{waitlist.note}</p>
    </div>
  );
}
