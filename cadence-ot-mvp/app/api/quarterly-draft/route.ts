import { NextRequest, NextResponse } from "next/server";
import { gemini, MODEL, geminiErrorMessage } from "@/lib/gemini";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { goalId } = await req.json();
    if (!goalId) {
      return NextResponse.json({ error: "goalId required" }, { status: 400 });
    }

    const { data: goal, error: gErr } = await supabaseAdmin
      .from("iep_goals")
      .select("*")
      .eq("id", goalId)
      .single();
    if (gErr || !goal) {
      return NextResponse.json({ error: gErr?.message ?? "Goal not found" }, { status: 404 });
    }

    const { data: student } = await supabaseAdmin
      .from("students")
      .select("name, grade, school, eligibility")
      .eq("id", goal.student_id)
      .single();

    const { data: bullets } = await supabaseAdmin
      .from("goal_bullets")
      .select("*")
      .eq("goal_id", goalId)
      .order("created_at");

    const first = student?.name.split(" ")[0] ?? "The student";
    const bulletList = (bullets ?? [])
      .map((b) => `- ${b.week_label}: ${b.observation}${b.data_point ? ` (${b.data_point})` : ""}`)
      .join("\n");

    const prompt = `You are drafting an IDEA §300.320(a)(3)-compliant quarterly progress narrative for an IEP goal.

STUDENT: ${first} (Grade ${student?.grade}, ${student?.school}, ${student?.eligibility})
GOAL: ${goal.text}
BASELINE: ${goal.baseline}
CRITERION FOR MASTERY: ${goal.criterion}
CURRENT STATUS: ${goal.status}

BANKED SESSION OBSERVATIONS THIS QUARTER:
${bulletList || "(no banked observations)"}

TASK
Write a single defensible paragraph (3–5 sentences) reporting ${first}'s progress on this goal this quarter. Required elements:
1. Reference the baseline.
2. Cite specific data points from the banked observations in chronological order.
3. State whether ${first} is on-track / needs revision / has met the criterion.
4. Make a clinical recommendation for the next quarter.
5. Use skilled-service language (specialized, individualized, adapted) to support IDEA medical-necessity.

Return ONLY the paragraph — no headers, no markdown, no preamble.`;

    const response = await gemini.models.generateContent({
      model: MODEL,
      contents: prompt,
      config: { temperature: 0.3 },
    });

    const paragraph = (response.text ?? "").trim();

    // Persist back to the goal row so it survives page refreshes.
    // Wrapped in try/catch — if the column doesn't exist yet (migration not run),
    // we still return the paragraph rather than failing the whole request.
    try {
      await supabaseAdmin
        .from("iep_goals")
        .update({ draft_paragraph: paragraph })
        .eq("id", goalId);
    } catch {
      // Column not yet added — run: ALTER TABLE iep_goals ADD COLUMN IF NOT EXISTS draft_paragraph TEXT;
    }

    return NextResponse.json({ paragraph });
  } catch (err) {
    return NextResponse.json({ error: geminiErrorMessage(err) }, { status: 500 });
  }
}
