"use client";

import { useState, useEffect, useCallback } from "react";
import type {
  Student,
  IEPGoal,
  NoteFormat,
  NoteOutput,
  SessionType,
} from "@/lib/types";

type View = "dashboard" | "composer" | "quarterly";

// ── Derived helpers ──────────────────────────────────────────────────

function deliveryPct(s: Student): number {
  return Math.round((s.minutes_delivered / s.minutes_prescribed) * 100);
}

function isAtRisk(s: Student): { atRisk: boolean; reason?: string } {
  if (!s.parental_medicaid_consent && s.medicaid_billable)
    return { atRisk: true, reason: "No parental Medicaid consent" };
  if (s.triennial_reeval_days <= 60)
    return { atRisk: true, reason: `Re-eval due in ${s.triennial_reeval_days}d` };
  if (s.iep_anniversary_days <= 30)
    return { atRisk: true, reason: `IEP due in ${s.iep_anniversary_days}d` };
  if (deliveryPct(s) < 80)
    return { atRisk: true, reason: `${100 - deliveryPct(s)}% under-delivered` };
  return { atRisk: false };
}

function groupBySchool(students: Student[]): Record<string, Student[]> {
  return students.reduce<Record<string, Student[]>>((acc, s) => {
    (acc[s.school] ||= []).push(s);
    return acc;
  }, {});
}

// ── Dashboard ────────────────────────────────────────────────────────

function DashboardView({
  students,
  onCompose,
}: {
  students: Student[];
  onCompose: (id: string) => void;
}) {
  const grouped = groupBySchool(students);
  const atRiskCount = students.filter((s) => isAtRisk(s).atRisk).length;
  const nextDueDays = students.length
    ? Math.min(...students.map((s) => s.quarterly_report_due_days))
    : null;

  return (
    <div className="db-content">
      <div className="db-header">
        <h1 className="db-title">Caseload</h1>
        <span className="db-subtitle">
          {students.length} students · {Object.keys(grouped).length} schools ·{" "}
          {atRiskCount} at-risk
          {nextDueDays !== null && ` · Quarterly reports due in ${nextDueDays} days`}
        </span>
      </div>
      {Object.entries(grouped).map(([school, group]) => (
        <div key={school} className="school-group">
          <div className="school-group__header">
            <span className="school-group__name">{school}</span>
            <span className="school-group__count">{group.length} students</span>
          </div>
          <div className="client-grid">
            {group.map((s) => {
              const pct = deliveryPct(s);
              const risk = isAtRisk(s);
              return (
                <div key={s.id} className="client-card" onClick={() => onCompose(s.id)}>
                  <div className="client-card__top">
                    <div className="client-avatar">{s.initials}</div>
                    <div>
                      <div className="client-name">{s.name}</div>
                      <div className="client-meta">
                        Gr. {s.grade} · {s.eligibility} · {s.state_program}
                      </div>
                    </div>
                    <span className={`badge badge--${risk.atRisk ? "red" : "green"}`}>
                      {risk.atRisk ? "At risk" : "On track"}
                    </span>
                  </div>
                  {risk.atRisk && <div className="risk-reason">⚠ {risk.reason}</div>}
                  <div className="auth-bar">
                    <div className="auth-bar__label">
                      <span>IEP minutes this quarter</span>
                      <span className={pct < 80 ? "text-red" : ""}>
                        {s.minutes_delivered}/{s.minutes_prescribed} min
                      </span>
                    </div>
                    <div className="progress-track">
                      <div
                        className={`progress-fill ${pct < 80 ? "progress-fill--risk" : "progress-fill--ok"}`}
                        style={{ width: `${Math.min(100, pct)}%` }}
                      />
                    </div>
                  </div>
                  <div className="goal-list">
                    {s.goals.slice(0, 2).map((g) => {
                      const last = g.bullets[g.bullets.length - 1];
                      return (
                        <div key={g.id} className="goal-row">
                          <span className="goal-label">
                            {g.text.split(" ").slice(0, 4).join(" ")}…
                          </span>
                          <span className={`goal-status goal-status--${g.status}`}>
                            {g.status === "mastered"
                              ? "Mastered"
                              : g.status === "on-track"
                              ? "On track"
                              : "Revise"}
                          </span>
                          <span className="goal-pct">{last?.data_point ?? "—"}</span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="client-card__footer">
                    <span>Last: {s.last_session ?? "—"}</span>
                    <span>
                      IEP {s.iep_anniversary_days}d · Re-eval {s.triennial_reeval_days}d
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Composer ─────────────────────────────────────────────────────────

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
  const [output, setOutput] = useState<NoteOutput | null>(null);
  const [tab, setTab] = useState<"note" | "log" | "flags">("note");
  const [busy, setBusy] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const student = students.find((s) => s.id === studentId);

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

  if (!student) {
    return <div className="db-content"><p>Loading…</p></div>;
  }

  return (
    <div className="db-content">
      <div className="db-header">
        <h1 className="db-title">Composer</h1>
        <span className="db-subtitle">
          Post-session dictation → goal-anchored bullets banked toward the quarterly report
        </span>
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
          <label className="field-label" style={{ marginBottom: 8, display: "block" }}>
            Post-session dictation
          </label>
          <textarea
            className="composer-textarea"
            placeholder={`60 seconds of what happened. e.g. "Started 9:32, ended 10:02. Pulled Liam for fine-motor — bead stringing, 8 of 10 today, independent. Trialed weighted lap pad for seated tolerance, got 3.5 min before he sought movement..."`}
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
          />
          <button className="compose-btn" onClick={handleGenerate} disabled={!raw.trim() || busy}>
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
            {tab === "note" && <pre className="output-pre">{output.formatted}</pre>}
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
                Saving banks the goal-bullets toward {student.name.split(" ")[0]}&apos;s quarterly report.
              </span>
              <button className="compose-btn" onClick={handleSave} disabled={saving}>
                {saving ? "Saving…" : "Save session + bank bullets →"}
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

// ── Quarterly Progress Report Wizard ─────────────────────────────────

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
      // Skip goals already drafted (re-running the button should be cheap)
      if (drafted[g.id] || g.bullets.length === 0) continue;
      const ok = await draftParagraph(g);
      if (!ok) failures.push(g.text.slice(0, 40) + "…");
      // Small spacing to avoid Gemini per-minute rate limits
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
    return <div className="db-content"><span className="spinner" /></div>;
  }

  return (
    <div className="db-content">
      <div className="db-header">
        <h1 className="db-title">Quarterly progress reports</h1>
        <span className="db-subtitle">
          Week 9 of Q3 · {students.length} reports due in 5 days · IDEA §300.320(a)(3)
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
            <button className="compose-btn" onClick={draftAll} disabled={drafting !== null}>
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
                    No banked observations yet. Use the Composer to dictate sessions for this goal.
                  </p>
                ) : (
                  g.bullets.map((b) => (
                    <div key={b.id} className="bullet-item">
                      <span className="bullet-date">{b.week_label}</span>
                      <span className="bullet-obs">{b.observation}</span>
                      {b.data_point && <span className="bullet-data">{b.data_point}</span>}
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
              <button className="compose-btn" onClick={exportWord} disabled={exporting}>
                {exporting ? "Exporting…" : "Export to Word →"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Root ─────────────────────────────────────────────────────────────

export default function AppPage() {
  const [view, setView] = useState<View>("dashboard");
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

  const navItems: { id: View; label: string }[] = [
    { id: "dashboard", label: "Caseload" },
    { id: "composer", label: "Composer" },
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
              Did you run <code>supabase/schema.sql</code> in your Supabase SQL editor?
            </p>
          </div>
        )}
        {!loading && !err && (
          <>
            {view === "dashboard" && (
              <DashboardView students={students} onCompose={openComposer} />
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
