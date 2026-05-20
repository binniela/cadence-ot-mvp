import { NextRequest, NextResponse } from "next/server";
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

    // Auto-generate initials from name (up to 2 chars)
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
        (
          g: { text: string; baseline: string; criterion: string },
          i: number,
        ) => ({
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
        // Compensate: remove the student if goal insert fails
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
