import "server-only";
import { supabaseAdmin } from "./supabase";

export function getSessionId(req: { headers: { get(name: string): string | null } }): string {
  return req.headers.get("x-demo-session") ?? "";
}

export async function verifyStudentSession(studentId: string, sessionId: string): Promise<boolean> {
  if (!sessionId) return false;
  const { data } = await supabaseAdmin
    .from("students")
    .select("id")
    .eq("id", studentId)
    .eq("session_id", sessionId)
    .maybeSingle();
  return !!data;
}

export async function verifyGoalSession(goalId: string, sessionId: string): Promise<boolean> {
  if (!sessionId) return false;
  const { data: goal } = await supabaseAdmin
    .from("iep_goals")
    .select("student_id")
    .eq("id", goalId)
    .maybeSingle();
  if (!goal) return false;
  return verifyStudentSession(goal.student_id, sessionId);
}
