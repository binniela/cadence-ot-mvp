import { NavBar } from "./components/NavBar";
import { WaitlistForm } from "./components/WaitlistForm";

const stats = [
  ["<60s", "From dictation to copy-ready note"],
  ["4", "Note formats: SOAP, DAP, Goal-bullets, Narrative"],
  ["0", "Student IDs, names, or MRNs required"],
  ["Any EMR", "Paste into Fusion, My School Therapy, or your district system"],
  ["1-click", "Quarterly progress reports exported to Word"],
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
          <p className="hero__label">School-based OT documentation · Voice-first</p>
          <h1 className="hero__headline">Document from the car,<br />not after bedtime.</h1>
          <p className="hero__sub">
            Speak for 60 seconds after any session. Get a SOAP, DAP,
            Goal-bullets, or Narrative note — copy-ready before you leave campus.
          </p>
          <div className="hero__actions">
            <a href="#waitlist" className="btn-primary">Get early access</a>
            <a href="/app" className="btn-ghost">Try the demo →</a>
          </div>
          <div className="hero__proofs" aria-label="PraxisOT focus areas">
            <span>Voice-first</span>
            <span>Any phone</span>
            <span>De-identified by design</span>
          </div>
        </div>
      </section>

      {/* ── Who it's for ── */}
      <section className="for-ots" id="for-ots">
        <div className="for-ots__body">
          <div className="for-ots__intro">
            <p className="section-label">Who it&apos;s for</p>
            <h2 className="for-ots__title">
              Built for the school-based OT.
            </h2>
            <p className="for-ots__desc">
              Caseloads of 20–35 students. Multiple campuses. SHARS or LEA-BOP
              billing. And somehow, quarterly progress reports still need to be written.
            </p>
            <a href="#waitlist" className="btn-ghost" style={{ display: "inline-block", marginTop: 28 }}>
              Get early access →
            </a>
          </div>
          <div className="for-ots__points">
            <div className="for-ots__point">
              <strong>You document after hours.</strong>
              <p>
                Notes that should take 4 minutes take 40 because you&apos;re
                reconstructing sessions from memory at 9 pm.
              </p>
            </div>
            <div className="for-ots__point">
              <strong>Your EMR has no field mode.</strong>
              <p>
                District systems are built for a desk. You&apos;re in a
                parking lot, a hallway, between pull-outs.
              </p>
            </div>
            <div className="for-ots__point">
              <strong>Quarterly reports are a weekend project.</strong>
              <p>
                Pulling together 12 weeks of session evidence manually, per
                goal, per student — it shouldn&apos;t take this long.
              </p>
            </div>
            <div className="for-ots__point">
              <strong>Compliance language is a moving target.</strong>
              <p>
                IDEA §300.320, skilled-service documentation, Medicaid audit
                trails — the requirements keep growing.
              </p>
            </div>
            <div className="for-ots__point">
              <strong>SHARS and LEA-BOP fields pre-filled.</strong>
              <p>
                Service log fields required for Medicaid billing — date,
                session type, duration, eligibility, minutes delivered — are
                generated alongside every note.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works — 3 steps ── */}
      <section className="evidence-section light" id="how-it-works">
        <div className="evidence-section__body">
          <div>
            <p className="section-label">How it works</p>
            <h2 className="section-title evidence-section__title">
              Three steps to a copy-ready school OT session note.
            </h2>
          </div>
          <div className="evidence-flow">
            <div className="evidence-step">
              <span>01</span>
              <h3>Tap the mic</h3>
              <p>
                Between pull-outs. In the hallway. In your car. Open PraxisOT
                on your phone and speak naturally about what happened. Use
                initials or a local label — keep names, DOB, and IDs out of
                the recap.
              </p>
            </div>
            <div className="evidence-step">
              <span>02</span>
              <h3>Get a note worth signing</h3>
              <p>
                PraxisOT generates SOAP, DAP, Goal-bullets, or Narrative —
                your choice. The composer checks for obvious identifiers
                before AI runs, adds skilled-service language, and flags
                documentation gaps before you copy.
              </p>
            </div>
            <div className="evidence-step">
              <span>03</span>
              <h3>Paste it anywhere</h3>
              <p>
                One tap copies the note to your clipboard. Paste it into
                Fusion, My School Therapy, SimplePractice, or your
                district&apos;s system. PraxisOT is a draft layer, not the
                system of record.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Product demo ── */}
      <section className="platform" id="demo">
        <div className="platform__body">
          <div className="platform__copy">
            <p className="section-label">The demo</p>
            <h2 className="section-title platform__title">
              Dictate your session recap. Get a SOAP or Goal-bullets note in under two minutes.
            </h2>
            <p className="platform__desc">
              Quick start takes initials and a 60-second recap — no student
              profile, DOB, school name, or ID required to get a usable note.
              Build a caseload later if you want saved notes to feed quarterly
              reports.
            </p>
            <div className="platform__checks">
              <span>No names, DOB, student IDs, or MRNs required</span>
              <span>Identifier check before AI generation</span>
              <span>Copy-ready before you leave campus</span>
            </div>
          </div>

          <div className="product-shell" aria-label="PraxisOT composer preview">
            <div className="product-shell__bar">
              <span />
              <span />
              <span />
              <div>praxisot.app/app</div>
            </div>
            <div className="product-shell__surface">
              <aside className="product-shell__rail">
                <strong>PraxisOT</strong>
                <span className="product-shell__rail-active">Demo</span>
                <span>Students</span>
                <span>Quarterly</span>
              </aside>
              <div className="product-shell__main">
                <div className="product-shell__header">
                  <div>
                    <p>Quick start</p>
                    <h3>L.C.</h3>
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
      <section className="caseload-section" id="why-praxisot">
        <div className="caseload-section__body">
          <div>
            <p className="section-label">No new system to learn</p>
            <h2 className="caseload-section__title">
              Works alongside Fusion, My School Therapy, and SimplePractice.
            </h2>
          </div>
          <div className="caseload-section__copy">
            <p>
              School OTs are already managing two systems — the IEP platform
              and the billing EMR. The last thing you need is a third.
              PraxisOT generates the draft content from a de-identified recap.
              You review it, edit it, and paste it wherever your district requires.
            </p>
            <div className="caseload-points">
              <div className="caseload-point">
                <span>01</span>
                <div>
                  <strong>No IT approval needed to start.</strong>
                  <p>
                    Open in Safari, add to your home screen, start using it
                    today. For demos, use de-identified recaps only. Real
                    student data belongs in a district-approved pilot with the
                    right privacy agreements.
                  </p>
                </div>
              </div>
              <div className="caseload-point">
                <span>02</span>
                <div>
                  <strong>Works on the phone you already carry.</strong>
                  <p>
                    PraxisOT is built mobile-first. The mic button works
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
                    Generated drafts include skilled-service language and
                    review flags. PraxisOT supports FERPA-conscious workflows;
                    it does not replace therapist review or district policy.
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
              Every session banks toward the IDEA §300.320 quarterly progress report.
            </h2>
          </div>
          <div className="evidence-flow">
            <div className="evidence-step">
              <span>01</span>
              <h3>Link your IEP goals</h3>
              <p>
                Add a student&apos;s active goals once. PraxisOT maps every
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
                PraxisOT drafts IDEA §300.320(a)(3)-compliant progress
                narratives from evidence saved with your daily notes. Export
                to Word in one click, ready for the IEP meeting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="faq-section" id="faq">
        <div className="faq-section__body">
          <div className="faq-section__intro">
            <p className="section-label">Common questions</p>
            <h2 className="section-title faq-section__title">
              School OT documentation, answered.
            </h2>
          </div>
          <dl className="faq-list">
            <div className="faq-item">
              <dt className="faq-q">What documentation do I need for SHARS billing as a school OT?</dt>
              <dd className="faq-a">Each SHARS session requires a skilled-service note with date, session type, duration, student eligibility, and evidence of a skilled OT service. PraxisOT generates the note and pre-fills a service log with all required fields.</dd>
            </div>
            <div className="faq-item">
              <dt className="faq-q">What are the IDEA §300.320 requirements for quarterly OT progress reports?</dt>
              <dd className="faq-a">IDEA requires written progress reports at least as often as parents receive grade reports. Each report must describe the student&apos;s progress toward each IEP annual goal. PraxisOT drafts per-goal narratives from the session evidence you save with daily notes.</dd>
            </div>
            <div className="faq-item">
              <dt className="faq-q">What should a school-based OT SOAP note include?</dt>
              <dd className="faq-a">A school OT SOAP note needs: Subjective (student presentation, reported concerns), Objective (measurable observations, trial data), Assessment (progress toward IEP goals, skilled-service rationale), and Plan (next session focus). PraxisOT generates all four sections from a 60-second post-session dictation.</dd>
            </div>
            <div className="faq-item">
              <dt className="faq-q">Can I use AI to generate school OT session notes?</dt>
              <dd className="faq-a">Yes — with de-identified input. PraxisOT checks your recap for direct identifiers (names, DOB, student IDs) before sending anything to the AI. Use initials or a local label; keep clinical observations in; leave identifying details out.</dd>
            </div>
            <div className="faq-item">
              <dt className="faq-q">How do I write an IEP progress note for occupational therapy?</dt>
              <dd className="faq-a">Link each student&apos;s active IEP goals in PraxisOT. After each session, save a note that addresses those goals. PraxisOT tags measurable observations per goal. When the quarterly window opens, it drafts an IDEA-compliant progress paragraph from that accumulated evidence.</dd>
            </div>
            <div className="faq-item">
              <dt className="faq-q">Does PraxisOT work with Fusion, My School Therapy, or SimplePractice?</dt>
              <dd className="faq-a">PraxisOT is a draft layer, not a replacement. It generates a copy-ready note that you paste into whatever system your district uses — Fusion, My School Therapy, SimplePractice, or a custom district EMR. No IT approval or integration required.</dd>
            </div>
            <div className="faq-item">
              <dt className="faq-q">What is the difference between a SOAP note and a DAP note for OT?</dt>
              <dd className="faq-a">A SOAP note separates Subjective, Objective, Assessment, and Plan into four sections. A DAP note uses Data, Assessment, Plan — combining subjective and objective into &ldquo;Data.&rdquo; School districts often have a preferred format; PraxisOT generates either from the same dictation.</dd>
            </div>
            <div className="faq-item">
              <dt className="faq-q">How do school OTs document for LEA-BOP Medicaid billing?</dt>
              <dd className="faq-a">LEA-BOP (Local Education Agency Billing Option Program) requires documentation of skilled service necessity, student eligibility, and session details. PraxisOT generates notes with skilled-service language and a service log that includes the fields most state LEA-BOP programs require for audit trails.</dd>
            </div>
          </dl>
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
              PraxisOT is designed for de-identified, local-first OT
              documentation support. It does not require student names, DOB,
              student IDs, MRNs, addresses, parent names, or school-specific
              identifiers to generate copy-ready notes. AI generation may send
              the de-identified recap to a third-party model provider — demo
              users should not enter direct identifiers or rare details that
              could point back to one student.
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

      {/* ── Waitlist ── */}
      <section className="waitlist light" id="waitlist">
        <div className="waitlist__inner">
          <p className="section-label">Early access</p>
          <h2 className="waitlist__title">
            Stop documenting at home.<br />Start signing same day.
          </h2>
          <p className="waitlist__sub">
            Opening Fall 2026. Drop your email and we&rsquo;ll reach out
            when a spot opens — no spam, ever.
          </p>
          <WaitlistForm />
        </div>
      </section>

      <footer className="footer">
        <div className="footer__inner">
          <span className="footer__logo">PraxisOT</span>
          <div className="footer__links">
            <a href="#how-it-works">How it works</a>
            <a href="#why-praxisot">Why PraxisOT</a>
            <a href="#faq">FAQ</a>
            <a href="#privacy">Privacy</a>
            <a href="#waitlist">Early Access</a>
          </div>
          <span className="footer__copy">&copy; 2026 PraxisOT, Inc.</span>
        </div>
      </footer>
    </main>
  );
}
