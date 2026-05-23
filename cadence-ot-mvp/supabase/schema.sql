-- ─────────────────────────────────────────────────────────────────────
-- Cadence schema — school-based pediatric OT MVP
-- Run in Supabase SQL editor. Wipes old tables and creates an empty workspace.
-- ─────────────────────────────────────────────────────────────────────

-- ── Wipe old schema (idempotent) ─────────────────────────────────────
drop table if exists goal_bullets cascade;
drop table if exists sessions cascade;
drop table if exists iep_goals cascade;
drop table if exists students cascade;
drop table if exists api_usage cascade;
drop table if exists waitlist cascade;

-- ── Students ─────────────────────────────────────────────────────────
create table students (
  id uuid primary key default gen_random_uuid(),
  session_id text not null default 'legacy',   -- demo visitor UUID from localStorage
  name text not null,
  initials text not null,
  grade text not null,
  school text not null,
  eligibility text not null,           -- SLD | OHI | Autism | SI | OI | SLI | ED | DD
  medicaid_billable boolean not null default true,
  state_program text not null default 'SHARS',  -- SHARS | LEA_BOP | SBMP | SBHS | FL_CSMP
  parental_medicaid_consent boolean not null default false,
  iep_anniversary_days int not null default 365,
  triennial_reeval_days int not null default 1095,
  minutes_prescribed int not null,
  minutes_delivered int not null default 0,
  last_session text,
  quarterly_report_due_days int not null default 14,
  avatar_url text,
  created_at timestamptz not null default now()
);
create index on students(session_id);

-- ── IEP goals ────────────────────────────────────────────────────────
create table iep_goals (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references students(id) on delete cascade,
  text text not null,
  baseline text not null,
  criterion text not null,
  status text not null default 'on-track',  -- on-track | needs-revision | mastered
  position int not null default 0,
  draft_paragraph text,                     -- persisted quarterly progress narrative
  created_at timestamptz not null default now()
);
create index on iep_goals(student_id);

-- ── Sessions (one per dictation event) ───────────────────────────────
create table sessions (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references students(id) on delete cascade,
  session_type text not null,           -- Push-in | Pull-out | Consult | Group | Eval | Re-eval
  format text not null,                 -- Goal-bullets | SOAP | DAP | Narrative
  duration_min int not null,
  dictation text not null,
  formatted_output text,
  flags jsonb,
  service_log jsonb,
  created_at timestamptz not null default now()
);
create index on sessions(student_id, created_at desc);

-- ── Goal evidence from saved notes ───────────────────────────────────
create table goal_bullets (
  id uuid primary key default gen_random_uuid(),
  goal_id uuid not null references iep_goals(id) on delete cascade,
  session_id uuid references sessions(id) on delete set null,
  week_label text not null,             -- e.g. "Wk 8"
  observation text not null,
  data_point text,
  created_at timestamptz not null default now()
);
create index on goal_bullets(goal_id, created_at desc);

-- ── API rate limiting ────────────────────────────────────────────────
create table api_usage (
  ip   text not null,
  date date not null,
  count integer not null default 0,
  primary key (ip, date)
);

-- ── Waitlist ─────────────────────────────────────────────────────────
create table waitlist (
  id         uuid primary key default gen_random_uuid(),
  email      text not null unique,
  role       text,
  created_at timestamptz not null default now()
);
create index on waitlist(created_at desc);

-- ── RLS: disabled for MVP (all DB access via Next.js API + service key) ──
alter table students       disable row level security;
alter table iep_goals      disable row level security;
alter table sessions       disable row level security;
alter table goal_bullets   disable row level security;
alter table api_usage      disable row level security;
alter table waitlist       disable row level security;

-- ── No seed data ───────────────────────────────────────────────────────
-- Fresh MVP workspaces start empty. Add students and goals through the app,
-- then save Composer notes to build evidence for later quarterly reports.
