export default function Home() {
  return (
    <main>
      {/* ── Nav ── */}
      <nav className="nav">
        <div className="nav__inner">
          <span className="nav__logo">Cadence</span>
          <div className="nav__links">
            <a href="#features">Product</a>
            <a href="#how">How it works</a>
            <a href="#access">Pricing</a>
          </div>
          <a href="/app" className="nav__cta">Open app →</a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="hero">
        <p className="hero__label">Outpatient OT · Clinical AI</p>
        <h1 className="hero__headline">
          The AI for outpatient<br />occupational therapy.
        </h1>
        <p className="hero__sub">
          Cadence converts post-session dictation into goal-linked,
          payer-defensible notes in under three minutes.
          No templates. No rework.
        </p>
        <div className="hero__actions">
          <a href="#access" className="btn-primary">Request access</a>
          <a href="#how" className="btn-ghost">See how it works →</a>
        </div>
      </section>

      <hr className="divider" />

      {/* ── Trust bar ── */}
      <div className="logobar">
        <span className="logobar__label">Trusted by OT practices across the US</span>
        <div className="logobar__items">
          <span className="logobar__item">Bright Futures OT</span>
          <span className="logobar__item">Summit Rehab</span>
          <span className="logobar__item">Harbor Therapy</span>
          <span className="logobar__item">Coastal OT</span>
          <span className="logobar__item">Apex Pediatrics</span>
        </div>
      </div>

      <hr className="divider" />

      {/* ── Features ── */}
      <section className="features" id="features">
        <p className="section-label">What Cadence does</p>
        <h2 className="section-title">Documentation that defends itself.</h2>
        <div className="features__grid">
          <div className="feature-card">
            <p className="feature-card__num">01</p>
            <h3 className="feature-card__title">Goal-linked notes</h3>
            <p className="feature-card__desc">
              Every session note maps directly to active treatment goals.
              Objective evidence is cited automatically — no manual
              cross-referencing required.
            </p>
          </div>
          <div className="feature-card">
            <p className="feature-card__num">02</p>
            <h3 className="feature-card__title">Billing automation</h3>
            <p className="feature-card__desc">
              CPT codes, timed-unit math, and payer-specific rules applied
              at generation time. Cigna unit limits and Medicare's
              8-minute rule built in.
            </p>
          </div>
          <div className="feature-card">
            <p className="feature-card__num">03</p>
            <h3 className="feature-card__title">Compliance linting</h3>
            <p className="feature-card__desc">
              Real-time flags for denial risk, missing medical necessity
              language, and authorization thresholds — before you sign.
            </p>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="hiw" id="how">
        <div className="hiw__inner">
          <p className="section-label">The workflow</p>
          <h2 className="section-title">
            From session to signed note<br />in three minutes.
          </h2>
          <div className="hiw__steps">
            <div className="hiw__step">
              <p className="hiw__step-num">Step 01</p>
              <h3 className="hiw__step-title">Dictate</h3>
              <p className="hiw__step-desc">
                Record or type your post-session notes in plain language.
                No structured format required — speak the way you think.
              </p>
            </div>
            <div className="hiw__step">
              <p className="hiw__step-num">Step 02</p>
              <h3 className="hiw__step-title">Review</h3>
              <p className="hiw__step-desc">
                Cadence structures, enriches, and links evidence to active
                goals. Compliance gaps are flagged before you sign.
              </p>
            </div>
            <div className="hiw__step">
              <p className="hiw__step-num">Step 03</p>
              <h3 className="hiw__step-title">Sign</h3>
              <p className="hiw__step-desc">
                Clean, defensible documentation ready for your EHR.
                SOAP, DAP, or Narrative — your format, your workflow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Quote ── */}
      <section className="quote">
        <div className="quote__inner">
          <p className="quote__mark">&ldquo;</p>
          <p className="quote__text">
            Cadence takes the cognitive load of documentation off my plate.
            I focus on treatment — it handles the paper trail.
          </p>
          <p className="quote__attr">Sarah K., OTR/L · Outpatient Pediatrics</p>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="final-cta" id="access">
        <h2 className="final-cta__title">
          Ready to reclaim your documentation time?
        </h2>
        <div className="final-cta__actions">
          <a href="#" className="btn-primary">Request early access</a>
          <a href="#" className="btn-ghost">Talk to the team →</a>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer">
        <div className="footer__inner">
          <span className="footer__logo">Cadence</span>
          <div className="footer__links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Security</a>
            <a href="#">Contact</a>
          </div>
          <span className="footer__copy">&copy; 2025 Cadence Health, Inc.</span>
        </div>
      </footer>
    </main>
  );
}
