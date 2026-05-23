import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { getSessionId } from "@/lib/session";

const demoStudents = [
  {
    name: "M.R. (Demo)",
    initials: "MR",
    grade: "4",
    school: "Demo Elementary",
    eligibility: "OHI",
    state_program: "SHARS",
    minutes_prescribed: 60,
    minutes_delivered: 45,
    quarterly_report_due_days: 12,
    goals: [
      {
        text: "Student will improve manuscript letter formation legibility to 80% on classroom writing samples",
        baseline: "Forms target letters legibly in 45% of trials with moderate cues",
        criterion: "80% legibility across 3 consecutive sessions with minimal cues",
        status: "on-track",
        bullets: [
          { week_label: "Wk 3", observation: "Completed curved-line cutting and copied 6 target letters with moderate verbal cues", data_point: "6 letters" },
          { week_label: "Wk 6", observation: "Copied target letters with improved sizing after visual model and adapted paper", data_point: "70%" },
        ],
      },
      {
        text: "Student will complete bilateral coordination tasks with minimal assist across 4 of 5 trials",
        baseline: "Requires moderate assistance for stabilizing materials during two-handed tasks",
        criterion: "4 of 5 trials with minimal assistance",
        status: "on-track",
        bullets: [
          { week_label: "Wk 4", observation: "Stabilized paper during scissor task with minimal assist after setup", data_point: "3/5 trials" },
          { week_label: "Wk 7", observation: "Completed bead stringing with coordinated helper hand and one verbal cue", data_point: "8/10 beads" },
        ],
      },
    ],
  },
  {
    name: "L.C. (Demo)",
    initials: "LC",
    grade: "2",
    school: "Demo Elementary",
    eligibility: "Autism",
    state_program: "LEA_BOP",
    minutes_prescribed: 90,
    minutes_delivered: 60,
    quarterly_report_due_days: 18,
    goals: [
      {
        text: "Student will use a visual schedule to transition between classroom routines with no more than 1 prompt",
        baseline: "Requires 3-4 prompts per transition",
        criterion: "4 transitions with no more than 1 prompt",
        status: "needs-revision",
        bullets: [
          { week_label: "Wk 3", observation: "Transitioned from tabletop work to cleanup using visual schedule with two prompts", data_point: "2 prompts" },
          { week_label: "Wk 6", observation: "Transitioned with one prompt in three of four observed routines", data_point: "3/4 routines" },
        ],
      },
    ],
  },
  {
    name: "D.P. (Demo)",
    initials: "DP",
    grade: "5",
    school: "Demo Elementary",
    eligibility: "SLD",
    state_program: "SHARS",
    minutes_prescribed: 60,
    minutes_delivered: 60,
    quarterly_report_due_days: 25,
    goals: [
      {
        text: "Student will sustain seated tabletop participation for 8 minutes using agreed sensory supports",
        baseline: "Seeks movement after 3 minutes without support",
        criterion: "8 minutes with no more than one break",
        status: "on-track",
        bullets: [
          { week_label: "Wk 2", observation: "Tolerated weighted lap pad during fine-motor task before requesting a movement break", data_point: "3.5 min" },
          { week_label: "Wk 5", observation: "Used visual timer and completed tabletop putty task with one break", data_point: "6 min" },
        ],
      },
    ],
  },
];

export async function POST(req: NextRequest) {
  try {
    const sessionId = getSessionId(req);
    const { count, error: countErr } = await supabaseAdmin
      .from("students")
      .select("id", { count: "exact", head: true })
      .eq("session_id", sessionId);

    if (countErr) return NextResponse.json({ error: countErr.message }, { status: 500 });
    if ((count ?? 0) > 0) return NextResponse.json({ ok: true, seeded: false });

    const now = new Date();
    const lastSession = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();

    for (const demo of demoStudents) {
      const { goals, ...studentFields } = demo;
      const { data: student, error: studentErr } = await supabaseAdmin
        .from("students")
        .insert({
          ...studentFields,
          session_id: sessionId,
          medicaid_billable: false,
          parental_medicaid_consent: false,
          iep_anniversary_days: 120,
          triennial_reeval_days: 400,
          last_session: lastSession,
        })
        .select()
        .single();

      if (studentErr || !student) {
        return NextResponse.json(
          { error: studentErr?.message ?? "Demo student insert failed" },
          { status: 500 },
        );
      }

      for (const [position, goal] of goals.entries()) {
        const { bullets, ...goalFields } = goal;
        const { data: savedGoal, error: goalErr } = await supabaseAdmin
          .from("iep_goals")
          .insert({ ...goalFields, student_id: student.id, position })
          .select()
          .single();

        if (goalErr || !savedGoal) {
          return NextResponse.json(
            { error: goalErr?.message ?? "Demo goal insert failed" },
            { status: 500 },
          );
        }

        if (bullets.length > 0) {
          const { error: bulletErr } = await supabaseAdmin.from("goal_bullets").insert(
            bullets.map((bullet) => ({
              ...bullet,
              goal_id: savedGoal.id,
              session_id: null,
            })),
          );
          if (bulletErr) {
            return NextResponse.json({ error: bulletErr.message }, { status: 500 });
          }
        }
      }
    }

    return NextResponse.json({ ok: true, seeded: true });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 },
    );
  }
}
