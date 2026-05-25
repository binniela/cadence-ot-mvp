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
          <div className="demo-video-wrap">
            <video
              className="demo-video"
              src="/app-demo.mp4"
              autoPlay
              muted
              loop
              playsInline
            />
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

      {/* ── Trust / Privacy ── */}
      <section className="trust-section" id="privacy">
        <div className="trust-section__body">
          <div className="trust-section__header">
            <p className="section-label trust-section__label">Privacy &amp; compliance</p>
            <h2 className="trust-section__title">
              The AI tool you can use<br />without asking IT.
            </h2>
            <p className="trust-section__sub">
              PraxisOT was designed around one constraint from day one: no student-identifying data, ever. That&rsquo;s not a feature we added — it&rsquo;s how the whole workflow works.
            </p>
          </div>
          <div className="trust-grid">
            <div className="trust-card">
              <div className="trust-card__icon-wrap">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                  <path d="M11 2L4 5.5V10.5C4 14.6 7 18.4 11 19.5C15 18.4 18 14.6 18 10.5V5.5L11 2Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
                  <path d="M8 11L10 13L14 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="trust-card__copy">
                <strong>The AI never sees student data</strong>
                <p>Names, birth dates, and student IDs are checked and blocked before anything reaches the model. Every single generation, without exception.</p>
              </div>
            </div>
            <div className="trust-card">
              <div className="trust-card__icon-wrap">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                  <rect x="3" y="3" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.6"/>
                  <path d="M7 11H15M7 7.5H12M7 14.5H10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="trust-card__copy">
                <strong>FERPA-conscious by design</strong>
                <p>PraxisOT doesn&rsquo;t store student records. It drafts a note. You paste it into the system your district already approves. Nothing flows the other way.</p>
              </div>
            </div>
            <div className="trust-card">
              <div className="trust-card__icon-wrap">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                  <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.6"/>
                  <path d="M11 7V11.5L14 13.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="trust-card__copy">
                <strong>Your note stays on your device</strong>
                <p>The generated note lives in your browser. You copy it, you own it. PraxisOT doesn&rsquo;t retain your session content after the page closes.</p>
              </div>
            </div>
            <div className="trust-card">
              <div className="trust-card__icon-wrap">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                  <path d="M3 11H19M11 3L19 11L11 19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="trust-card__copy">
                <strong>No IT approval, no integration</strong>
                <p>Because PraxisOT never connects to your district&rsquo;s network or EMR. It&rsquo;s a standalone draft tool. There is nothing to approve or install.</p>
              </div>
            </div>
          </div>
          <p className="trust-section__footnote">
            PraxisOT is not a HIPAA-covered entity and does not claim FERPA compliance on your behalf. It is designed to support de-identified documentation workflows. Always follow your district&rsquo;s policies.
          </p>
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
