"use client";

import { useState, useEffect, useCallback } from "react";
import type { Student, IEPGoal, NoteFormat, NoteOutput, SessionType, SessionRecord } from "@/lib/types";
import { MicButton } from "@/app/components/MicButton";

type View = "students" | "composer" | "quarterly";

// ── Add Student Form ──────────────────────────────────────────────────

interface NewGoal {
  text: string;
  baseline: string;
  criterion: string;
}

function AddStudentForm({
  onSaved,
  onCancel,
}: {
  onSaved: () => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState("");
  const [school, setSchool] = useState("");
  const [grade, setGrade] = useState("3");
  const [goals, setGoals] = useState<NewGoal[]>([{ text: "", baseline: "", criterion: "" }]);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  function addGoal() {
    setGoals((prev) => [...prev, { text: "", baseline: "", criterion: "" }]);
  }

  function removeGoal(i: number) {
    setGoals((prev) => prev.filter((_, idx) => idx !== i));
  }

  function updateGoal(i: number, field: keyof NewGoal, value: string) {
    setGoals((prev) =>
      prev.map((g, idx) => (idx === i ? { ...g, [field]: value } : g)),
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !school.trim()) return;
    setSaving(true);
    setErr(null);
    try {
      const res = await fetch("/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          school: school.trim(),
          grade,
          goals: goals.filter((g) => g.text.trim()),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to add student");
      onSaved();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="add-student-form" onSubmit={handleSubmit}>
      <h3 className="add-student-form__title">Add student</h3>
      <div className="field-row">
        <div className="field">
          <label className="field-label">Student name / initials</label>
          <input
            className="field-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. L.C. or initials"
            required
          />
        </div>
        <div className="field">
          <label className="field-label">School</label>
          <input
            className="field-input"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            placeholder="e.g. Lincoln Elementary"
            required
          />
        </div>
        <div className="field" style={{ maxWidth: 120 }}>
          <label className="field-label">Grade</label>
          <select
            className="field-select"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          >
            {["K", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"].map((g) => (
              <option key={g}>{g}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="goal-inputs">
        <p className="field-label" style={{ marginBottom: 10 }}>IEP goals</p>
        {goals.map((g, i) => (
          <div key={i} className="goal-input-row">
            <span className="goal-input-num">{i + 1}</span>
            <div className="goal-input-fields">
              <input
                className="field-input"
                placeholder="Goal text (e.g. Student will improve fine-motor manipulation…)"
                value={g.text}
                onChange={(e) => updateGoal(i, "text", e.target.value)}
              />
              <div className="goal-input-sub">
                <input
                  className="field-input"
                  placeholder="Baseline"
                  value={g.baseline}
                  onChange={(e) => updateGoal(i, "baseline", e.target.value)}
                />
                <input
                  className="field-input"
                  placeholder="Criterion (e.g. 80% across 3 trials)"
                  value={g.criterion}
                  onChange={(e) => updateGoal(i, "criterion", e.target.value)}
                />
              </div>
            </div>
            {goals.length > 1 && (
              <button
                type="button"
                className="goal-input-remove"
                onClick={() => removeGoal(i)}
              >
                ✕
              </button>
            )}
          </div>
        ))}
        <button type="button" className="ghost-btn" onClick={addGoal}>
          + Add goal
        </button>
      </div>

      {err && <p className="error-msg">⚠ {err}</p>}

      <div className="add-student-form__actions">
        <button type="button" className="ghost-btn" onClick={onCancel}>
          Cancel
        </button>
        <button
          type="submit"
          className="compose-btn"
          disabled={!name.trim() || !school.trim() || saving}
        >
          {saving ? "Saving…" : "Add student →"}
        </button>
      </div>
    </form>
  );
}

// ── Students ──────────────────────────────────────────────────────────

function StudentsView({
  students,
  onCompose,
  onRefresh,
}: {
  students: Student[];
  onCompose: (id: string) => void;
  onRefresh: () => void;
}) {
  const [showAdd, setShowAdd] = useState(false);
  const today = new Date().toISOString().slice(0, 10);

  function notedToday(s: Student): boolean {
    return !!s.last_session && s.last_session.startsWith(today);
  }

  function handleSaved() {
    setShowAdd(false);
    onRefresh();
  }

  return (
    <div className="db-content">
      <div
        className="db-header"
        style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}
      >
        <div>
          <h1 className="db-title">Students</h1>
          <span className="db-subtitle">
            {students.length} student{students.length !== 1 ? "s" : ""} ·{" "}
            {students.filter(notedToday).length} noted today
          </span>
        </div>
        {!showAdd && (
          <button className="compose-btn" onClick={() => setShowAdd(true)}>
            + Add student
          </button>
        )}
      </div>

      {showAdd && (
        <AddStudentForm onSaved={handleSaved} onCancel={() => setShowAdd(false)} />
      )}

      {students.length === 0 && !showAdd ? (
        <div className="empty-state">
          <p>No students yet.</p>
          <button className="ghost-btn" onClick={() => setShowAdd(true)}>
            Add your first student →
          </button>
        </div>
      ) : (
        <div className="student-list">
          {students.map((s) => {
            const done = notedToday(s);
            return (
              <div key={s.id} className="student-row" onClick={() => onCompose(s.id)}>
                <span
                  className={`note-dot${done ? " note-dot--done" : ""}`}
                  title={done ? "Noted today" : "Not yet noted today"}
                />
                <div className="student-row__avatar">{s.initials}</div>
                <div className="student-row__info">
                  <span className="student-row__name">{s.name}</span>
                  <span className="student-row__meta">
                    Gr. {s.grade} · {s.school}
                  </span>
                </div>
                <span className="student-row__action">Note →</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── Composer ──────────────────────────────────────────────────────────

function ComposerView({
  students,
  defaultStudentId,
  onSessionSaved,
  onGoToQuarterly,
}: {
  students: Student[];
  defaultStudentId: string;
  onSessionSaved: () => void;
  onGoToQuarterly: () => void;
}) {
  // Mode
  const [mode, setMode] = useState<"existing" | "quick">(
    students.length > 0 ? "existing" : "quick",
  );

  // Existing-student state
  const [studentId, setStudentId] = useState(defaultStudentId);
  const [selectedGoalIds, setSelectedGoalIds] = useState<string[]>([]);

  // Quick-start state
  const [quickFirst, setQuickFirst] = useState("");
  const [quickLast, setQuickLast] = useState("");
  const [quickSchool, setQuickSchool] = useState("");
  const [quickGrade, setQuickGrade] = useState("3");
  const [quickSaving, setQuickSaving] = useState(false);

  // Shared state
  const [raw, setRaw] = useState("");
  const [format, setFormat] = useState<NoteFormat>("Goal-bullets");
  const [sessionType, setSessionType] = useState<SessionType>("Pull-out");
  const [duration, setDuration] = useState(30);
  const [output, setOutput] = useState<NoteOutput | null>(null);
  const [tab, setTab] = useState<"note" | "log" | "flags">("note");
  const [busy, setBusy] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const student = students.find((s) => s.id === studentId);
  const displayName =
    mode === "existing"
      ? (student?.name ?? "")
      : `${quickFirst} ${quickLast}`.trim();

  // Auto-select all goals when student changes
  useEffect(() => {
    if (student) setSelectedGoalIds(student.goals.map((g) => g.id));
  }, [studentId]); // eslint-disable-line react-hooks/exhaustive-deps

  // Clear output when switching modes
  useEffect(() => {
    setOutput(null);
    setErr(null);
    setSavedMsg(null);
  }, [mode]);

  function toggleGoal(id: string) {
    setSelectedGoalIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  const canGenerate =
    raw.trim().length > 0 &&
    (mode === "quick" ? quickFirst.trim().length > 0 : !!student);

  async function handleGenerate() {
    if (!canGenerate) return;
    setBusy(true);
    setErr(null);
    setSavedMsg(null);
    setOutput(null);
    try {
      const body =
        mode === "existing"
          ? {
              studentId: student!.id,
              sessionType,
              format,
              durationMin: duration,
              dictation: raw,
              goalIds: selectedGoalIds.length > 0 ? selectedGoalIds : undefined,
            }
          : {
              quickName: displayName,
              sessionType,
              format,
              durationMin: duration,
              dictation: raw,
            };

      const res = await fetch("/api/generate-note", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Generation failed");
      setOutput(data.output);
      setTab("note");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setBusy(false);
    }
  }

  async function handleCopy() {
    if (!output?.formatted) return;
    await navigator.clipboard.writeText(output.formatted);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  // Existing-mode: save to DB
  async function handleSave() {
    if (!output || !student) return;
    setSaving(true);
    setErr(null);
    try {
      const res = await fetch("/api/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId: student.id,
          sessionType,
          format,
          durationMin: duration,
          dictation: raw,
          output,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Save failed");
      setSavedMsg(
        data.bulletsInserted > 0
          ? `Note saved · ${data.bulletsInserted} evidence item(s) added from this session`
          : "Note saved · add IEP goals later to turn notes into quarterly evidence",
      );
      setRaw("");
      setOutput(null);
      onSessionSaved();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setSaving(false);
    }
  }

  // Quick-mode: create student then save session
  async function handleQuickSave() {
    if (!output || !quickFirst.trim()) return;
    setQuickSaving(true);
    setErr(null);
    try {
      const sRes = await fetch("/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: displayName,
          school: quickSchool.trim() || "—",
          grade: quickGrade,
        }),
      });
      const sData = await sRes.json();
      if (!sRes.ok) throw new Error(sData.error ?? "Failed to create student");

      const nRes = await fetch("/api/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId: sData.studentId,
          sessionType,
          format,
          durationMin: duration,
          dictation: raw,
          output,
        }),
      });
      const nData = await nRes.json();
      if (!nRes.ok) throw new Error(nData.error ?? "Save failed");

      setSavedMsg(
        `${quickFirst} added to caseload · note saved · complete their profile from Students`,
      );
      setRaw("");
      setOutput(null);
      setQuickFirst("");
      setQuickLast("");
      setQuickSchool("");
      onSessionSaved();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setQuickSaving(false);
    }
  }

  return (
    <div className="db-content">
      <div className="db-header">
        <h1 className="db-title">Composer</h1>
        <span className="db-subtitle">
          Dictate from the car, review, then copy the note into your EMR
        </span>
      </div>
      <div className="composer-privacy-hint">
        Use initials only — omit student names, DOB, and MRN from dictation.
      </div>
      <div className="composer-layout">
        <div>
          {/* ── Mode toggle ── */}
          <div className="composer-mode-toggle">
            <button
              className={`composer-mode-btn${mode === "existing" ? " composer-mode-btn--active" : ""}`}
              onClick={() => setMode("existing")}
              disabled={students.length === 0}
              title={students.length === 0 ? "No students in caseload yet" : undefined}
            >
              Existing student
            </button>
            <button
              className={`composer-mode-btn${mode === "quick" ? " composer-mode-btn--active" : ""}`}
              onClick={() => setMode("quick")}
            >
              Quick start
            </button>
          </div>

          <div className="field-row">
            {/* ── Student field: dropdown or name inputs ── */}
            {mode === "existing" ? (
              students.length > 0 ? (
                <div className="field">
                  <label className="field-label">Student</label>
                  <select
                    className="field-select"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                  >
                    {students.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} · Gr. {s.grade} · {s.school}
                      </option>
                    ))}
                  </select>
                </div>
              ) : null
            ) : (
              <>
                <div className="field">
                  <label className="field-label">First name</label>
                  <input
                    className="field-input"
                    placeholder="First"
                    value={quickFirst}
                    onChange={(e) => setQuickFirst(e.target.value)}
                    autoFocus
                  />
                </div>
                <div className="field">
                  <label className="field-label">Last name</label>
                  <input
                    className="field-input"
                    placeholder="Last (optional)"
                    value={quickLast}
                    onChange={(e) => setQuickLast(e.target.value)}
                  />
                </div>
              </>
            )}

            <div className="field">
              <label className="field-label">Session type</label>
              <select
                className="field-select"
                value={sessionType}
                onChange={(e) => setSessionType(e.target.value as SessionType)}
              >
                {(
                  ["Pull-out", "Push-in", "Consult", "Group", "Eval", "Re-eval"] as SessionType[]
                ).map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label className="field-label">Format</label>
              <select
                className="field-select"
                value={format}
                onChange={(e) => setFormat(e.target.value as NoteFormat)}
              >
                <option>Goal-bullets</option>
                <option>SOAP</option>
                <option>DAP</option>
                <option>Narrative</option>
              </select>
            </div>
            <div className="field">
              <label className="field-label">Duration (min)</label>
              <select
                className="field-select"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
              >
                {[15, 20, 30, 45, 60].map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>

          {/* ── Goal checkboxes — existing mode only ── */}
          {mode === "existing" && student && student.goals.length > 0 && (
            <div className="goal-checkboxes">
              <p className="field-label" style={{ marginBottom: 8 }}>
                Goals to address in this note
              </p>
              {student.goals.map((g) => (
                <label key={g.id} className="goal-checkbox-item">
                  <input
                    type="checkbox"
                    checked={selectedGoalIds.includes(g.id)}
                    onChange={() => toggleGoal(g.id)}
                  />
                  <span>{g.text}</span>
                </label>
              ))}
            </div>
          )}

          {mode === "existing" && student && student.goals.length === 0 && (
            <p className="composer-quick-hint">
              No IEP goals linked yet — you can still generate and save today&apos;s note.
              Add goals from Students when you want notes to create quarterly evidence.
            </p>
          )}

          {/* ── Quick mode hint ── */}
          {mode === "quick" && (
            <p className="composer-quick-hint">
              No setup needed — get the note while the session is still fresh. Add goals
              later if you want saved notes to feed quarterly reports.
            </p>
          )}

          <label className="field-label" style={{ marginBottom: 8, display: "block" }}>
            Post-session dictation
          </label>
          <MicButton
            onTranscript={(text) =>
              setRaw((prev) => prev + (prev.trimEnd() ? " " : "") + text)
            }
          />
          <textarea
            className="composer-textarea"
            placeholder={`60 seconds of what happened. e.g. "Started 9:32, ended 10:02. Pulled L.C. for fine-motor — bead stringing, 8 of 10 today. Trialed weighted lap pad for seated tolerance, got 3.5 min before seeking movement…"`}
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
          />
          <button
            className="compose-btn"
            onClick={handleGenerate}
            disabled={!canGenerate || busy}
          >
            {busy ? "Generating with Gemini…" : "Generate note →"}
          </button>
          {err && <p className="error-msg">⚠ {err}</p>}
        </div>

        {output && (
          <div className="composer-output">
            <div className="output-tabs">
              {(["note", "log", "flags"] as const).map((t) => (
                <button
                  key={t}
                  className={`output-tab ${tab === t ? "output-tab--active" : ""}`}
                  onClick={() => setTab(t)}
                >
                  {t === "note"
                    ? "Note"
                    : t === "log"
                    ? `${mode === "existing" && student ? student.state_program : "Service"} log`
                    : `Flags${output.flags.length > 0 ? ` (${output.flags.length})` : ""}`}
                </button>
              ))}
            </div>
            {tab === "note" && (
              <>
                <pre className="output-pre">{output.formatted}</pre>
                <button className="copy-btn" onClick={handleCopy}>
                  {copied ? "✓ Copied" : "Copy to clipboard"}
                </button>
              </>
            )}
            {tab === "log" && (
              <div className="billing-list">
                {output.service_log.map((f, i) => (
                  <div key={i} className="billing-row">
                    <span className="log-label">{f.label}</span>
                    <span className="log-value">{f.value}</span>
                    {f.required && <span className="log-req">required</span>}
                  </div>
                ))}
              </div>
            )}
            {tab === "flags" && (
              <div className="flag-list">
                {output.flags.length === 0 ? (
                  <p className="flags-clear">No compliance issues detected.</p>
                ) : (
                  output.flags.map((f, i) => (
                    <div key={i} className={`flag-item flag-item--${f.level}`}>
                      <span className="flag-icon">{f.level === "error" ? "✕" : "!"}</span>
                      <span>{f.message}</span>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* ── Existing mode: save note and optional goal evidence ── */}
            {mode === "existing" && student && (
              <div className="save-bar">
                <span className="save-bar__hint">
                  Saving stores today&apos;s note. If goals were selected, Cadence also adds
                  evidence from this session for later reports.
                </span>
                <button className="compose-btn" onClick={handleSave} disabled={saving}>
                  {saving ? "Saving…" : "Save note →"}
                </button>
              </div>
            )}

            {/* ── Quick mode: add to caseload ── */}
            {mode === "quick" && (
              <div className="quick-save-prompt">
                <p className="quick-save-hint">
                  Add {quickFirst || "this student"} to your caseload so this note is saved.
                  You can complete goals later.
                </p>
                <div className="quick-save-fields">
                  <input
                    className="field-input"
                    placeholder="School (optional)"
                    value={quickSchool}
                    onChange={(e) => setQuickSchool(e.target.value)}
                  />
                  <select
                    className="field-select"
                    value={quickGrade}
                    onChange={(e) => setQuickGrade(e.target.value)}
                  >
                    {["K", "1", "2", "3", "4", "5", "6", "7", "8"].map((g) => (
                      <option key={g}>{g}</option>
                    ))}
                  </select>
                  <button
                    className="compose-btn"
                    onClick={handleQuickSave}
                    disabled={quickSaving}
                    style={{ flexShrink: 0 }}
                  >
                    {quickSaving ? "Saving…" : "Add to caseload & save →"}
                  </button>
                </div>
                <button className="copy-btn" onClick={handleCopy} style={{ marginTop: 8 }}>
                  {copied ? "✓ Copied" : "Just copy the note"}
                </button>
              </div>
            )}
          </div>
        )}

        {savedMsg && (
          <div className="saved-bar">
            <span className="saved-bar__msg">✓ {savedMsg}</span>
            <button className="ghost-btn" onClick={onGoToQuarterly}>
              View saved notes →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Quarterly Progress Report Wizard ──────────────────────────────────

function QuarterlyView({ students }: { students: Student[] }) {
  const [studentId, setStudentId] = useState(students[0]?.id ?? "");
  const [drafted, setDrafted] = useState<Record<string, string>>({});
  const [drafting, setDrafting] = useState<string | null>(null);
  const [saving, setSaving] = useState<string | null>(null); // goalId being saved
  const [exporting, setExporting] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [sessions, setSessions] = useState<SessionRecord[]>([]);
  const [loadingSessions, setLoadingSessions] = useState(false);
  const [expandedNote, setExpandedNote] = useState<string | null>(null);

  // When student changes: load persisted draft paragraphs and session history.
  useEffect(() => {
    const s = students.find((s) => s.id === studentId);
    const initial: Record<string, string> = {};
    if (s) {
      for (const g of s.goals) {
        if (g.draft_paragraph) initial[g.id] = g.draft_paragraph;
      }
    }
    setDrafted(initial);
    setExpandedNote(null);

    // Fetch session history
    if (!studentId) return;
    setLoadingSessions(true);
    fetch(`/api/sessions?studentId=${studentId}`)
      .then((r) => r.json())
      .then((d) => setSessions(d.sessions ?? []))
      .catch(() => setSessions([]))
      .finally(() => setLoadingSessions(false));
  }, [studentId]); // eslint-disable-line react-hooks/exhaustive-deps

  const student = students.find((s) => s.id === studentId);

  async function draftParagraph(goal: IEPGoal): Promise<boolean> {
    setDrafting(goal.id);
    try {
      const res = await fetch("/api/quarterly-draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goalId: goal.id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Draft failed");
      setDrafted((prev) => ({ ...prev, [goal.id]: data.paragraph }));
      return true;
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Unknown error");
      return false;
    } finally {
      setDrafting(null);
    }
  }

  // Persist an edited draft paragraph back to the DB
  async function saveDraft(goalId: string, text: string) {
    setSaving(goalId);
    try {
      await fetch("/api/quarterly-draft/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goalId, paragraph: text }),
      });
    } finally {
      setSaving(null);
    }
  }

  async function draftAll() {
    if (!student) return;
    setErr(null);
    const failures: string[] = [];
    for (const g of student.goals) {
      if (drafted[g.id] || g.bullets.length === 0) continue;
      const ok = await draftParagraph(g);
      if (!ok) failures.push(g.text.slice(0, 40) + "…");
      await new Promise((r) => setTimeout(r, 250));
    }
    if (failures.length > 0) {
      setErr(`${failures.length} goal(s) failed — try the individual buttons.`);
    }
  }

  async function exportWord() {
    if (!student) return;
    setExporting(true);
    setErr(null);
    try {
      const res = await fetch("/api/quarterly-export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId: student.id, paragraphs: drafted }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Export failed");
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `quarterly-${student.name.replace(/\s+/g, "_")}.docx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setExporting(false);
    }
  }

  if (students.length === 0) {
    return (
      <div className="db-content">
        <div className="db-header">
          <h1 className="db-title">Quarterly progress reports</h1>
          <span className="db-subtitle">
            An afterthought built from the daily notes you save in Composer
          </span>
        </div>
        <div className="empty-state">
          <p>
            No students yet. Start in Composer with Quick start, save the note,
            then add goals when you want saved sessions to become report evidence.
          </p>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="db-content">
        <span className="spinner" />
      </div>
    );
  }

  return (
    <div className="db-content">
      <div className="db-header">
        <h1 className="db-title">Quarterly progress reports</h1>
        <span className="db-subtitle">
          Built later from saved Composer notes, not a separate workflow
        </span>
      </div>

      <div className="quarterly-layout">
        <aside className="quarterly-sidebar">
          <div className="strategy-col__label">Students</div>
          {students.map((s) => (
            <button
              key={s.id}
              className={`quarterly-student ${studentId === s.id ? "quarterly-student--active" : ""}`}
              onClick={() => setStudentId(s.id)}
            >
              <span className="quarterly-student__name">{s.name}</span>
              <span className="quarterly-student__meta">
                Gr. {s.grade} · {s.school}
              </span>
            </button>
          ))}
        </aside>

        <div className="quarterly-pane">
          <div className="quarterly-pane__header">
            <div>
              <h2 className="quarterly-pane__title">{student.name}</h2>
              <p className="quarterly-pane__sub">
                Grade {student.grade} · {student.school} · {student.eligibility} ·{" "}
                {student.minutes_delivered}/{student.minutes_prescribed} min delivered
              </p>
            </div>
            <button
              className="compose-btn"
              onClick={draftAll}
              disabled={drafting !== null || student.goals.length === 0}
            >
              {drafting ? "Drafting…" : "Draft quarterly paragraphs →"}
            </button>
          </div>

          {err && <p className="error-msg">⚠ {err}</p>}

          {student.goals.length === 0 ? (
            <div className="empty-state">
              <p>
                No IEP goals linked yet. Saved notes still live below; add goals from
                Students when you want Cadence to turn future notes into report evidence.
              </p>
            </div>
          ) : student.goals.map((g) => (
            <div key={g.id} className="goal-card">
              <div className="goal-card__header">
                <span className="goal-card__text">{g.text}</span>
                <span className={`goal-status goal-status--${g.status}`}>
                  {g.status === "mastered"
                    ? "Mastered"
                    : g.status === "on-track"
                    ? "On track"
                    : "Needs revision"}
                </span>
              </div>
              <div className="goal-card__criterion">
                <span>Baseline:</span> {g.baseline}
                <span style={{ marginLeft: 16 }}>Criterion:</span> {g.criterion}
              </div>
              <div className="bullet-bank">
                <div className="strategy-col__label" style={{ marginBottom: 8 }}>
                  Evidence from saved notes ({g.bullets.length})
                </div>
                {g.bullets.length === 0 ? (
                  <p style={{ fontSize: 13, color: "var(--ink-3)" }}>
                    No evidence yet. Save a Composer note that addresses this goal,
                    and Cadence will add session evidence here.
                  </p>
                ) : (
                  g.bullets.map((b) => (
                    <div key={b.id} className="bullet-item">
                      <span className="bullet-date">{b.week_label}</span>
                      <span className="bullet-obs">{b.observation}</span>
                      {b.data_point && (
                        <span className="bullet-data">{b.data_point}</span>
                      )}
                    </div>
                  ))
                )}
              </div>
              {drafted[g.id] ? (
                <div className="drafted-paragraph">
                  <div className="drafted-paragraph__header">
                    <span className="strategy-col__label">IDEA-compliant progress narrative</span>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      {saving === g.id && (
                        <span style={{ fontSize: 11, color: "var(--ink-3)" }}>Saving…</span>
                      )}
                      <button
                        className="ghost-btn"
                        style={{ fontSize: 12, padding: "4px 10px" }}
                        onClick={() => draftParagraph(g)}
                        disabled={drafting === g.id}
                      >
                        {drafting === g.id ? "Re-drafting…" : "Re-draft →"}
                      </button>
                    </div>
                  </div>
                  <textarea
                    className="draft-textarea"
                    value={drafted[g.id]}
                    onChange={(e) =>
                      setDrafted((prev) => ({ ...prev, [g.id]: e.target.value }))
                    }
                    onBlur={(e) => saveDraft(g.id, e.target.value)}
                  />
                </div>
              ) : (
                <button
                  className="ghost-btn"
                  onClick={() => draftParagraph(g)}
                  disabled={drafting === g.id || g.bullets.length === 0}
                >
                  {drafting === g.id
                    ? "Drafting with Gemini…"
                    : g.bullets.length === 0
                    ? "No saved-note evidence yet"
                    : "Draft quarterly paragraph →"}
                </button>
              )}
            </div>
          ))}

          {Object.keys(drafted).length > 0 && (
            <div className="export-bar">
              <span>
                {Object.keys(drafted).length} of {student.goals.length} paragraphs drafted
              </span>
              <button
                className="compose-btn"
                onClick={exportWord}
                disabled={exporting}
              >
                {exporting ? "Exporting…" : "Export to Word →"}
              </button>
            </div>
          )}

          {/* ── Session notes history ── */}
          <div className="sessions-history">
            <div className="sessions-history__header">
              <span className="strategy-col__label">
                Session notes ({sessions.length})
              </span>
              <span className="sessions-history__hint">
                Daily notes you saved from the Composer
              </span>
            </div>
            {loadingSessions ? (
              <span className="spinner" style={{ margin: "12px 0" }} />
            ) : sessions.length === 0 ? (
              <p className="sessions-history__empty">
                No notes saved yet. Use Composer after a session to dictate, review,
                and save the note.
              </p>
            ) : (
              sessions.map((s) => (
                <div key={s.id} className="session-row">
                  <div className="session-row__meta">
                    <span className="session-row__date">
                      {new Date(s.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span className="session-row__type">{s.session_type}</span>
                    <span className="session-row__format">{s.format}</span>
                    <span className="session-row__dur">{s.duration_min} min</span>
                    {s.formatted_output && (
                      <button
                        className="ghost-btn"
                        style={{ fontSize: 12, padding: "3px 10px", marginLeft: "auto" }}
                        onClick={() =>
                          setExpandedNote(expandedNote === s.id ? null : s.id)
                        }
                      >
                        {expandedNote === s.id ? "Hide" : "View note"}
                      </button>
                    )}
                  </div>
                  {expandedNote === s.id && s.formatted_output && (
                    <pre className="session-row__note">{s.formatted_output}</pre>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Root ──────────────────────────────────────────────────────────────

export default function AppPage() {
  const [view, setView] = useState<View>("composer");
  const [students, setStudents] = useState<Student[]>([]);
  const [activeStudentId, setActiveStudentId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const fetchStudents = useCallback(async () => {
    try {
      const res = await fetch("/api/students");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to load");
      setStudents(data.students);
      if (data.students[0] && !activeStudentId) {
        setActiveStudentId(data.students[0].id);
      }
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [activeStudentId]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const v = params.get("view");
    if (v === "composer" || v === "students" || v === "quarterly") {
      setView(v as View);
    }
  }, []);

  const navItems: { id: View; label: string; icon: React.ReactNode }[] = [
    {
      id: "composer",
      label: "Composer",
      icon: (
        <svg viewBox="0 0 20 20" aria-hidden="true">
          <path d="M6 3.5h5.5L15 7v9.5H6z" />
          <path d="M11.5 3.5V7H15" />
          <path d="M8 10.5h4M8 13h3" />
        </svg>
      ),
    },
    {
      id: "students",
      label: "Students",
      icon: (
        <svg viewBox="0 0 20 20" aria-hidden="true">
          <circle cx="8" cy="7" r="3" />
          <path d="M3 16c.6-3 2.5-4.7 5-4.7S12.4 13 13 16" />
          <path d="M13 8.5a2.4 2.4 0 0 0 0-4.7M15 16c-.2-1.8-1-3.1-2.4-3.8" />
        </svg>
      ),
    },
    {
      id: "quarterly",
      label: "Quarterly",
      icon: (
        <svg viewBox="0 0 20 20" aria-hidden="true">
          <path d="M4 16h12" />
          <path d="M6 16V9M10 16V5M14 16v-4" />
        </svg>
      ),
    },
  ];

  function openComposer(studentId: string) {
    setActiveStudentId(studentId);
    setView("composer");
  }

  return (
    <div className="app-shell light-app">
      <aside className="app-sidebar">
        <div className="sidebar-brand">
          <div>
            <span className="sidebar-logo">Cadence</span>
            <span className="sidebar-kicker">School OT notes</span>
          </div>
        </div>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`sidebar-nav__item ${view === item.id ? "sidebar-nav__item--active" : ""}`}
              onClick={() => setView(item.id)}
            >
              <span className="sidebar-nav__icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <a href="/" className="sidebar-back">
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="M12 5 7 10l5 5" />
            </svg>
            <span>Back to site</span>
          </a>
        </div>
      </aside>
      <main className="app-main">
        {loading && (
          <div className="db-content">
            <span className="spinner" />
          </div>
        )}
        {err && (
          <div className="db-content">
            <p className="error-msg">⚠ {err}</p>
            <p style={{ marginTop: 12, fontSize: 13, color: "var(--ink-3)" }}>
              Run <code>supabase/schema.sql</code> in your Supabase SQL editor to apply
              the schema, then refresh.
            </p>
          </div>
        )}
        {!loading && !err && (
          <>
            {view === "students" && (
              <StudentsView
                students={students}
                onCompose={openComposer}
                onRefresh={fetchStudents}
              />
            )}
            {view === "composer" && (
              <ComposerView
                students={students}
                defaultStudentId={activeStudentId || students[0]?.id || ""}
                onSessionSaved={fetchStudents}
                onGoToQuarterly={() => setView("quarterly")}
              />
            )}
            {view === "quarterly" && <QuarterlyView students={students} />}
          </>
        )}
      </main>

      {/* ── Mobile bottom nav (hidden on desktop via CSS) ── */}
      <nav className="app-bottom-nav">
        <button
          className={`app-bottom-nav__item${view === "composer" ? " app-bottom-nav__item--active" : ""}`}
          onClick={() => setView("composer")}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M5 3h9l4 4v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
            <path d="M14 3v4h4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
            <path d="M8 11h6M8 14.5h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span>Composer</span>
        </button>
        <button
          className={`app-bottom-nav__item${view === "students" ? " app-bottom-nav__item--active" : ""}`}
          onClick={() => setView("students")}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <circle cx="9" cy="7.5" r="3.5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M2 19c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M15.5 6a3 3 0 010 6M20 19c0-2.761-2-5-4.5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span>Students</span>
        </button>
        <button
          className={`app-bottom-nav__item${view === "quarterly" ? " app-bottom-nav__item--active" : ""}`}
          onClick={() => setView("quarterly")}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M4 18h14M6 18v-7M10 18V8M14 18v-5M18 18V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span>Quarterly</span>
        </button>
      </nav>
    </div>
  );
}
