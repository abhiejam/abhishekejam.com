-- AirMic App Store waitlist. Safe to re-run.

create table if not exists waitlist (
  id bigint generated always as identity primary key,
  email text not null unique check (email = lower(trim(email))),
  source text not null default 'direct',
  created_at timestamptz not null default now()
);

-- One row per sign-up attempt, keyed by a salted hash of the visitor's IP so
-- raw IPs are never stored. Rows older than a day are pruned on insert.
create table if not exists waitlist_attempts (
  id bigint generated always as identity primary key,
  ip_hash text not null,
  created_at timestamptz not null default now()
);

create index if not exists waitlist_attempts_ip_hash_created_at_idx
  on waitlist_attempts (ip_hash, created_at);
