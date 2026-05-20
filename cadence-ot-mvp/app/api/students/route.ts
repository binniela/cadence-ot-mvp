import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import type { Student } from "@/lib/types";

export async function GET() {
  const { data: students, error: sErr } = await supabaseAdmin
    .from("students")
    .select("*")
    .order("school")
    .order("name");
  if (sErr) return NextResponse.json({ error: sErr.message }, { status: 500 });

  const { data: goals, error: gErr } = await supabaseAdmin
    .from("iep_goals")
    .select("*")
    .order("position");
  if (gErr) return NextResponse.json({ error: gErr.message }, { status: 500 });

  const { data: bullets, error: bErr } = await supabaseAdmin
    .from("goal_bullets")
    .select("*")
    .order("created_at");
  if (bErr) return NextResponse.json({ error: bErr.message }, { status: 500 });

  const bulletsByGoal: Record<string, typeof bullets> = {};
  for (const b of bullets ?? []) {
    (bulletsByGoal[b.goal_id] ||= []).push(b);
  }

  const goalsByStudent: Record<string, Student["goals"]> = {};
  for (const g of goals ?? []) {
    (goalsByStudent[g.student_id] ||= []).push({
      ...g,
      bullets: bulletsByGoal[g.id] ?? [],
    });
  }

  const result: Student[] = (students ?? []).map((s) => ({
    ...s,
    goals: goalsByStudent[s.id] ?? [],
  }));

  return NextResponse.json({ students: result });
}
