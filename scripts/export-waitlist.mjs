// Prints the AirMic waitlist as CSV. Runs locally only; there is no export endpoint.
//   DATABASE_URL='<production url>' pnpm waitlist:export > waitlist.csv
import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set.");
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);
const rows = await sql`
  select email, source, created_at from waitlist order by created_at
`;

const cell = (value) => {
  const text = value instanceof Date ? value.toISOString() : String(value);
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
};

process.stdout.write("email,source,created_at\n");
for (const row of rows) {
  process.stdout.write(
    `${[row.email, row.source, row.created_at].map(cell).join(",")}\n`,
  );
}
console.error(`${rows.length} rows`);
