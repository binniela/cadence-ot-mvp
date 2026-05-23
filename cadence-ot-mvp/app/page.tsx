import { NavBar } from "./components/NavBar";
import { WaitlistForm } from "./components/WaitlistForm";

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
          <p className="hero__label">School-based OT documentation · Voice-first</p>
          <h1 className="hero__headline">Document from the car,<br />not after bedtime.</h1>
          <p className="hero__sub">
            Speak for 60 seconds after any session. Get a copy-ready note before you leave campus.
          </p>
          <div className="hero__actions">
            <a href="#waitlist" className="btn-primary">Get early access</a>
          </div>

          {/* App preview mockup */}
          <div className="hero__app-preview">
            <div className="app-preview__bar">
              <span className="app-preview__dot" />
              <span className="app-preview__dot" />
              <span className="app-preview__dot" />
              <span className="app-preview__url">praxisot.app/app</span>
            </div>
            <div className="app-preview__body">
              <div className="app-preview__left">
                <div className="app-preview__header">
                  <div>
                    <p className="app-preview__name">M.R.</p>
                    <p className="app-preview__meta">Pull-out · 30 min · Goal-bullets</p>
                  </div>
                  <span className="app-preview__rec">⏺ Recording</span>
                </div>
                <div className="app-preview__dictation">
                  <p>&ldquo;Bead stringing — 8 of 10 today, up from 5 last week. Weighted lap pad for seated tolerance, got 3.5 min before seeking movement break…&rdquo;</p>
                </div>
                <div className="app-preview__generate">Generate note →</div>
              </div>
              <div className="app-preview__right">
                <span className="app-preview__tag">Generated · Goal-bullets</span>
                <div className="app-preview__note-body">
                  <p className="app-preview__goal">Fine Motor</p>
                  <p className="app-preview__line">• Bead stringing independently (8/10). Improved from 5/10 prior session.</p>
                  <p className="app-preview__goal">Seated Tolerance</p>
                  <p className="app-preview__line">• Maintained tabletop 3.5 min with weighted lap pad before movement break.</p>
                  <p className="app-preview__plan">Plan: Increase bead difficulty · Add bilateral task</p>
                  <p className="app-preview__flags">Flags: None ✓</p>
                </div>
                <div className="app-preview__copy-chip">Copy to clipboard ↗</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Note Preview — before / after ── */}
      <section className="note-preview" id="demo">
        <div className="note-preview__body">
          <div className="note-preview__intro">
            <p className="section-label">See it work</p>
            <h2 className="section-title note-preview__title">
              60-second recap in.<br />Copy-ready note out.
            </h2>
            <p className="note-preview__desc">
              No templates. No structured forms. Just speak — PraxisOT handles the formatting, skilled-service language, and compliance flags.
            </p>
          </div>
          <div className="note-preview__panels">
            <div className="note-preview__panel note-preview__panel--input">
              <div className="np-panel-label">
                <span className="np-rec-dot" />
                Post-session dictation · ~60 sec
              </div>
              <p className="np-dictation">
                &ldquo;Started 9:15, ended 9:45. Pulled M.R. for fine-motor and bilateral. Bead stringing — 8 of 10 today, up from 5 last week. Weighted lap pad for seated tolerance, got 3.5 min before seeking movement. Brief letter formation, B and D with moderate verbal cuing. Plan to increase difficulty next session.&rdquo;
              </p>
            </div>

            <div className="note-preview__arrow" aria-hidden="true">→</div>

            <div className="note-preview__panel note-preview__panel--output">
              <div className="np-panel-label">
                <span className="np-ai-badge">AI Generated</span>
                Goal-bullets · Pull-out · 30 min
              </div>
              <div className="np-note">
                <p className="np-goal">Fine Motor</p>
                <p className="np-bullet">• Completed bead stringing independently (8/10 trials). Improved from 5/10 prior session. Functional grasp pattern noted.</p>
                <p className="np-goal">Seated Tolerance</p>
                <p className="np-bullet">• Maintained tabletop activity 3.5 min with weighted lap pad before seeking movement break. Up from 2.5 min baseline.</p>
                <p className="np-goal">Pre-Writing</p>
                <p className="np-bullet">• Formed letters B and D with moderate verbal cuing. Skilled OT service provided to address IEP fine-motor goals.</p>
                <div className="np-footer">
                  <span>Plan: Increase bead difficulty · Add bilateral crossing-midline task</span>
                  <span>Service log: Pull-out · OT · 30 min · Skilled service documented</span>
                  <span className="np-clear">Flags: None ✓</span>
                </div>
              </div>
              <button className="np-copy-btn">Copy to clipboard ↗</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <section className="stats-strip">
        <div className="stats-strip__body">
          <div className="stats-strip__stat">
            <strong>&lt;60s</strong>
            <span>Dictation to copy-ready note</span>
          </div>
          <div className="stats-strip__div" />
          <div className="stats-strip__stat">
            <strong>4</strong>
            <span>Formats: SOAP · DAP · Goal-bullets · Narrative</span>
          </div>
          <div className="stats-strip__div" />
          <div className="stats-strip__stat">
            <strong>Any EMR</strong>
            <span>Fusion · My School Therapy · SimplePractice</span>
          </div>
        </div>
      </section>

      {/* ── How it works — visual ── */}
      <section className="how-visual" id="how-it-works">
        <div className="how-visual__body">
          <div className="how-visual__intro">
            <p className="section-label">How it works</p>
            <h2 className="section-title how-visual__title">
              Three steps to a copy-ready school OT session note.
            </h2>
          </div>
          <div className="how-visual__steps">
            <div className="how-visual__step">
              <div className="how-visual__screen how-visual__screen--mic">
                <p className="hvs-eyebrow">Post-session dictation</p>
                <div className="hvs-mic-wrap">
                  <div className="hvs-mic-btn">
                    <span className="hvs-mic-dot" />
                  </div>
                  <div className="hvs-mic-ring hvs-mic-ring--1" />
                  <div className="hvs-mic-ring hvs-mic-ring--2" />
                </div>
                <p className="hvs-hint">Recording… speak naturally</p>
              </div>
              <div className="how-visual__copy">
                <span className="how-visual__num">01</span>
                <h3>Tap the mic</h3>
                <p>In the hallway, parking lot, or car. Use initials — no student names or IDs needed.</p>
              </div>
            </div>

            <div className="how-visual__step">
              <div className="how-visual__screen how-visual__screen--note">
                <p className="hvs-eyebrow">Generated · Goal-bullets</p>
                <div className="hvs-note-lines">
                  <span className="hvs-goal-label">Fine Motor</span>
                  <span className="hvs-line" />
                  <span className="hvs-line hvs-line--short" />
                  <span className="hvs-goal-label">Seated Tolerance</span>
                  <span className="hvs-line" />
                  <span className="hvs-line hvs-line--med" />
                  <span className="hvs-flags-line">Flags: None ✓</span>
                </div>
              </div>
              <div className="how-visual__copy">
                <span className="how-visual__num">02</span>
                <h3>Get a note worth signing</h3>
                <p>SOAP, DAP, Goal-bullets, or Narrative — with skilled-service language and compliance flags built in.</p>
              </div>
            </div>

            <div className="how-visual__step">
              <div className="how-visual__screen how-visual__screen--copy">
                <p className="hvs-eyebrow">Ready to paste</p>
                <div className="hvs-copy-chip">✓ Copied to clipboard</div>
                <div className="hvs-emr-list">
                  <span>Fusion</span>
                  <span>My School Therapy</span>
                  <span>SimplePractice</span>
                </div>
              </div>
              <div className="how-visual__copy">
                <span className="how-visual__num">03</span>
                <h3>Paste it anywhere</h3>
                <p>One tap copies the note. Paste into whatever system your district uses. No IT approval needed.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bento grid ── */}
      <section className="bento-section" id="features">
        <div className="bento-section__body">
          <div className="bento-section__intro">
            <p className="section-label">Everything you need</p>
            <h2 className="section-title bento-section__title">
              Built for the school-based OT caseload.
            </h2>
          </div>
          <div className="bento-grid">
            <div className="bento-card">
              <span className="bento-card__icon">🎙</span>
              <strong className="bento-card__label">Voice dictation</strong>
              <p className="bento-card__desc">Speak naturally after any session. Works on any phone, anywhere on campus.</p>
            </div>
            <div className="bento-card">
              <span className="bento-card__icon">📋</span>
              <strong className="bento-card__label">4 note formats</strong>
              <p className="bento-card__desc">SOAP, DAP, Goal-bullets, or Narrative — your district&apos;s preferred format, every time.</p>
            </div>
            <div className="bento-card">
              <span className="bento-card__icon">🏫</span>
              <strong className="bento-card__label">SHARS &amp; LEA-BOP ready</strong>
              <p className="bento-card__desc">Medicaid billing fields pre-filled alongside every note. Audit-trail ready.</p>
            </div>
            <div className="bento-card">
              <span className="bento-card__icon">📅</span>
              <strong className="bento-card__label">Quarterly reports drafted</strong>
              <p className="bento-card__desc">Every saved session banks evidence toward IDEA §300.320 progress narratives.</p>
            </div>
            <div className="bento-card">
              <span className="bento-card__icon">🔒</span>
              <strong className="bento-card__label">Identifier check</strong>
              <p className="bento-card__desc">Names, DOB, and IDs flagged before anything reaches the AI. FERPA-conscious by design.</p>
            </div>
            <div className="bento-card">
              <span className="bento-card__icon">📤</span>
              <strong className="bento-card__label">Paste into any EMR</strong>
              <p className="bento-card__desc">Copy into Fusion, My School Therapy, SimplePractice, or your district system.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Social proof ── */}
      <section className="proof-strip">
        <div className="proof-strip__body">
          <p className="proof-strip__quote">
            &ldquo;Finally something built for how we actually work — between sessions, on a phone, under 2 minutes.&rdquo;
          </p>
          <span className="proof-strip__attr">— School-based OT, Texas</span>
        </div>
      </section>

      {/* ── Waitlist ── */}
      <section className="waitlist light" id="waitlist">
        <div className="waitlist__inner">
          <p className="section-label">Early access</p>
          <h2 className="waitlist__title">
            Stop documenting at home.<br />Start signing same day.
          </h2>
          <p className="waitlist__sub">
            Opening Fall 2026 — limited to 50 OTs in the first cohort.<br />
            Drop your email and we&rsquo;ll reach out when your spot opens.
          </p>
          <WaitlistForm />
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
              PraxisOT is designed for de-identified, local-first OT documentation support. It does not require student names, DOB, student IDs, MRNs, or school-specific identifiers. AI generation may send the de-identified recap to a third-party model provider — demo users should not enter direct identifiers.
            </p>
            <div className="security-grid">
              <span>FERPA-conscious workflow</span>
              <span>Use initials or local labels only</span>
              <span>Identifier check before AI</span>
              <span>Copy into district-approved systems</span>
              <span>No classroom recording required</span>
              <span>No compliance claim without district agreements</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer__inner">
          <span className="footer__logo">PraxisOT</span>
          <div className="footer__links">
            <a href="#how-it-works">How it works</a>
            <a href="#features">Features</a>
            <a href="/faq">FAQ</a>
            <a href="#privacy">Privacy</a>
            <a href="#waitlist">Early Access</a>
          </div>
          <span className="footer__copy">&copy; 2026 PraxisOT, Inc.</span>
        </div>
      </footer>
    </main>
  );
}
