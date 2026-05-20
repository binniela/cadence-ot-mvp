"use client";

import { useState, useEffect, useCallback } from "react";
import type { Student, IEPGoal, NoteFormat, NoteOutput, SessionType } from "@/lib/types";
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
            placeholder="e.g. L.C. or Liam Carter"
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
  const [raw, setRaw] = useState("");
  const [format, setFormat] = useState<NoteFormat>("Goal-bullets");
  const [sessionType, setSessionType] = useState<SessionType>("Pull-out");
  const [duration, setDuration] = useState(30);
  const [studentId, setStudentId] = useState(defaultStudentId);
  const [selectedGoalIds, setSelectedGoalIds] = useState<string[]>([]);
  const [output, setOutput] = useState<NoteOutput | null>(null);
  const [tab, setTab] = useState<"note" | "log" | "flags">("note");
  const [busy, setBusy] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const student = students.find((s) => s.id === studentId);

  // Default: select all goals when student changes
  useEffect(() => {
    if (student) {
      setSelectedGoalIds(student.goals.map((g) => g.id));
    }
  }, [studentId]); // eslint-disable-line react-hooks/exhaustive-deps

  function toggleGoal(id: string) {
    setSelectedGoalIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  async function handleGenerate() {
    if (!raw.trim() || !student) return;
    setBusy(true);
    setErr(null);
    setSavedMsg(null);
    setOutput(null);
    try {
      const res = await fetch("/api/generate-note", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId: student.id,
          sessionType,
          format,
          durationMin: duration,
          dictation: raw,
          goalIds: selectedGoalIds.length > 0 ? selectedGoalIds : undefined,
        }),
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
      setSavedMsg(`Saved · ${data.bulletsInserted} bullet(s) banked to quarterly`);
      setRaw("");
      setOutput(null);
      onSessionSaved();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setSaving(false);
    }
  }

  if (!student && students.length === 0) {
    return (
      <div className="db-content">
        <p style={{ color: "var(--ink-3)", fontSize: 14 }}>
          Add a student first from the Students tab.
        </p>
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
        <h1 className="db-title">Composer</h1>
        <span className="db-subtitle">
          Post-session dictation → goal-anchored note, copy to your EMR
        </span>
      </div>
      <div className="composer-privacy-hint">
        Use initials only — omit student names, DOB, and MRN from dictation.
      </div>
      <div className="composer-layout">
        <div>
          <div className="field-row">
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
            <div className="field">
              <label className="field-label">Session type</label>
              <select
                className="field-select"
                value={sessionType}
                onChange={(e) => setSessionType(e.target.value as SessionType)}
              >
                {(
                  [
                    "Pull-out",
                    "Push-in",
                    "Consult",
                    "Group",
                    "Eval",
                    "Re-eval",
                  ] as SessionType[]
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

          {student.goals.length > 0 && (
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
            disabled={!raw.trim() || busy}
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
                    ? `${student.state_program} log`
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
            <div className="save-bar">
              <span className="save-bar__hint">
                Saving banks the goal-bullets toward {student.name.split(" ")[0]}&apos;s
                quarterly report.
              </span>
              <button className="compose-btn" onClick={handleSave} disabled={saving}>
                {saving ? "Saving…" : "Save + bank bullets →"}
              </button>
            </div>
          </div>
        )}

        {savedMsg && (
          <div className="saved-bar">
            <span className="saved-bar__msg">✓ {savedMsg}</span>
            <button className="ghost-btn" onClick={onGoToQuarterly}>
              View in Quarterly →
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
  const [exporting, setExporting] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // Reset drafts when switching students
  useEffect(() => {
    setDrafted({});
  }, [studentId]);

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
          {students.length} report{students.length !== 1 ? "s" : ""} · IDEA §300.320(a)(3)
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
              disabled={drafting !== null}
            >
              {drafting ? "Drafting…" : "Draft all goals →"}
            </button>
          </div>

          {err && <p className="error-msg">⚠ {err}</p>}

          {student.goals.map((g) => (
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
                  Banked observations ({g.bullets.length})
                </div>
                {g.bullets.length === 0 ? (
                  <p style={{ fontSize: 13, color: "var(--ink-3)" }}>
                    No banked observations yet. Use the Composer to dictate sessions for
                    this goal.
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
                  <div className="strategy-col__label" style={{ marginBottom: 8 }}>
                    IDEA-compliant progress narrative
                  </div>
                  <p>{drafted[g.id]}</p>
                </div>
              ) : (
                <button
                  className="ghost-btn"
                  onClick={() => draftParagraph(g)}
                  disabled={drafting === g.id || g.bullets.length === 0}
                >
                  {drafting === g.id
                    ? "Drafting with Gemini…"
                    : "Draft paragraph from banked observations →"}
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

  const navItems: { id: View; label: string }[] = [
    { id: "composer", label: "Composer" },
    { id: "students", label: "Students" },
    { id: "quarterly", label: "Quarterly" },
  ];

  function openComposer(studentId: string) {
    setActiveStudentId(studentId);
    setView("composer");
  }

  return (
    <div className="app-shell light-app">
      <aside className="app-sidebar">
        <div className="sidebar-logo">Cadence</div>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`sidebar-nav__item ${view === item.id ? "sidebar-nav__item--active" : ""}`}
              onClick={() => setView(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <a href="/" className="sidebar-back">
            ← Back to site
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
    </div>
  );
}
