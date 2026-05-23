export type Eligibility = "SLD" | "OHI" | "Autism" | "SI" | "OI" | "SLI" | "ED" | "DD";
export type StateProgram = "SHARS" | "LEA_BOP" | "SBMP" | "SBHS" | "FL_CSMP";
export type SessionType = "Push-in" | "Pull-out" | "Consult" | "Group" | "Eval" | "Re-eval";
export type NoteFormat = "Goal-bullets" | "SOAP" | "DAP" | "Narrative";
export type GoalStatus = "on-track" | "needs-revision" | "mastered";

export interface GoalBullet {
  id: string;
  goal_id: string;
  session_id: string | null;
  week_label: string;
  observation: string;
  data_point: string | null;
  created_at: string;
}

export interface IEPGoal {
  id: string;
  student_id: string;
  text: string;
  baseline: string;
  criterion: string;
  status: GoalStatus;
  position: number;
  draft_paragraph: string | null;
  bullets: GoalBullet[];
}

export interface SessionRecord {
  id: string;
  student_id: string;
  session_type: string;
  format: string;
  duration_min: number;
  dictation: string;
  formatted_output: string | null;
  created_at: string;
}

export interface Student {
  id: string;
  name: string;
  initials: string;
  grade: string;
  school: string;
  eligibility: Eligibility;
  medicaid_billable: boolean;
  state_program: StateProgram;
  parental_medicaid_consent: boolean;
  iep_anniversary_days: number;
  triennial_reeval_days: number;
  minutes_prescribed: number;
  minutes_delivered: number;
  last_session: string | null;
  quarterly_report_due_days: number;
  avatar_url: string | null;
  goals: IEPGoal[];
}

export interface ServiceLogField {
  label: string;
  value: string;
  required: boolean;
}

export interface NoteFlag {
  level: "error" | "warn";
  message: string;
}

export interface NoteGoalBullet {
  goal_id: string;
  week_label: string;
  observation: string;
  data_point: string | null;
}

export interface NoteOutput {
  formatted: string;
  goal_bullets: NoteGoalBullet[];
  service_log: ServiceLogField[];
  flags: NoteFlag[];
}
