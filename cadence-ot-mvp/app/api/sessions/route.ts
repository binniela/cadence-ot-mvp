import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import type { NoteOutput, NoteFormat, SessionType } from "@/lib/types";

// Fetches session history for a student (most recent first).
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const studentId = searchParams.get("studentId");
  if (!studentId) {
    return NextResponse.json({ error: "studentId required" }, { status: 400 });
  }
  const { data, error } = await supabaseAdmin
    .from("sessions")
    .select("id, student_id, session_type, format, duration_min, dictation, formatted_output, created_at")
    .eq("student_id", studentId)
    .order("created_at", { ascending: false })
    .limit(30);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ sessions: data ?? [] });
}

// Saves a session record and appends evidence bullets to addressed goals.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      studentId,
      sessionType,
      format,
      durationMin,
      dictation,
      output,
    }: {
      studentId: string;
      sessionType: SessionType;
      format: NoteFormat;
      durationMin: number;
      dictation: string;
      output: NoteOutput;
    } = body;

    // 1. Insert session
    const { data: session, error: sErr } = await supabaseAdmin
      .from("sessions")
      .insert({
        student_id: studentId,
        session_type: sessionType,
        format,
        duration_min: durationMin,
        dictation,
        formatted_output: output.formatted,
        flags: output.flags,
        service_log: output.service_log,
      })
      .select()
      .single();
    if (sErr || !session) {
      return NextResponse.json({ error: sErr?.message ?? "Insert failed" }, { status: 500 });
    }

    // 2. Append bullets — only for goals that were actually addressed
    //    (we treat "not addressed" / "n/a" observations as skip)
    //    Validate goal_id against the real goals on this student to guard
    //    against Gemini hallucinating an id.
    const { data: realGoals } = await supabaseAdmin
      .from("iep_goals")
      .select("id")
      .eq("student_id", studentId);
    const validGoalIds = new Set((realGoals ?? []).map((g) => g.id));

    const bulletsToInsert = (output.goal_bullets ?? [])
      .filter((b) => {
        const obs = (b.observation ?? "").toLowerCase();
        return (
          b.goal_id &&
          validGoalIds.has(b.goal_id) &&
          b.observation &&
          !obs.includes("not addressed") &&
          !obs.includes("not directly addressed") &&
          !obs.includes("n/a")
        );
      })
      .map((b) => ({
        goal_id: b.goal_id,
        session_id: session.id,
        week_label: b.week_label || "Wk 9",
        observation: b.observation,
        data_point: b.data_point,
      }));

    let insertedBullets: { id: string }[] = [];
    if (bulletsToInsert.length > 0) {
      const { data, error: bErr } = await supabaseAdmin
        .from("goal_bullets")
        .insert(bulletsToInsert)
        .select("id");
      if (bErr) {
        return NextResponse.json({ error: bErr.message }, { status: 500 });
      }
      insertedBullets = data ?? [];
    }

    // 3. Bump minutes_delivered
    const { data: cur } = await supabaseAdmin
      .from("students")
      .select("minutes_delivered")
      .eq("id", studentId)
      .single();
    if (cur) {
      await supabaseAdmin
        .from("students")
        .update({
          minutes_delivered: cur.minutes_delivered + durationMin,
          last_session: new Date().toISOString().slice(0, 10),
        })
        .eq("id", studentId);
    }

    return NextResponse.json({
      sessionId: session.id,
      bulletsInserted: insertedBullets.length,
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 },
    );
  }
}
