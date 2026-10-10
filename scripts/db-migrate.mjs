// Applies db/schema.sql to the database in DATABASE_URL.
// Defaults to .env.local (the dev branch). Production only by passing its URL explicitly.
import { readFile } from "node:fs/promises";
import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set. Add it to .env.local.");
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);
const schema = await readFile(
  new URL("../db/schema.sql", import.meta.url),
  "utf8",
);
const statements = schema
  .replace(/--.*$/gm, "")
  .split(";")
  .map((statement) => statement.trim())
  .filter(Boolean);

for (const statement of statements) {
  await sql.query(statement);
}
console.log(
  `Applied ${statements.length} statements to ${new URL(process.env.DATABASE_URL).host}`,
);
