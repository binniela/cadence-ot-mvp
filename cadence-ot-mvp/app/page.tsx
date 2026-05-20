import { NavBar } from "./components/NavBar";
import { WaitlistForm } from "./components/WaitlistForm";

const useCases = [
  "Quarterly Progress Reports",
  "IEP Goal Evidence",
  "Medicaid Service Logs",
  "Service-Minute Tracking",
  "Compliance Review",
  "Word Export",
  "District Reporting",
];

const metrics = [
  ["Median note review target", "3 min"],
  ["Accepted goal updates target", "70%+"],
  ["Student caseload supported", "50+"],
  ["Quarterly due-risk window", "5 days"],
  ["Goals tied to source evidence", "100%"],
];

export default function Home() {
  return (
    <main>
      <NavBar />

      <section className="hero">
        <div className="hero__backdrop">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/hero.png" alt="" className="hero__bg-img" aria-hidden="true" />
        </div>
        <div className="hero__overlay" />
        <div className="hero__inner">
          <p className="hero__label">School-based OT documentation</p>
          <h1 className="hero__headline">Quarterly reports, made defensible.</h1>
          <p className="hero__sub">
            Cadence turns session notes into goal-linked progress narratives,
            service-minute risk signals, and Medicaid-ready documentation for
            district OT teams.
          </p>
          <div className="hero__actions">
            <a href="#waitlist" className="btn-primary">Request pilot access</a>
            <a href="#platform" className="btn-ghost">Explore platform</a>
          </div>
          <div className="hero__proofs" aria-label="Cadence focus areas">
            <span>IEP goals</span>
            <span>Service minutes</span>
            <span>Medicaid logs</span>
          </div>
        </div>
      </section>

      <section className="platform light" id="platform">
        <div className="platform__body">
          <div className="platform__copy">
            <p className="section-label">The platform</p>
            <h2 className="section-title platform__title">
              Cadence is AI designed for school-based occupational therapy teams.
            </h2>
            <p className="platform__desc">
              Advance clinical documentation on a secure pilot platform built
              for IEP goals, service minutes, Medicaid logs, quarterly progress
              reports, and the review habits districts already require.
            </p>
            <div className="platform__checks">
              <span>Evidence-linked narratives</span>
              <span>Goal-by-goal review</span>
              <span>Word export for IEP systems</span>
            </div>
          </div>

          <div className="product-shell" aria-label="Cadence product preview">
            <div className="product-shell__bar">
              <span />
              <span />
              <span />
              <div>cadence.app/quarterly</div>
            </div>
            <div className="product-shell__surface">
              <aside className="product-shell__rail">
                <strong>Cadence</strong>
                <span className="product-shell__rail-active">Quarterly</span>
                <span>Composer</span>
                <span>Caseload</span>
              </aside>
              <div className="product-shell__main">
                <div className="product-shell__header">
                  <div>
                    <p>Quarterly progress report</p>
                    <h3>Liam Carter</h3>
                  </div>
                  <span>Due in 5 days</span>
                </div>
                <div className="evidence-row">
                  <span>Fine-motor manipulation</span>
                  <strong>8/10</strong>
                </div>
                <div className="evidence-row">
                  <span>Seated tabletop tolerance</span>
                  <strong>3.5 min</strong>
                </div>
                <div className="draft-panel">
                  <p>
                    Liam progressed from a baseline of 2/10 beads to 8/10 in
                    structured tasks. Skilled OT intervention should continue
                    with adapted fine-motor sequencing and sensory supports.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="use-cases light">
        <div className="use-cases__body">
          <p className="use-cases__kicker">The top school-based OT teams use Cadence for</p>
          <div className="use-cases__list">
            {useCases.map((item, index) => (
              <span key={item} className={index === 0 ? "use-cases__item use-cases__item--active" : "use-cases__item"}>
                {item}
              </span>
            ))}
          </div>
          <a href="/app" className="outline-btn">Explore platform</a>
        </div>
      </section>

      <section className="evidence-section light" id="evidence">
        <div className="evidence-section__body">
          <div>
            <p className="section-label">Product evidence</p>
            <h2 className="section-title evidence-section__title">
              Every quarterly paragraph traces back to session-level evidence.
            </h2>
          </div>
          <div className="evidence-flow">
            <div className="evidence-step">
              <span>01</span>
              <h3>Dictation</h3>
              <p>OTs capture a short recap after pull-out, push-in, group, or consult sessions.</p>
            </div>
            <div className="evidence-step">
              <span>02</span>
              <h3>Banked evidence</h3>
              <p>Cadence maps observed performance and data points to active IEP goals.</p>
            </div>
            <div className="evidence-step">
              <span>03</span>
              <h3>Defensible report</h3>
              <p>Quarterly narratives cite baseline, current data, status, and next recommendation.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="impact-section">
        <div className="impact-section__body">
          <div className="impact-section__intro">
            <p className="section-label">Pilot targets</p>
            <h2>Helping OT teams stay focused and see measurable results.</h2>
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

      <section className="security-section" id="security">
        <div className="security-section__body">
          <div>
            <p className="section-label">Security and compliance</p>
            <h2>Built for district review before it is built for scale.</h2>
          </div>
          <div className="security-section__copy">
            <p>
              Cadence is scoped for school-based OT pilots where education
              records, service obligations, and procurement requirements all
              matter. The product posture is intentionally conservative:
              therapist-only notes, source-linked outputs, and no classroom
              recording workflow.
            </p>
            <div className="security-grid">
              <span>FERPA-aware workflow</span>
              <span>IDEA progress reporting</span>
              <span>Medicaid consent checks</span>
              <span>NDPA-ready posture</span>
              <span>Audit trail roadmap</span>
              <span>District IT language</span>
            </div>
          </div>
        </div>
      </section>

      <section className="waitlist light" id="waitlist">
        <div className="waitlist__inner">
          <p className="section-label">Early access</p>
          <h2 className="waitlist__title">Unlock defensible OT documentation for your district.</h2>
          <p className="waitlist__sub">
            Pilot opens Fall 2026 for a limited group of school-based OT teams.
          </p>
          <WaitlistForm />
          <p className="waitlist__note">No spam. Invites go out in batches by district.</p>
        </div>
      </section>

      <footer className="footer">
        <div className="footer__inner">
          <span className="footer__logo">Cadence</span>
          <div className="footer__links">
            <a href="#platform">Platform</a>
            <a href="#evidence">Evidence</a>
            <a href="#security">Security</a>
            <a href="#waitlist">Pilot</a>
          </div>
          <span className="footer__copy">&copy; 2026 Cadence Health, Inc.</span>
        </div>
      </footer>
    </main>
  );
}
