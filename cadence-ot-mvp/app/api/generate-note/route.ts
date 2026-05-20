import { NextRequest, NextResponse } from "next/server";
import { gemini, MODEL, geminiErrorMessage } from "@/lib/gemini";
import { supabaseAdmin } from "@/lib/supabase";
import type { NoteFormat, NoteOutput, SessionType, ServiceLogField, StateProgram, Student } from "@/lib/types";

// Quick-start (no student record yet) service log
function buildQuickServiceLog(
  name: string,
  sessionType: SessionType,
  durationMin: number,
): ServiceLogField[] {
  const date = new Date().toISOString().slice(0, 10);
  return [
    { label: "Student", value: name || "Not specified", required: true },
    { label: "Date of service", value: date, required: true },
    { label: "Total minutes", value: String(durationMin), required: true },
    { label: "Service type", value: sessionType, required: true },
    {
      label: "Parental Medicaid consent",
      value: "Not verified — complete student profile before billing",
      required: true,
    },
    {
      label: "State Medicaid program",
      value: "Set when student profile is completed",
      required: false,
    },
  ];
}

// Quick-start prompt: no IEP goals on file yet
function buildQuickPrompt(args: {
  name: string;
  sessionType: SessionType;
  format: NoteFormat;
  durationMin: number;
  dictation: string;
}) {
  const { name, sessionType, format, durationMin, dictation } = args;
  return `You are Cadence, an AI documentation assistant for school-based pediatric occupational therapists. Generate a session note from a therapist's post-session dictation. No IEP goals are on file yet for this student.

CONTEXT
Student: ${name || "Student"}
Session type: ${sessionType}
Duration: ${durationMin} minutes
Format requested: ${format}
Note: IEP goals not yet linked — generate a strong observational note without goal IDs.

THERAPIST DICTATION:
"""
${dictation}
"""

TASK
Return ONLY valid JSON:
{
  "formatted": "<the prose note in the requested format>",
  "goal_bullets": [],
  "flags": [
    { "level": "error" | "warn", "message": "<compliance issue>" }
  ]
}

RULES FOR "formatted":
- If format is "Goal-bullets": write one bullet (•) per skill area observed, using clear clinical language even without formal goal IDs.
- If format is "SOAP": SUBJECTIVE, OBJECTIVE, ASSESSMENT, PLAN — each section a paragraph, ALL CAPS headers.
- If format is "DAP": DATA, ASSESSMENT, PLAN.
- If format is "Narrative": single flowing paragraph.
- Always include skilled-service language ("specialized", "individualized", "skilled OT", "adapted").

RULES FOR "flags":
- WARN: "No IEP goals linked — add goals to this student's profile when you want saved notes to feed quarterly reports."
- WARN if dictation lacks start/stop times and no minute count.
- WARN if dictation lacks skilled-service language.

Return only the JSON object. No code fence, no preamble.`;
}

// State-specific service log field templates
function buildServiceLog(
  student: Student,
  sessionType: SessionType,
  durationMin: number,
): ServiceLogField[] {
  const date = new Date().toISOString().slice(0, 10);
  const common: ServiceLogField[] = [
    { label: "Student", value: student.name, required: true },
    { label: "Date of service", value: date, required: true },
    { label: "Total minutes", value: String(durationMin), required: true },
    { label: "Service type", value: sessionType, required: true },
    {
      label: "Parental Medicaid consent on file",
      value: student.parental_medicaid_consent ? "Yes" : "NO — billing blocked",
      required: true,
    },
  ];

  if (student.state_program === "SHARS") {
    return [
      ...common,
      { label: "Start time", value: "auto-detect from dictation", required: true },
      { label: "Stop time", value: "auto-detect from dictation", required: true },
      {
        label: "SHARS procedure code",
        value: sessionType === "Eval" ? "92507 (Eval)" : "G0151 (OT individual)",
        required: true,
      },
      { label: "Performing provider signature", value: "Required at submission", required: true },
      { label: "Log created within 7 days", value: "Yes", required: true },
      { label: "Physician Rx on file (TX)", value: "Required", required: true },
    ];
  }

  if (student.state_program === "LEA_BOP") {
    return [
      ...common,
      { label: "Start time", value: "auto-detect from dictation", required: true },
      { label: "End time", value: "auto-detect from dictation", required: true },
      {
        label: "LEA BOP procedure code",
        value: sessionType === "Eval" ? "97165–97168 (OT eval)" : "97530 (Therapeutic activities)",
        required: true,
      },
      { label: "Rendering provider NPI", value: "Required", required: true },
      { label: "Plan of care signed by physician/NP/PA (CA)", value: "Required", required: true },
      { label: "IEP service authorization", value: "Linked", required: true },
    ];
  }

  // Generic fallback
  return [
    ...common,
    { label: "State program", value: student.state_program, required: true },
    { label: "Performing provider", value: "Signature required", required: true },
  ];
}

function buildPrompt(args: {
  student: Student;
  sessionType: SessionType;
  format: NoteFormat;
  durationMin: number;
  dictation: string;
}) {
  const { student, sessionType, format, durationMin, dictation } = args;
  const goalList = student.goals
    .map(
      (g, i) =>
        `  ${i + 1}. [id=${g.id}] "${g.text}"\n     Baseline: ${g.baseline}\n     Criterion: ${g.criterion}\n     Status: ${g.status}`,
    )
    .join("\n");

  return `You are Cadence, an AI documentation assistant for school-based pediatric occupational therapists. Generate a documentation packet from a therapist's post-session dictation.

CONTEXT
Student: ${student.name} (Grade ${student.grade}, ${student.school})
Eligibility: ${student.eligibility}
State Medicaid program: ${student.state_program}
Parental Medicaid consent on file: ${student.parental_medicaid_consent ? "YES" : "NO"}
IEP service minutes this quarter: ${student.minutes_delivered}/${student.minutes_prescribed}
Days until annual IEP review: ${student.iep_anniversary_days}
Days until triennial re-evaluation: ${student.triennial_reeval_days}

ACTIVE IEP GOALS:
${goalList}

SESSION
Type: ${sessionType}
Duration: ${durationMin} minutes
Format requested: ${format}

THERAPIST DICTATION:
"""
${dictation}
"""

TASK
Return ONLY valid JSON matching this exact shape (no markdown, no commentary):
{
  "formatted": "<the prose note in the requested format>",
  "goal_bullets": [
    {
      "goal_id": "<EXACT goal id from the IEP goals list above>",
      "week_label": "Wk 9",
      "observation": "<one concise sentence describing observed progress on this goal during this session>",
      "data_point": "<short numeric/measurable data if present in dictation, else null>"
    }
  ],
  "flags": [
    { "level": "error" | "warn", "message": "<specific compliance issue>" }
  ]
}

RULES FOR "formatted":
- If format is "Goal-bullets": one bullet per IEP goal touched in the dictation, each on its own paragraph, prefixed with "•". Use clear, defensible clinical language.
- If format is "SOAP": SUBJECTIVE, OBJECTIVE, ASSESSMENT, PLAN — each section a paragraph, ALL CAPS headers.
- If format is "DAP": DATA, ASSESSMENT, PLAN.
- If format is "Narrative": single flowing paragraph.
- Always include skilled-service language ("specialized", "individualized", "skilled OT", "adapted"). Required for IDEA medical-necessity defensibility.
- For ${student.state_program === "SHARS" ? "Texas SHARS" : student.state_program === "LEA_BOP" ? "California LEA BOP" : student.state_program}: documentation must support state Medicaid reimbursement.

RULES FOR "goal_bullets":
- Include ONE entry for every IEP goal in the list, even if not directly touched (mark as not addressed).
- "goal_id" must EXACTLY match one of the IDs in the IEP goals list.
- "week_label" should be "Wk 9" (current quarter week).
- "data_point" should be a short measurable string ONLY if the dictation contains one (e.g., "8/10 beads", "3.5 min", "55°"). Otherwise null.

RULES FOR "flags" (only include applicable ones):
- ERROR if parental Medicaid consent is NO and medicaid_billable is true: "Parental Medicaid consent missing — required under 34 CFR §300.154(d)(2)(iv) before ${student.state_program} billing."
- WARN if IEP minutes delivered < 80% of prescribed: include the exact ratio and "compensatory services risk."
- WARN if triennial re-eval ≤ 60 days: include the day count.
- WARN if annual IEP ≤ 30 days: include the day count.
- WARN if dictation lacks start/stop times AND no minute count: cite state program log requirements.
- WARN if dictation lacks skilled-service language.
- WARN if sessionType is "Group" and dictation doesn't document distinct per-student goals.

Return only the JSON object. No code fence, no preamble.`;
}

export async function POST(req: NextRequest) {
  try {
    const { studentId, quickName, sessionType, format, durationMin, dictation, goalIds } = await req.json();

    if (!dictation) {
      return NextResponse.json({ error: "dictation is required" }, { status: 400 });
    }
    if (!studentId && !quickName) {
      return NextResponse.json({ error: "studentId or quickName is required" }, { status: 400 });
    }

    // ── Quick-start path (no student record) ───────────────────────────
    if (quickName && !studentId) {
      const prompt = buildQuickPrompt({ name: quickName, sessionType, format, durationMin, dictation });
      const response = await gemini.models.generateContent({
        model: MODEL,
        contents: prompt,
        config: { responseMimeType: "application/json", temperature: 0.4 },
      });
      const text = response.text ?? "";
      let parsed: Omit<NoteOutput, "service_log">;
      try {
        parsed = JSON.parse(text);
      } catch {
        return NextResponse.json({ error: "Gemini returned non-JSON", raw: text.slice(0, 500) }, { status: 502 });
      }
      const output: NoteOutput = {
        formatted: parsed.formatted,
        goal_bullets: [],
        flags: parsed.flags ?? [],
        service_log: buildQuickServiceLog(quickName, sessionType, durationMin),
      };
      return NextResponse.json({ output });
    }

    // ── Existing student path ──────────────────────────────────────────
    const { data: student, error: sErr } = await supabaseAdmin
      .from("students")
      .select("*")
      .eq("id", studentId)
      .single();
    if (sErr || !student) {
      return NextResponse.json({ error: sErr?.message ?? "Student not found" }, { status: 404 });
    }
    const { data: goals } = await supabaseAdmin
      .from("iep_goals")
      .select("*")
      .eq("student_id", studentId)
      .order("position");

    // Filter to selected goals if the composer sent a goalIds array
    const selectedGoals =
      Array.isArray(goalIds) && goalIds.length > 0
        ? (goals ?? []).filter((g) => goalIds.includes(g.id))
        : (goals ?? []);

    const fullStudent: Student = {
      ...student,
      goals: selectedGoals.map((g) => ({ ...g, bullets: [] })),
    };

    const prompt = buildPrompt({ student: fullStudent, sessionType, format, durationMin, dictation });

    const response = await gemini.models.generateContent({
      model: MODEL,
      contents: prompt,
      config: { responseMimeType: "application/json", temperature: 0.4 },
    });

    const text = response.text ?? "";
    let parsed: Omit<NoteOutput, "service_log">;
    try {
      parsed = JSON.parse(text);
    } catch {
      return NextResponse.json(
        { error: "Gemini returned non-JSON", raw: text.slice(0, 500) },
        { status: 502 },
      );
    }

    // Validate that goal_bullets only reference real goal IDs
    const validGoalIds = new Set(selectedGoals.map((g) => g.id));
    const safeGoalBullets = (parsed.goal_bullets ?? []).filter((b) => validGoalIds.has(b.goal_id));

    const serviceLog = buildServiceLog(fullStudent, sessionType, durationMin);
    const output: NoteOutput = {
      formatted: parsed.formatted,
      goal_bullets: safeGoalBullets,
      flags: parsed.flags ?? [],
      service_log: serviceLog,
    };

    return NextResponse.json({ output });
  } catch (err) {
    return NextResponse.json({ error: geminiErrorMessage(err) }, { status: 500 });
  }
}
