import type { Metadata } from "next";
import Link from "next/link";
import { NavBar } from "@/app/components/NavBar";

export const metadata: Metadata = {
  title: "SHARS Documentation: What School OTs Need to Know | PraxisOT",
  description:
    "A practical guide to SHARS billing documentation requirements for school-based OTs — what to include in every note, common audit triggers, and how to stay compliant.",
  alternates: { canonical: "/blog/shars-documentation-school-ot" },
};

export default function SharsPost() {
  return (
    <main>
      <NavBar />
      <article className="blog-post">
        <div className="blog-post__inner">
          <header className="blog-post__header">
            <p className="section-label">Billing &amp; Compliance</p>
            <h1 className="blog-post__title">SHARS Documentation: What School OTs Need to Know</h1>
            <p className="blog-post__meta">May 2026 · 6 min read</p>
          </header>

          <div className="blog-post__body">
            <p>
              SHARS — the School Health and Related Services program — is Texas&rsquo;s Medicaid
              reimbursement mechanism for school-based therapy services. For school-based occupational
              therapists, getting reimbursed depends almost entirely on documentation quality. A
              single missing field can trigger a recoupment notice months after services are delivered.
            </p>
            <p>
              This guide covers exactly what your SHARS documentation needs to include, the most
              common audit triggers, and how to build a session note workflow that holds up under review.
            </p>

            <h2>What Is SHARS?</h2>
            <p>
              SHARS stands for School Health and Related Services. It allows Texas school districts to
              bill Medicaid for certain health-related services — including occupational therapy — that
              are written into a student&rsquo;s IEP and delivered by qualified providers. Reimbursement
              goes to the district, not the individual therapist, but the documentation burden falls
              squarely on the OT delivering the service.
            </p>
            <p>
              To qualify for SHARS reimbursement, OT services must be:
            </p>
            <ul>
              <li>Written into the student&rsquo;s IEP as a related service</li>
              <li>Medically necessary to enable the student to benefit from special education</li>
              <li>Delivered by a qualified occupational therapist or COTA under OTR supervision</li>
              <li>Documented in a compliant session note for every billable session</li>
            </ul>

            <h2>What Must Be in Every SHARS Session Note</h2>
            <p>
              Texas Medicaid auditors look for specific elements in every OT session note submitted
              for SHARS reimbursement. Missing even one of these is grounds for recoupment:
            </p>
            <ul>
              <li><strong>Date of service</strong> — the actual session date, not the documentation date</li>
              <li><strong>Start and end time</strong> — exact times, not just duration</li>
              <li><strong>Student identifier</strong> — initials or local ID, never full name in an AI-generated draft</li>
              <li><strong>Session type</strong> — pull-out, push-in, consultation, or evaluation</li>
              <li><strong>IEP goal addressed</strong> — cite the specific goal, not just a general area</li>
              <li><strong>Skilled service justification</strong> — why a licensed OT is required; not a task an aide could perform</li>
              <li><strong>Objective data</strong> — measurable observations (trials, percentages, assist levels)</li>
              <li><strong>Student response</strong> — how the student engaged with the intervention</li>
              <li><strong>Plan</strong> — what happens next session</li>
              <li><strong>OT signature and credentials</strong></li>
            </ul>

            <h2>The &ldquo;Skilled Service&rdquo; Problem</h2>
            <p>
              The single most common SHARS audit failure is a note that describes activities without
              establishing why a licensed OT was necessary to deliver them. &ldquo;Student completed
              bead stringing activity&rdquo; is not a skilled service. &ldquo;OT graded bead diameter
              and string tension to systematically challenge tripod grasp development toward IEP
              fine-motor goal while providing tactile cueing to inhibit hypersensitive grip response&rdquo;
              is a skilled service.
            </p>
            <p>
              Every SHARS note needs a sentence that explicitly justifies skilled OT involvement. This
              is what PraxisOT&rsquo;s AI generation focuses on — the skilled-service language that
              turns a session recap into a billable note.
            </p>

            <h2>SHARS vs. LEA-BOP: What&rsquo;s the Difference?</h2>
            <p>
              SHARS is Texas-specific. Other states use different Medicaid school program frameworks —
              most commonly LEA-BOP (Local Education Agency Billing Option Program). The documentation
              requirements are similar but not identical. If you work outside Texas, see our{" "}
              <Link href="/blog/lea-bop-documentation-ot">LEA-BOP documentation guide</Link>.
            </p>

            <h2>Common Audit Triggers to Avoid</h2>
            <ul>
              <li>Notes that are copy-pasted between sessions with no session-specific data</li>
              <li>Missing start/end times or times that don&rsquo;t match billing units</li>
              <li>Goal language that doesn&rsquo;t match the student&rsquo;s current IEP</li>
              <li>No objective data — narratives without numbers</li>
              <li>Signing notes more than 7 days after service delivery</li>
              <li>COTA notes without documented OTR supervision</li>
            </ul>

            <h2>Building a SHARS-Compliant Workflow</h2>
            <p>
              The most sustainable SHARS documentation workflow is one you complete before you leave
              the school — not at home that evening. A 60-second voice recap immediately after the
              session, while the details are fresh, captures more accurate data than a reconstruction
              hours later.
            </p>
            <p>
              PraxisOT is built around this workflow: speak your post-session recap using initials and
              objective data, and the AI generates a SHARS-compliant note with skilled-service language,
              goal references, and a service log pre-filled with the fields Texas Medicaid auditors look
              for. Copy and paste into your district&rsquo;s system before you move to your next student.
            </p>

            <h2>Quick SHARS Documentation Checklist</h2>
            <ul>
              <li>☐ Date, start time, end time</li>
              <li>☐ Student identifier (initials or local ID)</li>
              <li>☐ Session type (pull-out / push-in / consult)</li>
              <li>☐ Specific IEP goal addressed</li>
              <li>☐ Skilled service justification sentence</li>
              <li>☐ Objective data (trials, percentages, assist level)</li>
              <li>☐ Student response / engagement</li>
              <li>☐ Plan for next session</li>
              <li>☐ OT/COTA signature + credentials</li>
              <li>☐ OTR co-signature if COTA-delivered</li>
            </ul>
          </div>

          <div className="blog-post__cta">
            <p>Generate SHARS-compliant notes from a 60-second voice recap.</p>
            <Link href="/#waitlist" className="btn-primary">Get early access →</Link>
          </div>

          <div className="blog-post__related">
            <p className="section-label">Related</p>
            <div className="blog-post__related-links">
              <Link href="/blog/how-to-write-school-ot-soap-note">How to Write a School OT SOAP Note</Link>
              <Link href="/blog/lea-bop-documentation-ot">LEA-BOP Billing: OT Documentation Checklist</Link>
              <Link href="/faq">School OT Documentation FAQ</Link>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
