import { NavBar } from "./components/NavBar";
import { WaitlistForm } from "./components/WaitlistForm";

const metrics = [
  ["Time to sign daily note", "<5 min"],
  ["Same-day signing rate target", "90%+"],
  ["Student caseload supported", "50+"],
  ["Goals tied to source evidence", "100%"],
  ["Quarterly due-risk window", "5 days"],
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
          <p className="hero__label">School-based OT documentation</p>
          <h1 className="hero__headline">Sign your session notes the same day you see the kid.</h1>
          <p className="hero__sub">
            Cadence turns a 60-second post-session recap into a goal-anchored,
            compliance-checked note. Stop staying late. Start signing same day.
          </p>
          <div className="hero__actions">
            <a href="#waitlist" className="btn-primary">Request pilot access</a>
            <a href="/app?view=composer" className="btn-ghost">Try the composer →</a>
          </div>
          <div className="hero__proofs" aria-label="Cadence focus areas">
            <span>Session notes</span>
            <span>IEP goals</span>
            <span>Medicaid logs</span>
          </div>
        </div>
      </section>

      {/* ── Daily workflow ── */}
      <section className="platform light" id="daily-notes">
        {/* Alias for any existing #platform links */}
        <span id="platform" aria-hidden="true" style={{ position: "absolute" }} />
        <div className="platform__body">
          <div className="platform__copy">
            <p className="section-label">The daily workflow</p>
            <h2 className="section-title platform__title">
              Cadence is the note copilot for school-based OT teams.
            </h2>
            <p className="platform__desc">
              Post a 60-second recap after each pull-out, push-in, or group
              session. Cadence returns a goal-linked note in your preferred
              format with compliance flags and a Medicaid service log —
              ready to paste into your district&apos;s EMR.
            </p>
            <div className="platform__checks">
              <span>SOAP, DAP, Goal-bullets, or Narrative</span>
              <span>Compliance linting on every note</span>
              <span>Evidence banked toward quarterly reports automatically</span>
            </div>
          </div>

          <div className="product-shell" aria-label="Cadence composer preview">
            <div className="product-shell__bar">
              <span />
              <span />
              <span />
              <div>cadence.app/composer</div>
            </div>
            <div className="product-shell__surface">
              <aside className="product-shell__rail">
                <strong>Cadence</strong>
                <span className="product-shell__rail-active">Composer</span>
                <span>Caseload</span>
                <span>Quarterly</span>
              </aside>
              <div className="product-shell__main">
                <div className="product-shell__header">
                  <div>
                    <p>Post-session dictation</p>
                    <h3>Liam Carter</h3>
                  </div>
                  <span>Pull-out · 30 min</span>
                </div>
                <div className="composer-input-preview">
                  <p className="composer-input-text">
                    Started 9:32. Bead stringing, 8 of 10 independent today.
                    Weighted lap pad — got 3.5 min seated before seeking movement…
                  </p>
                </div>
                <div className="draft-panel">
                  <span className="product-shell__eyebrow">Generated · Goal-bullets</span>
                  <p>
                    Fine-motor manipulation: Completed bead stringing independently
                    (8/10). Functional grasp improving toward criterion. Seated
                    tolerance: 3.5 min tabletop with weighted lap pad trial.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Caseload objection ── */}
      <section className="caseload-section" id="caseload">
        <div className="caseload-section__body">
          <div>
            <p className="section-label">A concern we hear often</p>
            <h2 className="caseload-section__title">
              Won&apos;t my employer just add more students?
            </h2>
          </div>
          <div className="caseload-section__copy">
            <p>
              Faster notes don&apos;t create caseload pressure — same-day signing does.
              The gain isn&apos;t throughput. It&apos;s closing the loop before you
              leave the building.
            </p>
            <div className="caseload-points">
              <div className="caseload-point">
                <span>01</span>
                <div>
                  <strong>Fewer denials, same caseload.</strong>
                  <p>
                    Documentation-related claim denials come from late, incomplete,
                    or weak skilled-language notes. Same-day signing with compliance
                    flags addressed removes the rework — not the students.
                  </p>
                </div>
              </div>
              <div className="caseload-point">
                <span>02</span>
                <div>
                  <strong>Notes that pile up create audit risk.</strong>
                  <p>
                    A Tuesday session finished on Friday introduces recall errors,
                    data inconsistencies, and billing exposure. Cadence closes the
                    loop while the session is still fresh.
                  </p>
                </div>
              </div>
              <div className="caseload-point">
                <span>03</span>
                <div>
                  <strong>The cognitive gain is the point.</strong>
                  <p>
                    Carrying three unfinished notes through pickup and dinner is the
                    burnout. Getting the note off your plate means your clinical
                    thinking stays sharp for the next kid.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="evidence-section light" id="evidence">
        <div className="evidence-section__body">
          <div>
            <p className="section-label">How it works</p>
            <h2 className="section-title evidence-section__title">
              The daily note builds the quarterly report.
            </h2>
          </div>
          <div className="evidence-flow">
            <div className="evidence-step">
              <span>01</span>
              <h3>60-second recap</h3>
              <p>
                After pull-out or push-in, type or paste what happened. No
                template. No required structure. Plain language is fine.
              </p>
            </div>
            <div className="evidence-step">
              <span>02</span>
              <h3>Goal-anchored note</h3>
              <p>
                Cadence generates a SOAP, DAP, Goal-bullets, or Narrative
                note, maps observations to active IEP goals, and flags any
                compliance gaps.
              </p>
            </div>
            <div className="evidence-step">
              <span>03</span>
              <h3>Quarterly writes itself</h3>
              <p>
                Banked observations accumulate by goal. When the report is
                due, Cadence drafts IDEA §300.320(a)(3)-compliant progress
                narratives with evidence citations — export to Word in one click.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Metrics ── */}
      <section className="impact-section">
        <div className="impact-section__body">
          <div className="impact-section__intro">
            <p className="section-label">Pilot targets</p>
            <h2>Measurable outcomes for OT teams and the students they serve.</h2>
          </div>
          <div className="metrics-list">
            {metrics.map(([label, value]) => (
              <div className="metrics-row" key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Privacy ── */}
      <section className="security-section" id="privacy">
        {/* Alias for any existing #security links */}
        <span id="security" aria-hidden="true" style={{ position: "absolute" }} />
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
              Until a BAA is in place, Cadence instructs pilot users to omit
              student names, DOB, and direct identifiers from dictation —
              initials and de-identified descriptions generate equally strong notes.
            </p>
            <div className="security-grid">
              <span>FERPA-aware workflow</span>
              <span>IDEA §300.320 compliance</span>
              <span>Medicaid consent checks</span>
              <span>Anonymize dictation (no names/DOB)</span>
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
            End the late nights. Start signing same day.
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
            <a href="#daily-notes">Platform</a>
            <a href="#evidence">How it works</a>
            <a href="#privacy">Privacy</a>
            <a href="#waitlist">Pilot</a>
          </div>
          <span className="footer__copy">&copy; 2026 Cadence Health, Inc.</span>
        </div>
      </footer>
    </main>
  );
}
