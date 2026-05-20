import { NavBar } from "./components/NavBar";
import { WaitlistForm } from "./components/WaitlistForm";

const stats = [
  ["<60s", "To generate a note"],
  ["4", "Note formats: SOAP, DAP, Goal-bullets, Narrative"],
  ["Any EMR", "Paste into Fusion, My School Therapy, or your district"],
  ["50+", "Students on a typical school caseload"],
  ["5 days", "Advance warning before quarterly due dates"],
];

export default function Home() {
  return (
    <main>
      <NavBar />

      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero__backdrop">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/hero.png" alt="" className="hero__bg-img" aria-hidden="true" />
        </div>
        <div className="hero__overlay" />
        <div className="hero__inner">
          <p className="hero__label">School-based OT · Voice-first</p>
          <h1 className="hero__headline">Document in the hallway, not after bedtime.</h1>
          <p className="hero__sub">
            Tap the mic after your session. Speak for 60 seconds. Cadence
            returns a compliant, goal-linked note — copy it into Fusion,
            My School Therapy, or whatever your district already uses.
          </p>
          <div className="hero__actions">
            <a href="#waitlist" className="btn-primary">Request pilot access</a>
            <a href="/app" className="btn-ghost">Try the composer →</a>
          </div>
          <div className="hero__proofs" aria-label="Cadence focus areas">
            <span>Voice-first</span>
            <span>Any phone</span>
            <span>Paste into any EMR</span>
          </div>
        </div>
      </section>

      {/* ── How it works — 3 steps ── */}
      <section className="evidence-section light" id="how-it-works">
        <div className="evidence-section__body">
          <div>
            <p className="section-label">How it works</p>
            <h2 className="section-title evidence-section__title">
              Three steps. No laptop required.
            </h2>
          </div>
          <div className="evidence-flow">
            <div className="evidence-step">
              <span>01</span>
              <h3>Tap the mic</h3>
              <p>
                Between pull-outs. In the hallway. In your car. Open Cadence
                on your phone and speak naturally about what happened.
                No template. No required structure. Plain language works.
              </p>
            </div>
            <div className="evidence-step">
              <span>02</span>
              <h3>Get a note worth signing</h3>
              <p>
                Cadence generates SOAP, DAP, Goal-bullets, or Narrative —
                your choice. IEP goals are linked, skilled-service language
                is included, and compliance gaps are flagged before you sign.
              </p>
            </div>
            <div className="evidence-step">
              <span>03</span>
              <h3>Paste it anywhere</h3>
              <p>
                One tap copies the note to your clipboard. Paste it into
                Fusion, My School Therapy, SimplePractice, or your district&apos;s
                system. Cadence doesn&apos;t replace anything — it just makes
                the note content better and faster.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Product demo ── */}
      <section className="platform" id="demo">
        <div className="platform__body">
          <div className="platform__copy">
            <p className="section-label">The composer</p>
            <h2 className="section-title platform__title">
              Speak. Review. Copy. Done in under two minutes.
            </h2>
            <p className="platform__desc">
              Quick start takes a first name and a 60-second recap.
              No student profile required to get a usable note.
              Add IEP goals when you have time — every session you document
              banks evidence toward quarterly reports automatically.
            </p>
            <div className="platform__checks">
              <span>No pre-built student profile required</span>
              <span>Compliance flags on every note</span>
              <span>Medicaid service log generated automatically</span>
            </div>
          </div>

          <div className="product-shell" aria-label="Cadence composer preview">
            <div className="product-shell__bar">
              <span />
              <span />
              <span />
              <div>cadence.app/app</div>
            </div>
            <div className="product-shell__surface">
              <aside className="product-shell__rail">
                <strong>Cadence</strong>
                <span className="product-shell__rail-active">Composer</span>
                <span>Students</span>
                <span>Quarterly</span>
              </aside>
              <div className="product-shell__main">
                <div className="product-shell__header">
                  <div>
                    <p>Quick start</p>
                    <h3>Liam C.</h3>
                  </div>
                  <span>Pull-out · 30 min</span>
                </div>
                <div className="composer-input-preview composer-input-preview--mic">
                  <span className="preview-mic-dot" />
                  <p className="composer-input-text">
                    Recording… bead stringing, 8 of 10 today.
                    Weighted lap pad — 3.5 min before seeking movement…
                  </p>
                </div>
                <div className="draft-panel">
                  <span className="product-shell__eyebrow">Generated · Goal-bullets</span>
                  <p>
                    Fine-motor: Completed bead stringing independently (8/10).
                    Functional grasp improving. Seated tolerance: 3.5 min
                    tabletop with weighted lap pad.
                  </p>
                  <span className="preview-copy-chip">Copy to clipboard ↗</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Not a new EMR ── */}
      <section className="caseload-section" id="why-cadence">
        <div className="caseload-section__body">
          <div>
            <p className="section-label">No new system to learn</p>
            <h2 className="caseload-section__title">
              Your district has a system. Cadence works alongside it.
            </h2>
          </div>
          <div className="caseload-section__copy">
            <p>
              School OTs are already managing two systems — the IEP platform
              and the billing EMR. The last thing you need is a third.
              Cadence generates the note content. You paste it wherever
              your district requires.
            </p>
            <div className="caseload-points">
              <div className="caseload-point">
                <span>01</span>
                <div>
                  <strong>No IT approval needed.</strong>
                  <p>
                    Open in Safari, add to your home screen, start using it.
                    There&apos;s no district contract, no data migration, and
                    no onboarding your supervisor.
                  </p>
                </div>
              </div>
              <div className="caseload-point">
                <span>02</span>
                <div>
                  <strong>Works on the phone you already carry.</strong>
                  <p>
                    Cadence is built mobile-first. The mic button works
                    between sessions, in the hallway, at pickup duty.
                    No laptop. No extra device.
                  </p>
                </div>
              </div>
              <div className="caseload-point">
                <span>03</span>
                <div>
                  <strong>Notes that survive documentation audits.</strong>
                  <p>
                    Every generated note includes skilled-service language,
                    IEP goal anchoring, and compliance flags for IDEA and
                    Medicaid requirements — before you ever sign.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Quarterly payoff ── */}
      <section className="evidence-section light" id="quarterly">
        <div className="evidence-section__body">
          <div>
            <p className="section-label">For OTs who want more</p>
            <h2 className="section-title evidence-section__title">
              Every session banks toward the quarterly report.
            </h2>
          </div>
          <div className="evidence-flow">
            <div className="evidence-step">
              <span>01</span>
              <h3>Link your IEP goals</h3>
              <p>
                Add a student&apos;s active goals once. Cadence maps every
                session observation to the right goal — no manual tagging,
                no spreadsheet tracking.
              </p>
            </div>
            <div className="evidence-step">
              <span>02</span>
              <h3>Evidence accumulates</h3>
              <p>
                Each session banks a measurable observation per goal.
                By week eight you have a full data trail —
                chronological, clinical, citation-ready.
              </p>
            </div>
            <div className="evidence-step">
              <span>03</span>
              <h3>Quarterly writes itself</h3>
              <p>
                Cadence drafts IDEA §300.320(a)(3)-compliant progress
                narratives from your banked observations. Export to Word
                in one click, ready for the IEP meeting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="impact-section">
        <div className="impact-section__body">
          <div style={{ marginBottom: 48 }}>
            <p className="section-label">By the numbers</p>
            <h2 className="section-title" style={{ marginTop: 12, maxWidth: 560 }}>
              Built for the pace of a school-based caseload.
            </h2>
          </div>
          <div className="stats-grid">
            {stats.map(([value, label]) => (
              <div className="stat-card" key={label}>
                <strong className="stat-card__value">{value}</strong>
                <span className="stat-card__label">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Privacy ── */}
      <section className="security-section" id="privacy">
        <div className="security-section__body">
          <div>
            <p className="section-label">Privacy and data handling</p>
            <h2>Honest about data. Built for school-based OT pilots.</h2>
          </div>
          <div className="security-section__copy">
            <p>
              Cadence is built for school-based OT teams working in FERPA- and
              IDEA-governed settings. School-based OTs doing SHARS or LEA
              Medicaid billing work with data that crosses into HIPAA territory.
              Until a BAA is in place, Cadence instructs pilot users to use
              initials only — omit student names, DOB, and direct identifiers
              from dictation. Initials and de-identified descriptions generate
              equally strong notes.
            </p>
            <div className="security-grid">
              <span>FERPA-aware workflow</span>
              <span>IDEA §300.320 compliance flags</span>
              <span>Medicaid consent checks</span>
              <span>Use initials — no names in dictation</span>
              <span>No classroom recording</span>
              <span>No third-party data sales</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Waitlist ── */}
      <section className="waitlist light" id="waitlist">
        <div className="waitlist__inner">
          <p className="section-label">Early access</p>
          <h2 className="waitlist__title">
            Stop documenting at home. Start signing same day.
          </h2>
          <p className="waitlist__sub">
            Pilot opens Fall 2026 for a limited cohort of school-based OT teams.
          </p>
          <WaitlistForm />
          <p className="waitlist__note">No spam. Invites go out in batches by district.</p>
        </div>
      </section>

      <footer className="footer">
        <div className="footer__inner">
          <span className="footer__logo">Cadence</span>
          <div className="footer__links">
            <a href="#how-it-works">How it works</a>
            <a href="#why-cadence">Why Cadence</a>
            <a href="#privacy">Privacy</a>
            <a href="#waitlist">Pilot</a>
          </div>
          <span className="footer__copy">&copy; 2026 Cadence Health, Inc.</span>
        </div>
      </footer>
    </main>
  );
}
