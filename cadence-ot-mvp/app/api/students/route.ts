import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { getSessionId } from "@/lib/session";
import type { GoalBullet, Student } from "@/lib/types";

export async function GET(req: NextRequest) {
  const sessionId = getSessionId(req);

  const { data: students, error: sErr } = await supabaseAdmin
    .from("students")
    .select("*")
    .eq("session_id", sessionId)
    .order("school")
    .order("name");
  if (sErr) return NextResponse.json({ error: sErr.message }, { status: 500 });

  const studentIds = (students ?? []).map((s) => s.id);
  if (studentIds.length === 0) {
    return NextResponse.json({ students: [] });
  }

  const { data: goals, error: gErr } = await supabaseAdmin
    .from("iep_goals")
    .select("*")
    .in("student_id", studentIds)
    .order("position");
  if (gErr) return NextResponse.json({ error: gErr.message }, { status: 500 });

  const goalIds = (goals ?? []).map((g) => g.id);
  const bullets =
    goalIds.length > 0
      ? (
          await supabaseAdmin
            .from("goal_bullets")
            .select("*")
            .in("goal_id", goalIds)
            .order("created_at")
        )
      : { data: [], error: null };

  const { data: bulletRows, error: bErr } = bullets;
  if (bErr) return NextResponse.json({ error: bErr.message }, { status: 500 });

  const bulletsByGoal: Record<string, GoalBullet[]> = {};
  for (const b of bulletRows ?? []) {
    (bulletsByGoal[b.goal_id] ||= []).push(b);
  }

  const goalsByStudent: Record<string, Student["goals"]> = {};
  for (const g of goals ?? []) {
    (goalsByStudent[g.student_id] ||= []).push({
      ...g,
      draft_paragraph: g.draft_paragraph ?? null,
      bullets: bulletsByGoal[g.id] ?? [],
    });
  }

  const result: Student[] = (students ?? []).map((s) => ({
    ...s,
    goals: goalsByStudent[s.id] ?? [],
  }));

  return NextResponse.json({ students: result });
}

export async function POST(req: NextRequest) {
  try {
    const sessionId = getSessionId(req);
    const body = await req.json();
    const {
      name,
      school,
      grade,
      goals,
    }: {
      name: string;
      school: string;
      grade: string;
      goals?: { text: string; baseline: string; criterion: string }[];
    } = body;

    if (!name?.trim() || !school?.trim()) {
      return NextResponse.json(
        { error: "name and school are required" },
        { status: 400 },
      );
    }

    const initials = name
      .trim()
      .split(/\s+/)
      .map((w: string) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

    const { data: student, error: sErr } = await supabaseAdmin
      .from("students")
      .insert({
        name: name.trim(),
        initials,
        school: school.trim(),
        grade: grade ?? "3",
        session_id: sessionId,
        eligibility: "OHI",
        medicaid_billable: false,
        state_program: "SHARS",
        parental_medicaid_consent: false,
        iep_anniversary_days: 365,
        triennial_reeval_days: 1095,
        quarterly_report_due_days: 90,
        minutes_prescribed: 60,
        minutes_delivered: 0,
      })
      .select()
      .single();

    if (sErr || !student) {
      return NextResponse.json(
        { error: sErr?.message ?? "Insert failed" },
        { status: 500 },
      );
    }

    if (goals && goals.length > 0) {
      const goalsToInsert = goals.map(
        (g: { text: string; baseline: string; criterion: string }, i: number) => ({
          student_id: student.id,
          text: g.text.trim(),
          baseline: g.baseline?.trim() || "Not documented",
          criterion: g.criterion?.trim() || "Not documented",
          status: "on-track" as const,
          position: i,
        }),
      );

      const { error: gErr } = await supabaseAdmin
        .from("iep_goals")
        .insert(goalsToInsert);

      if (gErr) {
        await supabaseAdmin.from("students").delete().eq("id", student.id);
        return NextResponse.json({ error: gErr.message }, { status: 500 });
      }
    }

    return NextResponse.json({ studentId: student.id });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 },
    );
  }
}
