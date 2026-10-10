import { neon } from "@neondatabase/serverless";

let client: ReturnType<typeof neon> | undefined;

// Created on first use so builds don't need DATABASE_URL.
export function db() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");
  client ??= neon(process.env.DATABASE_URL);
  return client;
}
