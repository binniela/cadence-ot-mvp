import { NavBar } from "./components/NavBar";
import { WaitlistForm } from "./components/WaitlistForm";

export default function Home() {
  return (
    <main>
      <NavBar />

      {/* ── Hero — full bleed ── */}
      <section className="hero">
        <div className="hero__backdrop">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/hero.png" alt="" className="hero__bg-img" aria-hidden="true" />
        </div>
        <div className="hero__overlay" />
        <div className="hero__inner">
          <p className="hero__label">School-Based OT · FERPA-Ready</p>
          <h1 className="hero__headline">
            The quarterly<br />report engine.
          </h1>
          <p className="hero__sub">
            For school-based OTs. Cadence turns 9 weeks of session notes
            into IDEA-compliant progress reports on every IEP goal —
            in an afternoon, not a week.
          </p>
          <div className="hero__actions">
            <a href="#waitlist" className="btn-primary">Request pilot access</a>
            <a href="#product" className="btn-ghost">See the product →</a>
          </div>
        </div>
      </section>

      {/* ── Trust bar — light ── */}
      <div className="light">
        <div className="logobar">
          <span className="logobar__label">Built with school-based OTs and contract therapy companies</span>
          <div className="logobar__items">
            <span className="logobar__item">ProCare Therapy</span>
            <span className="logobar__item">Sunbelt Staffing</span>
            <span className="logobar__item">Soliant Health</span>
            <span className="logobar__item">EBS Healthcare</span>
            <span className="logobar__item">eLuma</span>
          </div>
        </div>
      </div>

      {/* ── Product showcase — dark ── */}
      <section className="showcase" id="product">
        <div className="showcase__body">
          <div className="showcase__text">
            <p className="showcase__eyebrow">The platform</p>
            <h2 className="showcase__title">
              Every student.<br />Every goal.<br />One afternoon.
            </h2>
            <div className="showcase__points">
              <div className="showcase__point">
                <span className="showcase__dot" />
                <p className="showcase__point-text">
                  <strong>Caseload dashboard</strong> — see all students by school,
                  IEP minutes burned, and at-risk flags before they become due-process issues.
                </p>
              </div>
              <div className="showcase__point">
                <span className="showcase__dot" />
                <p className="showcase__point-text">
                  <strong>60-second session composer</strong> — dictate a recap,
                  Gemini extracts goal-aligned bullets automatically.
                </p>
              </div>
              <div className="showcase__point">
                <span className="showcase__dot" />
                <p className="showcase__point-text">
                  <strong>One-click quarterly export</strong> — IDEA §300.320(a)(3)
                  paragraphs for every goal, exported to Word in seconds.
                </p>
              </div>
            </div>
            <a href="/app" className="btn-primary">Open the app →</a>
          </div>

          {/* ── Inline product frame mock ── */}
          <div className="showcase__frame-wrap">
            <div className="showcase__frame">
              <div className="showcase__frame-bar">
                <span className="showcase__frame-dot" />
                <span className="showcase__frame-dot" />
                <span className="showcase__frame-dot" />
                <span className="showcase__frame-url" />
              </div>
              <div className="showcase__frame-content">
                <div className="showcase__frame-sidebar">
                  <div className="showcase__frame-sidebar-logo">Cadence</div>
                  <div className="showcase__frame-nav-item showcase__frame-nav-item--active">Caseload</div>
                  <div className="showcase__frame-nav-item">Composer</div>
                  <div className="showcase__frame-nav-item">Quarterly</div>
                </div>
                <div className="showcase__frame-main">
                  <div className="showcase__frame-heading">Caseload</div>
                  <div className="showcase__frame-sub">4 students · 3 schools · 2 at-risk · Due in 5 days</div>

                  <div className="showcase__frame-card">
                    <div className="showcase__frame-card-row">
                      <span className="showcase__frame-name">Aiden Park · Gr. 3</span>
                      <span className="showcase__frame-badge showcase__frame-badge--red">At risk</span>
                    </div>
                    <div className="showcase__frame-bar-fill">
                      <div className="showcase__frame-bar-fill-inner showcase__frame-bar-fill-inner--risk" style={{ width: "67%" }} />
                    </div>
                  </div>

                  <div className="showcase__frame-card">
                    <div className="showcase__frame-card-row">
                      <span className="showcase__frame-name">Sofia Mendez · Gr. 2</span>
                      <span className="showcase__frame-badge showcase__frame-badge--green">On track</span>
                    </div>
                    <div className="showcase__frame-bar-fill">
                      <div className="showcase__frame-bar-fill-inner" style={{ width: "100%" }} />
                    </div>
                  </div>

                  <div className="showcase__frame-card">
                    <div className="showcase__frame-card-row">
                      <span className="showcase__frame-name">Liam Carter · Gr. K</span>
                      <span className="showcase__frame-badge showcase__frame-badge--green">On track</span>
                    </div>
                    <div className="showcase__frame-bar-fill">
                      <div className="showcase__frame-bar-fill-inner" style={{ width: "81%" }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features — light, full-width ── */}
      <section className="features light" id="features">
        <div className="features__body">
          <p className="section-label">What Cadence does</p>
          <h2 className="section-title">Documentation that survives the quarterly cliff.</h2>
          <div className="features__grid">
            <div className="feature-card">
              <p className="feature-card__num">01</p>
              <h3 className="feature-card__title">Quarterly progress reports</h3>
              <p className="feature-card__desc">
                Every session note banks a goal-anchored bullet. At week 9,
                Cadence drafts an IDEA §300.320(a)(3)-compliant paragraph
                for every IEP goal — baseline, current data, on-track tag.
              </p>
            </div>
            <div className="feature-card">
              <p className="feature-card__num">02</p>
              <h3 className="feature-card__title">IEP service-minute tracking</h3>
              <p className="feature-card__desc">
                Real-time burndown against prescribed minutes per quarter.
                Flags compensatory-services risk before under-delivery turns
                into a due-process complaint.
              </p>
            </div>
            <div className="feature-card">
              <p className="feature-card__num">03</p>
              <h3 className="feature-card__title">State Medicaid logs</h3>
              <p className="feature-card__desc">
                TX SHARS and CA LEA BOP service logs with required fields
                enforced — start/stop times, performing-provider signature,
                7-day creation rule, parental consent verification.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works — dark ── */}
      <section className="hiw" id="how">
        <div className="hiw__inner">
          <p className="section-label">The workflow</p>
          <h2 className="section-title">
            From 60-second dictation<br />to defensible quarterly reports.
          </h2>
          <div className="hiw__steps">
            <div className="hiw__step">
              <p className="hiw__step-num">Step 01</p>
              <h3 className="hiw__step-title">Dictate</h3>
              <p className="hiw__step-desc">
                After each session — in your car, in your shared office —
                speak or type a one-minute recap. Push-in, pull-out, group,
                or consult. Therapist-only audio, never the classroom.
              </p>
            </div>
            <div className="hiw__step">
              <p className="hiw__step-num">Step 02</p>
              <h3 className="hiw__step-title">Bank</h3>
              <p className="hiw__step-desc">
                Cadence extracts a goal-aligned bullet for each active IEP
                goal touched in the session — baseline reference, measured
                response, next-step indicator. Banked toward the quarterly.
              </p>
            </div>
            <div className="hiw__step">
              <p className="hiw__step-num">Step 03</p>
              <h3 className="hiw__step-title">Generate</h3>
              <p className="hiw__step-desc">
                At week 9, one click drafts every progress narrative for
                every student. Export to Word or paste into Frontline,
                PowerSchool, SEAS, or Embrace.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Quote — dark ── */}
      <section className="quote">
        <div className="quote__inner">
          <p className="quote__mark">&ldquo;</p>
          <p className="quote__text">
            Quarterly week used to be my whole life — 50 students, one week,
            every goal. Cadence gave me my Sundays back.
          </p>
          <p className="quote__attr">School-based OT · 47-student caseload, 4 buildings</p>
        </div>
      </section>

      {/* ── Privacy — light, full-width ── */}
      <section className="light" id="privacy" style={{ width: "100%" }}>
        <div className="hiw">
          <div className="hiw__inner">
            <p className="section-label">Privacy & procurement</p>
            <h2 className="section-title">
              FERPA-aligned. NDPA-signed.<br />Built for district IT.
            </h2>
            <div className="hiw__steps">
              <div className="hiw__step">
                <p className="hiw__step-num">FERPA + IDEA</p>
                <h3 className="hiw__step-title">Education records, not PHI</h3>
                <p className="hiw__step-desc">
                  Student records are governed by FERPA and IDEA, not HIPAA.
                  Cadence is built around that distinction — consumer AI
                  scribes are not.
                </p>
              </div>
              <div className="hiw__step">
                <p className="hiw__step-num">SDPC NDPA v2.2</p>
                <h3 className="hiw__step-title">Pre-signed in 6 states</h3>
                <p className="hiw__step-desc">
                  Standard Data Privacy Agreement signed in CA, NY, IL, TX,
                  MA, FL alliances. State exhibits ready before your
                  procurement officer asks.
                </p>
              </div>
              <div className="hiw__step">
                <p className="hiw__step-num">No classroom capture</p>
                <h3 className="hiw__step-title">Therapist-only dictation</h3>
                <p className="hiw__step-desc">
                  We never record students. No two-party-consent exposure,
                  no non-caseload-minor problem. Audio deleted immediately
                  after transcription on our infrastructure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Waitlist — light, full-width ── */}
      <section className="waitlist light" id="waitlist" style={{ width: "100%" }}>
        <div className="waitlist__inner">
          <p className="section-label">Early access</p>
          <h2 className="waitlist__title">Join the waitlist.</h2>
          <p className="waitlist__sub">
            Pilot opens Fall 2026. Limited to 50 therapists across 5 districts.
          </p>
          <WaitlistForm />
          <p className="waitlist__note">No spam. Invites go out in batches by district.</p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer">
        <div className="footer__inner">
          <span className="footer__logo">Cadence</span>
          <div className="footer__links">
            <a href="#">Privacy</a>
            <a href="#">FERPA</a>
            <a href="#">NDPA</a>
            <a href="#">Security</a>
            <a href="#">Contact</a>
          </div>
          <span className="footer__copy">&copy; 2026 Cadence Health, Inc.</span>
        </div>
      </footer>
    </main>
  );
}
