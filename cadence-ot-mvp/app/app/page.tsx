"use client";

import { useState } from "react";

type View = "dashboard" | "composer" | "strategy" | "competition";
type NoteFormat = "SOAP" | "DAP" | "Narrative";

interface Goal {
  id: string;
  label: string;
  progress: number;
  baseline: string;
  current: string;
}

interface Client {
  id: string;
  name: string;
  initials: string;
  age: number;
  dx: string;
  payer: string;
  authTotal: number;
  authUsed: number;
  goals: Goal[];
  lastNote: string;
  status: "active" | "at-risk";
}

interface NoteOutput {
  formatted: string;
  cptCodes: { code: string; desc: string; units: number }[];
  flags: { level: "error" | "warn"; message: string }[];
}

const CLIENTS: Client[] = [
  {
    id: "c1",
    name: "Jayden Park",
    initials: "JP",
    age: 7,
    dx: "Sensory Processing Disorder, Fine Motor Delay",
    payer: "Cigna",
    authTotal: 30,
    authUsed: 18,
    status: "active",
    lastNote: "2 days ago",
    goals: [
      { id: "g1", label: "Bilateral coordination", progress: 65, baseline: "Drops items during bilateral tasks", current: "Completes 6/10 bilateral tasks with minimal assist" },
      { id: "g2", label: "Pencil grasp", progress: 40, baseline: "Fisted grasp, avoids writing", current: "Transitional grasp emerging, 2-min tolerance" },
      { id: "g3", label: "Sensory regulation", progress: 70, baseline: "Dysregulated 4×/session", current: "Self-regulates with 1 verbal cue in 80% of trials" },
    ],
  },
  {
    id: "c2",
    name: "Elena Vasquez",
    initials: "EV",
    age: 58,
    dx: "CVA (R hemiplegia), ADL deficits",
    payer: "Medicare",
    authTotal: 20,
    authUsed: 17,
    status: "at-risk",
    lastNote: "Yesterday",
    goals: [
      { id: "g4", label: "UE functional reach", progress: 55, baseline: "0° active shoulder flexion", current: "45° shoulder flexion against gravity" },
      { id: "g5", label: "Self-care independence", progress: 30, baseline: "Max assist all ADLs", current: "Min assist upper body dressing" },
    ],
  },
  {
    id: "c3",
    name: "Mateo Reyes",
    initials: "MR",
    age: 9,
    dx: "Developmental Coordination Disorder",
    payer: "BlueCross",
    authTotal: 24,
    authUsed: 8,
    status: "active",
    lastNote: "4 days ago",
    goals: [
      { id: "g6", label: "Handwriting legibility", progress: 50, baseline: "20% letter formation accuracy", current: "55% accuracy on structured tasks" },
      { id: "g7", label: "Visual-motor integration", progress: 60, baseline: "VMI score: 5th percentile", current: "Functional improvement in copying tasks" },
    ],
  },
  {
    id: "c4",
    name: "Ruth Okafor",
    initials: "RO",
    age: 64,
    dx: "Distal radius fracture (L), post-ORIF",
    payer: "Aetna",
    authTotal: 16,
    authUsed: 11,
    status: "active",
    lastNote: "3 days ago",
    goals: [
      { id: "g8", label: "Wrist ROM", progress: 75, baseline: "Flexion 20°, extension 15°", current: "Flexion 48°, extension 32°" },
      { id: "g9", label: "Grip strength", progress: 60, baseline: "8 lbs (L)", current: "18 lbs (L)" },
      { id: "g10", label: "IADLs", progress: 80, baseline: "Unable to prepare meals", current: "Prepares simple meals with adaptive equipment" },
    ],
  },
];

function generateNote(raw: string, format: NoteFormat, duration: number, client: Client): NoteOutput {
  const lower = raw.toLowerCase();
  const flags: NoteOutput["flags"] = [];

  if (!lower.includes("min") && !lower.includes("minute")) {
    flags.push({ level: "warn", message: "No treatment duration documented — required for timed CPT codes." });
  }
  if (!lower.match(/improv|progress|tolerat|achiev|demonstrat/)) {
    flags.push({ level: "warn", message: "Weak functional link — document measurable client response to treatment." });
  }
  if (client.payer === "Medicare" && !lower.match(/skilled|medically necessary/)) {
    flags.push({ level: "error", message: "Medicare requires explicit skilled care justification in the note." });
  }
  if (client.authUsed / client.authTotal >= 0.8) {
    flags.push({ level: "warn", message: `Auth threshold: ${client.authUsed}/${client.authTotal} units used. Begin reauthorization documentation.` });
  }

  const units = Math.max(1, Math.floor(duration / 15));
  const cptCodes: NoteOutput["cptCodes"] = [];
  if (lower.match(/activit|functional|task|occup/)) {
    cptCodes.push({ code: "97530", desc: "Therapeutic Activity", units: Math.min(3, units) });
  }
  if (lower.match(/neuro|facilitat|inhibit/)) {
    cptCodes.push({ code: "97112", desc: "Neuromuscular Re-ed", units: 1 });
  }
  if (lower.match(/adl|dressing|self-care|grooming|feeding|home/)) {
    cptCodes.push({ code: "97535", desc: "Self-Care / Home Mgmt", units: 1 });
  }
  if (cptCodes.length === 0) {
    cptCodes.push({ code: "97530", desc: "Therapeutic Activity", units: Math.min(3, units) });
  }

  const first = client.name.split(" ")[0];
  let formatted = "";
  if (format === "SOAP") {
    formatted = `SUBJECTIVE\n${first} reports participation in today's session. ${raw.slice(0, 100)}.\n\nOBJECTIVE\nClient participated in a ${duration}-minute skilled OT session. ${raw}\n\nASSESSMENT\nClient demonstrates measurable progress toward established goals. Continued skilled OT intervention is medically necessary to achieve functional independence.\n\nPLAN\nContinue OT ${duration} min, 2×/week. Reassess goals at next 4-session interval.`;
  } else if (format === "DAP") {
    formatted = `DATA\n${raw}\n\nASSESSMENT\nClient demonstrates measurable progress toward treatment goals. Skilled OT remains medically necessary.\n\nPLAN\nContinue current plan of care. Reassess in 4 sessions.`;
  } else {
    formatted = `${first} participated in a ${duration}-minute occupational therapy session. ${raw} Client continues to demonstrate progress toward functional goals consistent with the established plan of care. Skilled OT is medically necessary to achieve stated outcomes.`;
  }

  return { formatted, cptCodes, flags };
}

// ── Views ─────────────────────────────────────────────────────────────

function DashboardView({ onCompose }: { onCompose: (id: string) => void }) {
  return (
    <div className="db-content">
      <div className="db-header">
        <h1 className="db-title">Caseload</h1>
        <span className="db-subtitle">{CLIENTS.length} active clients</span>
      </div>
      <div className="client-grid">
        {CLIENTS.map((c) => {
          const pct = Math.round((c.authUsed / c.authTotal) * 100);
          return (
            <div key={c.id} className="client-card" onClick={() => onCompose(c.id)}>
              <div className="client-card__top">
                <div className="client-avatar">{c.initials}</div>
                <div>
                  <div className="client-name">{c.name}</div>
                  <div className="client-meta">{c.age}y · {c.payer}</div>
                </div>
                <span className={`badge badge--${c.status === "at-risk" ? "red" : "green"}`}>
                  {c.status === "at-risk" ? "At risk" : "Active"}
                </span>
              </div>
              <div className="client-dx">{c.dx}</div>
              <div className="auth-bar">
                <div className="auth-bar__label">
                  <span>Auth units</span>
                  <span className={pct >= 80 ? "text-red" : ""}>{c.authUsed}/{c.authTotal}</span>
                </div>
                <div className="progress-track">
                  <div
                    className={`progress-fill ${pct >= 80 ? "progress-fill--risk" : "progress-fill--ok"}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
              <div className="goal-list">
                {c.goals.slice(0, 2).map((g) => (
                  <div key={g.id} className="goal-row">
                    <span className="goal-label">{g.label}</span>
                    <div className="goal-bar">
                      <div className="goal-bar__fill" style={{ width: `${g.progress}%` }} />
                    </div>
                    <span className="goal-pct">{g.progress}%</span>
                  </div>
                ))}
              </div>
              <div className="client-card__footer">Last session: {c.lastNote}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ComposerView({ defaultClientId }: { defaultClientId: string }) {
  const [raw, setRaw] = useState("");
  const [format, setFormat] = useState<NoteFormat>("SOAP");
  const [duration, setDuration] = useState(45);
  const [clientId, setClientId] = useState(defaultClientId);
  const [output, setOutput] = useState<NoteOutput | null>(null);
  const [tab, setTab] = useState<"note" | "billing" | "flags">("note");

  const client = CLIENTS.find((c) => c.id === clientId)!;

  function handleGenerate() {
    if (!raw.trim()) return;
    const result = generateNote(raw, format, duration, client);
    setOutput(result);
    setTab("note");
  }

  return (
    <div className="db-content">
      <div className="db-header">
        <h1 className="db-title">Composer</h1>
        <span className="db-subtitle">Generate a payer-defensible note</span>
      </div>
      <div className="composer-layout">
        <div>
          <div className="field-row">
            <div className="field">
              <label className="field-label">Client</label>
              <select className="field-select" value={clientId} onChange={(e) => setClientId(e.target.value)}>
                {CLIENTS.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div className="field">
              <label className="field-label">Format</label>
              <select className="field-select" value={format} onChange={(e) => setFormat(e.target.value as NoteFormat)}>
                <option>SOAP</option>
                <option>DAP</option>
                <option>Narrative</option>
              </select>
            </div>
            <div className="field">
              <label className="field-label">Duration (min)</label>
              <select className="field-select" value={duration} onChange={(e) => setDuration(Number(e.target.value))}>
                {[30, 45, 60, 75, 90].map((d) => <option key={d}>{d}</option>)}
              </select>
            </div>
          </div>
          <label className="field-label" style={{ marginBottom: 8, display: "block" }}>Session notes</label>
          <textarea
            className="composer-textarea"
            placeholder="Describe what happened in the session — interventions used, client response, progress observed..."
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
          />
          <button className="compose-btn" onClick={handleGenerate} disabled={!raw.trim()}>
            Generate note →
          </button>
        </div>

        {output && (
          <div className="composer-output">
            <div className="output-tabs">
              {(["note", "billing", "flags"] as const).map((t) => (
                <button
                  key={t}
                  className={`output-tab ${tab === t ? "output-tab--active" : ""}`}
                  onClick={() => setTab(t)}
                >
                  {t === "note" ? "Note" : t === "billing" ? "Billing" : `Flags${output.flags.length > 0 ? ` (${output.flags.length})` : ""}`}
                </button>
              ))}
            </div>
            {tab === "note" && <pre className="output-pre">{output.formatted}</pre>}
            {tab === "billing" && (
              <div className="billing-list">
                {output.cptCodes.map((c, i) => (
                  <div key={i} className="billing-row">
                    <span className="billing-code">{c.code}</span>
                    <span className="billing-desc">{c.desc}</span>
                    <span className="billing-units">{c.units}u</span>
                  </div>
                ))}
              </div>
            )}
            {tab === "flags" && (
              <div className="flag-list">
                {output.flags.length === 0
                  ? <p className="flags-clear">No compliance issues detected.</p>
                  : output.flags.map((f, i) => (
                    <div key={i} className={`flag-item flag-item--${f.level}`}>
                      <span className="flag-icon">{f.level === "error" ? "✕" : "!"}</span>
                      <span>{f.message}</span>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function StrategyView() {
  const mustShip = [
    "Post-session dictation → structured SOAP / DAP / Narrative",
    "Goal-linked evidence extraction",
    "CPT code + timed-unit allocation",
    "Compliance linting (denial risk flags)",
    "Reauth packet generator",
    "Multi-payer rule set (Medicare, Cigna, commercial)",
  ];
  const defer = [
    "EHR integration (Epic, WebPT, Therabill)",
    "Voice-to-text capture",
    "Caregiver home program generator",
    "Outcome measure tracking (COPM, PEDI)",
  ];
  return (
    <div className="db-content">
      <div className="db-header">
        <h1 className="db-title">Strategy</h1>
        <span className="db-subtitle">MVP scope — outpatient OT pilot</span>
      </div>
      <div className="strategy-grid">
        <div>
          <div className="strategy-col__label">Must ship</div>
          {mustShip.map((item, i) => (
            <div key={i} className="strategy-item strategy-item--ship">
              <span className="strategy-check">✓</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
        <div>
          <div className="strategy-col__label">Defer</div>
          {defer.map((item, i) => (
            <div key={i} className="strategy-item strategy-item--defer">
              <span className="strategy-check">○</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="pilot-metrics">
        <div className="strategy-col__label" style={{ marginBottom: 16 }}>Pilot success metrics</div>
        <div className="metrics-grid">
          {[
            { label: "Note time", target: "< 3 min", current: "~12 min baseline" },
            { label: "Denial rate", target: "< 2%", current: "Industry avg 8%" },
            { label: "Therapist NPS", target: "> 40", current: "TBD" },
            { label: "Pilot practices", target: "5", current: "0 signed" },
          ].map((m, i) => (
            <div key={i} className="metric-card">
              <div className="metric-label">{m.label}</div>
              <div className="metric-target">{m.target}</div>
              <div className="metric-current">{m.current}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CompetitionView() {
  const competitors = [
    { name: "Fusion Web Clinic", strength: "Strong EHR with built-in billing", wedge: "No AI note generation — manual templates only" },
    { name: "WebPT", strength: "Market leader, 75k+ users", wedge: "No AI; expensive; PT-first, OT secondary" },
    { name: "Therabill", strength: "OT-friendly billing workflows", wedge: "Documentation is the weak link" },
    { name: "Noteable", strength: "AI-assisted notes (mental health)", wedge: "Not built for rehab billing rules" },
    { name: "Medilinks", strength: "Rehab-specific workflows", wedge: "Dated UX, no LLM layer" },
    { name: "TheraNest", strength: "Affordable, multi-discipline", wedge: "AI features minimal; no payer logic" },
  ];
  return (
    <div className="db-content">
      <div className="db-header">
        <h1 className="db-title">Competition</h1>
        <span className="db-subtitle">Outpatient rehab documentation landscape</span>
      </div>
      <div className="comp-grid">
        {competitors.map((c, i) => (
          <div key={i} className="comp-card">
            <div className="comp-name">{c.name}</div>
            <div className="comp-row">
              <span className="comp-tag comp-tag--strength">Strength</span>
              <span className="comp-text">{c.strength}</span>
            </div>
            <div className="comp-row">
              <span className="comp-tag comp-tag--wedge">Our wedge</span>
              <span className="comp-text">{c.wedge}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Root ─────────────────────────────────────────────────────────────

export default function AppPage() {
  const [view, setView] = useState<View>("dashboard");
  const [activeClientId, setActiveClientId] = useState(CLIENTS[0].id);

  const navItems: { id: View; label: string }[] = [
    { id: "dashboard", label: "Dashboard" },
    { id: "composer", label: "Composer" },
    { id: "strategy", label: "Strategy" },
    { id: "competition", label: "Competition" },
  ];

  function openComposer(clientId: string) {
    setActiveClientId(clientId);
    setView("composer");
  }

  return (
    <div className="app-shell">
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
          <a href="/" className="sidebar-back">← Back to site</a>
        </div>
      </aside>
      <main className="app-main">
        {view === "dashboard" && <DashboardView onCompose={openComposer} />}
        {view === "composer" && <ComposerView defaultClientId={activeClientId} />}
        {view === "strategy" && <StrategyView />}
        {view === "competition" && <CompetitionView />}
      </main>
    </div>
  );
}
