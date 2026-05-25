import type { Metadata } from "next";
import Link from "next/link";
import { NavBar } from "@/app/components/NavBar";

export const metadata: Metadata = {
  title: "PraxisOT vs SPRY — School OT Documentation Comparison | PraxisOT",
  description:
    "PraxisOT vs SPRY for occupational therapy documentation. See why school-based OTs choose PraxisOT's voice-first, school-only approach over SPRY's broad clinic platform.",
  alternates: { canonical: "/vs-spry" },
};

const rows = [
  { feature: "Voice dictation → note", praxis: "✅ Core feature", spry: "✅ Available" },
  { feature: "School-only focus", praxis: "✅ Built exclusively for school OTs", spry: "❌ Broad OT platform (outpatient, home health, school)" },
  { feature: "SOAP, DAP, Goal-bullets, Narrative", praxis: "✅ All 4 formats", spry: "✅ 50+ templates" },
  { feature: "SHARS / LEA-BOP service log", praxis: "✅ Auto-generated", spry: "⚠️ Requires configuration" },
  { feature: "IEP goal tracking", praxis: "✅ Per-student, school-specific", spry: "⚠️ Goal tracking exists; not IEP-native" },
  { feature: "IDEA quarterly progress reports", praxis: "✅ AI-drafted from session evidence", spry: "❌ Not a core feature" },
  { feature: "No IT approval / district integration", praxis: "✅ Mobile app, works independently", spry: "⚠️ EMR integration typically required" },
  { feature: "FERPA-conscious AI design", praxis: "✅ Identifier check before AI", spry: "⚠️ General HIPAA compliance" },
  { feature: "Time to complete a note", praxis: "✅ Under 2 minutes", spry: "✅ Under 10 minutes with AI scribe" },
  { feature: "Mobile-first (car-friendly)", praxis: "✅ Built for between-session use", spry: "⚠️ Mobile available; desktop-primary" },
  { feature: "Pricing", praxis: "Early access (waitlist)", spry: "Subscription — contact for pricing" },
];

export default function VsSpryPage() {
  return (
    <main>
      <NavBar />
      <div className="compare-page">
        <div className="compare-page__inner">
          <header className="compare-page__header">
            <p className="section-label">Comparison</p>
            <h1 className="compare-page__title">PraxisOT vs SPRY</h1>
            <p className="compare-page__sub">
              SPRY is a broad AI documentation platform for occupational therapists. PraxisOT is
              built exclusively for school-based OTs. Here&rsquo;s how they compare.
            </p>
          </header>

          <div className="compare-table-wrap">
            <table className="compare-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>PraxisOT</th>
                  <th>SPRY</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.feature}>
                    <td>{row.feature}</td>
                    <td className="compare-table__ours">{row.praxis}</td>
                    <td>{row.spry}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <section className="compare-page__section">
            <h2>Where SPRY Wins</h2>
            <p>
              SPRY is one of the most comprehensive AI documentation platforms in the OT space. It
              covers outpatient, home health, hospital, and school settings with 50+ specialty
              templates and an AI scribe that reduces documentation time significantly. If you work
              across multiple settings or your practice needs a unified platform, SPRY is a strong option.
            </p>
          </section>

          <section className="compare-page__section">
            <h2>Where PraxisOT Wins</h2>
            <p>
              SPRY is built for OTs broadly. PraxisOT is built specifically for school-based OTs —
              and that specificity matters.
            </p>
            <p>
              School OT documentation has requirements that outpatient documentation doesn&rsquo;t:
              IEP goal language, IDEA compliance, SHARS/LEA-BOP service logs, IDEA §300.320 quarterly
              progress report frameworks, and a FERPA-conscious workflow that never exposes student
              identifiers to AI systems.
            </p>
            <p>
              PraxisOT isn&rsquo;t a general OT tool configured for schools — it&rsquo;s built from
              the ground up for the school-based workflow:
            </p>
            <ul>
              <li><strong>IEP-native</strong> — goals are tracked per student, session data tags to specific goals, quarterly reports draft from accumulated evidence</li>
              <li><strong>SHARS and LEA-BOP ready</strong> — service log fields auto-populate; no configuration required</li>
              <li><strong>FERPA-conscious by design</strong> — identifier check runs on every dictation before anything reaches the AI</li>
              <li><strong>Between-session documentation</strong> — speak your recap in the hallway or car; note is ready before your next student</li>
            </ul>
          </section>

          <section className="compare-page__section">
            <h2>Which Should You Choose?</h2>
            <p>
              <strong>Choose SPRY</strong> if you work across multiple OT settings (outpatient +
              school, or home health + school) and want a unified platform with EMR integrations and
              a broad template library.
            </p>
            <p>
              <strong>Choose PraxisOT</strong> if you are exclusively school-based and want a tool
              that understands IEPs, IDEA, SHARS, LEA-BOP, and FERPA — without configuring a general
              platform to fit your specific compliance requirements.
            </p>
          </section>

          <div className="compare-page__cta">
            <p>Built for school OTs. Nothing else.</p>
            <Link href="/#waitlist" className="btn-primary">Get early access →</Link>
          </div>

          <div className="compare-page__related">
            <p className="section-label">Related</p>
            <div className="compare-page__related-links">
              <Link href="/vs-my-school-therapy">PraxisOT vs My School Therapy</Link>
              <Link href="/soap-note-template">Free School OT Note Templates</Link>
              <Link href="/blog/shars-documentation-school-ot">SHARS Documentation Guide</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
