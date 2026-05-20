-- ─────────────────────────────────────────────────────────────────────
-- Cadence schema — school-based pediatric OT MVP
-- Run in Supabase SQL editor. Wipes old tables, creates new, seeds.
-- ─────────────────────────────────────────────────────────────────────

-- ── Wipe old schema (idempotent) ─────────────────────────────────────
drop table if exists goal_bullets cascade;
drop table if exists sessions cascade;
drop table if exists iep_goals cascade;
drop table if exists students cascade;

-- ── Students ─────────────────────────────────────────────────────────
create table students (
  id uuid primary key default gen_random_uuid(),
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
  created_at timestamptz not null default now()
);

-- ── IEP goals ────────────────────────────────────────────────────────
create table iep_goals (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references students(id) on delete cascade,
  text text not null,
  baseline text not null,
  criterion text not null,
  status text not null default 'on-track',  -- on-track | needs-revision | mastered
  position int not null default 0,
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

-- ── Goal bullets (banked toward quarterly) ───────────────────────────
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

-- ── RLS: disabled for MVP (all DB access via Next.js API + service key) ──
alter table students       disable row level security;
alter table iep_goals      disable row level security;
alter table sessions       disable row level security;
alter table goal_bullets   disable row level security;

-- ═════════════════════════════════════════════════════════════════════
-- Seed data — 4 students, 2-3 goals each, 3-4 banked bullets per goal
-- ═════════════════════════════════════════════════════════════════════

-- Liam Carter (Lincoln Elementary, K, OHI — at risk: under-delivered)
with s as (
  insert into students (name, initials, grade, school, eligibility, medicaid_billable, state_program, parental_medicaid_consent, iep_anniversary_days, triennial_reeval_days, minutes_prescribed, minutes_delivered, last_session, quarterly_report_due_days)
  values ('Liam Carter', 'LC', 'K', 'Lincoln Elementary', 'OHI', true, 'SHARS', true, 142, 410, 240, 165, '2 days ago', 5)
  returning id
),
g1 as (
  insert into iep_goals (student_id, text, baseline, criterion, status, position)
  select id, 'Liam will demonstrate functional fine-motor manipulation by stringing 10 ¼-inch beads with 80% accuracy across 3 consecutive sessions.', 'Strings 2/10 beads before frustration; drops items.', '80% across 3 sessions', 'on-track', 0 from s
  returning id
),
g2 as (
  insert into iep_goals (student_id, text, baseline, criterion, status, position)
  select id, 'Liam will tolerate 5 minutes of seated tabletop work without seeking sensory input, in 4/5 opportunities.', 'Tolerates ~90s before leaving seat.', '5 min, 4/5 opportunities', 'needs-revision', 1 from s
  returning id
)
insert into goal_bullets (goal_id, week_label, observation, data_point)
select id, 'Wk 2', 'Strung 4/10 beads with verbal cues', '4/10' from g1 union all
select id, 'Wk 4', 'Strung 6/10 beads, reduced cues', '6/10' from g1 union all
select id, 'Wk 6', 'Strung 7/10 beads independently in 2 trials', '7/10 ×2' from g1 union all
select id, 'Wk 8', 'Strung 8/10 beads in structured task', '8/10' from g1 union all
select id, 'Wk 3', 'Tolerated 2 min with movement breaks', '2 min' from g2 union all
select id, 'Wk 5', 'Tolerated 3 min with weighted lap pad', '3 min' from g2 union all
select id, 'Wk 7', 'Tolerated 3.5 min, regression after recess', '3.5 min' from g2;

-- Sofia Mendez (Lincoln Elementary, 2, SLD — on track)
with s as (
  insert into students (name, initials, grade, school, eligibility, medicaid_billable, state_program, parental_medicaid_consent, iep_anniversary_days, triennial_reeval_days, minutes_prescribed, minutes_delivered, last_session, quarterly_report_due_days)
  values ('Sofia Mendez', 'SM', '2', 'Lincoln Elementary', 'SLD', true, 'SHARS', true, 88, 222, 360, 330, 'Yesterday', 5)
  returning id
),
g1 as (
  insert into iep_goals (student_id, text, baseline, criterion, status, position)
  select id, 'Sofia will form lowercase letters with correct sizing and line placement in 80% of writing samples.', '40% accurate letter formation; inconsistent baseline.', '80% across writing samples', 'on-track', 0 from s
  returning id
),
g2 as (
  insert into iep_goals (student_id, text, baseline, criterion, status, position)
  select id, 'Sofia will complete a 6-piece visual-motor copying task with 80% accuracy in 4/5 trials.', 'VMI: 5th percentile; copies 3/6 forms.', '80%, 4/5 trials', 'on-track', 1 from s
  returning id
)
insert into goal_bullets (goal_id, week_label, observation, data_point)
select id, 'Wk 2', 'Strung 55% accuracy on Handwriting Without Tears probe', '55%' from g1 union all
select id, 'Wk 4', '62% accuracy, improved t/f crossings', '62%' from g1 union all
select id, 'Wk 6', '70% accuracy, consistent sizing', '70%' from g1 union all
select id, 'Wk 8', '78% accuracy in classroom journal sample', '78%' from g1 union all
select id, 'Wk 3', 'Copied 4/6 forms accurately', '4/6' from g2 union all
select id, 'Wk 5', 'Copied 5/6 forms in 3 of 4 trials', '5/6 ×3' from g2 union all
select id, 'Wk 8', 'Copied 6/6 forms in 1 trial, 5/6 in 3', '6/6 ×1' from g2;

-- Aiden Park (Jefferson Middle, 3, Autism — at risk: missing consent + re-eval near)
with s as (
  insert into students (name, initials, grade, school, eligibility, medicaid_billable, state_program, parental_medicaid_consent, iep_anniversary_days, triennial_reeval_days, minutes_prescribed, minutes_delivered, last_session, quarterly_report_due_days)
  values ('Aiden Park', 'AP', '3', 'Jefferson Middle', 'Autism', true, 'SHARS', false, 215, 96, 360, 240, '4 days ago', 5)
  returning id
),
g1 as (
  insert into iep_goals (student_id, text, baseline, criterion, status, position)
  select id, 'Aiden will independently use a visual schedule to transition between 4 classroom activities with no more than 1 prompt.', 'Requires 3-4 prompts per transition.', '4 transitions, ≤1 prompt', 'on-track', 0 from s
  returning id
),
g2 as (
  insert into iep_goals (student_id, text, baseline, criterion, status, position)
  select id, 'Aiden will demonstrate functional pencil grasp and produce legible 3-word sentences in classroom assignments.', 'Fisted grasp; refuses writing tasks.', 'Legible 3-word sentences', 'needs-revision', 1 from s
  returning id
)
insert into goal_bullets (goal_id, week_label, observation, data_point)
select id, 'Wk 3', 'Transitioned with 2 prompts, used schedule', '2 prompts' from g1 union all
select id, 'Wk 6', 'Transitioned with 1 prompt in 3/4 activities', '1 prompt ×3' from g1 union all
select id, 'Wk 4', 'Used transitional grasp for 90 seconds', '90s' from g2 union all
select id, 'Wk 7', 'Wrote 2-word phrase with hand-over-hand support', '2 words' from g2;

-- Maya Patel (Roosevelt Elementary, 5, OI — re-eval in 52d)
with s as (
  insert into students (name, initials, grade, school, eligibility, medicaid_billable, state_program, parental_medicaid_consent, iep_anniversary_days, triennial_reeval_days, minutes_prescribed, minutes_delivered, last_session, quarterly_report_due_days)
  values ('Maya Patel', 'MP', '5', 'Roosevelt Elementary', 'OI', true, 'SHARS', true, 174, 52, 480, 455, 'Yesterday', 5)
  returning id
),
g1 as (
  insert into iep_goals (student_id, text, baseline, criterion, status, position)
  select id, 'Maya will demonstrate functional wrist ROM and grip strength sufficient to manage classroom writing tools for a full 20-min task.', 'Post-ORIF L wrist; flexion 20°, grip 8 lbs.', '20-min sustained writing', 'on-track', 0 from s
  returning id
),
g2 as (
  insert into iep_goals (student_id, text, baseline, criterion, status, position)
  select id, 'Maya will independently manage backpack, locker, and lunch-tray IADLs across the school day.', 'Required adult assist for all 3 IADLs post-injury.', 'Independent across all 3', 'mastered', 1 from s
  returning id
)
insert into goal_bullets (goal_id, week_label, observation, data_point)
select id, 'Wk 2', 'Flexion 32°, grip 12 lbs', '32° / 12 lbs' from g1 union all
select id, 'Wk 5', 'Flexion 45°, grip 16 lbs, 12-min tolerance', '45° / 16 lbs / 12 min' from g1 union all
select id, 'Wk 8', 'Flexion 55°, grip 19 lbs, 18-min tolerance', '55° / 19 lbs / 18 min' from g1 union all
select id, 'Wk 3', 'Independent with backpack, min assist locker', '2/3 indep' from g2 union all
select id, 'Wk 6', 'Independent with all 3 in 4/5 days', '3/3 ×4' from g2 union all
select id, 'Wk 8', 'Mastery met — independent 5/5 days', 'Mastered' from g2;
