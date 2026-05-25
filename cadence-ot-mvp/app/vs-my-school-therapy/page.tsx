import type { Metadata } from "next";
import Link from "next/link";
import { NavBar } from "@/app/components/NavBar";

export const metadata: Metadata = {
  title: "PraxisOT vs My School Therapy — Which is Better for School OTs? | PraxisOT",
  description:
    "Comparing PraxisOT and My School Therapy for school-based OT documentation. See which tool is faster, easier, and built for how school OTs actually work.",
  alternates: { canonical: "/vs-my-school-therapy" },
};

const rows = [
  { feature: "Voice dictation → note", praxis: "✅ Core feature", mst: "❌ Not available" },
  { feature: "AI note generation", praxis: "✅ From 60-sec recap", mst: "⚠️ Template-based" },
  { feature: "School-only focus", praxis: "✅ Built exclusively for school OTs", mst: "✅ School therapy focused" },
  { feature: "SOAP, DAP, Goal-bullets, Narrative", praxis: "✅ All 4 formats", mst: "⚠️ Template-dependent" },
  { feature: "SHARS service log", praxis: "✅ Auto-generated", mst: "✅ Supported" },
  { feature: "IEP goal tracking", praxis: "✅ Per-student goal management", mst: "✅ Full IEP module" },
  { feature: "Quarterly progress reports", praxis: "✅ AI-drafted from session evidence", mst: "✅ Manual entry" },
  { feature: "No IT approval needed", praxis: "✅ Mobile app, no district integration", mst: "⚠️ District setup may be required" },
  { feature: "FERPA-conscious by design", praxis: "✅ AI never sees student identifiers", mst: "✅ HIPAA/FERPA compliant" },
  { feature: "Time to complete a note", praxis: "✅ Under 2 minutes", mst: "⚠️ 10–20 min average" },
  { feature: "Works between sessions", praxis: "✅ Mobile-first, car-friendly", mst: "⚠️ Primarily desktop" },
  { feature: "Pricing", praxis: "Early access (waitlist)", mst: "Subscription — contact for pricing" },
];

export default function VsMySchoolTherapyPage() {
  return (
    <main>
      <NavBar />
      <div className="compare-page">
        <div className="compare-page__inner">
          <header className="compare-page__header">
            <p className="section-label">Comparison</p>
            <h1 className="compare-page__title">PraxisOT vs My School Therapy</h1>
            <p className="compare-page__sub">
              Both tools are built for school-based therapists. The difference is how they approach
              documentation — templates vs. voice-first AI.
            </p>
          </header>

          <div className="compare-table-wrap">
            <table className="compare-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>PraxisOT</th>
                  <th>My School Therapy</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.feature}>
                    <td>{row.feature}</td>
                    <td className="compare-table__ours">{row.praxis}</td>
                    <td>{row.mst}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <section className="compare-page__section">
            <h2>Where My School Therapy Wins</h2>
            <p>
              My School Therapy is a full-featured school therapy platform with 10+ years in the
              market. It includes scheduling, billing, progress monitoring, and reporting — a complete
              practice management system. If your district is looking for a single platform to manage
              all therapy documentation and billing workflows, MST is a mature, proven option.
            </p>
          </section>

          <section className="compare-page__section">
            <h2>Where PraxisOT Wins</h2>
            <p>
              PraxisOT is built around a single insight: school OTs don&rsquo;t have time to sit at
              a laptop between sessions. The documentation happens in parking lots, hallways, and cars
              — or it doesn&rsquo;t happen until after bedtime.
            </p>
            <p>
              PraxisOT&rsquo;s voice-first AI approach means you speak a 60-second recap and get a
              complete, SHARS-compliant SOAP note before you move to your next student. No templates
              to fill out. No typing. The AI handles skilled-service language, goal references, and
              service log fields automatically.
            </p>
            <ul>
              <li><strong>Faster note completion</strong> — under 2 minutes vs. 10–20 with templates</li>
              <li><strong>Mobile-first</strong> — built for the phone you already have with you</li>
              <li><strong>No IT approval</strong> — no district integration, no setup, no waiting</li>
              <li><strong>FERPA-conscious by design</strong> — the AI never sees student names, DOBs, or IDs</li>
            </ul>
          </section>

          <section className="compare-page__section">
            <h2>Which Should You Choose?</h2>
            <p>
              <strong>Choose My School Therapy</strong> if your district needs a full practice
              management platform with scheduling, billing, and district-wide reporting — and has
              the IT infrastructure and onboarding time to implement it.
            </p>
            <p>
              <strong>Choose PraxisOT</strong> if your priority is documentation speed and you want
              to generate accurate, billable notes in the time between sessions — on your phone,
              without templates, without waiting for district IT approval.
            </p>
          </section>

          <div className="compare-page__cta">
            <p>Ready to document in under 2 minutes?</p>
            <Link href="/#waitlist" className="btn-primary">Get early access →</Link>
          </div>

          <div className="compare-page__related">
            <p className="section-label">Related</p>
            <div className="compare-page__related-links">
              <Link href="/vs-spry">PraxisOT vs SPRY</Link>
              <Link href="/soap-note-template">Free School OT Note Templates</Link>
              <Link href="/blog/shars-documentation-school-ot">SHARS Documentation Guide</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
