import type { Metadata } from "next";
import Link from "next/link";
import { NavBar } from "@/app/components/NavBar";

export const metadata: Metadata = {
  title: "IEP Quarterly Progress Reports for OTs: IDEA §300.320 Guide | PraxisOT",
  description:
    "Everything school-based OTs need to know about writing IDEA-compliant quarterly progress reports — what to include, reporting frequency requirements, and common mistakes.",
  alternates: { canonical: "/blog/iep-quarterly-progress-reports-ot" },
};

export default function IepProgressPost() {
  return (
    <main>
      <NavBar />
      <article className="blog-post">
        <div className="blog-post__inner">
          <header className="blog-post__header">
            <p className="section-label">IEP &amp; IDEA</p>
            <h1 className="blog-post__title">IEP Quarterly Progress Reports for OTs: IDEA §300.320 Guide</h1>
            <p className="blog-post__meta">May 2026 · 7 min read</p>
          </header>

          <div className="blog-post__body">
            <p>
              IDEA §300.320 requires that every IEP include &ldquo;a description of how the child&rsquo;s
              progress toward the annual goals will be measured and when periodic reports on the
              progress the child is making toward meeting the annual goals will be provided.&rdquo; For
              school-based OTs, this means quarterly progress reports — and the documentation burden
              of writing them falls on whoever is delivering the service.
            </p>
            <p>
              This guide covers what IDEA actually requires, what makes a progress report defensible
              at an IEP meeting, and how to write them without spending your evenings reconstructing
              months of sessions from memory.
            </p>

            <h2>What IDEA §300.320 Actually Requires</h2>
            <p>
              The statute requires three things in every IEP with measurable annual goals:
            </p>
            <ol>
              <li>A description of <strong>how progress will be measured</strong> (the measurement criteria)</li>
              <li>A description of <strong>when reports will be provided</strong> (at least as often as general education report cards)</li>
              <li>The <strong>periodic reports themselves</strong> — typically quarterly</li>
            </ol>
            <p>
              Most districts align OT progress reports with the four academic marking periods. Some
              require mid-quarter check-ins as well. Check your district&rsquo;s IEP calendar — the
              frequency is set in the IEP itself, not by federal minimums.
            </p>

            <h2>What to Include in an OT Quarterly Progress Report</h2>
            <p>
              Each progress report must address every IEP annual goal that OT is responsible for.
              For each goal, you need:
            </p>
            <ul>
              <li><strong>Current performance level</strong> — where the student is right now, in measurable terms</li>
              <li><strong>Progress toward the annual goal</strong> — how far they&rsquo;ve come since baseline</li>
              <li><strong>Whether the student is on track</strong> — will they meet the annual goal by the IEP end date?</li>
              <li><strong>Evidence basis</strong> — what data supports your report (session notes, trials, duration data)</li>
            </ul>

            <h2>The On-Track / Not On-Track Problem</h2>
            <p>
              IDEA requires you to notify parents when the student is not making sufficient progress
              to achieve the annual goal by year end — in enough time to allow for IEP revision. This
              means your quarterly report needs to include an explicit on-track determination, not just
              a narrative description of what happened in sessions.
            </p>
            <p>
              If you report &ldquo;Student is making progress&rdquo; without a clear on-track determination,
              and the student doesn&rsquo;t meet their annual goal at the IEP anniversary meeting, the
              district may have failed its IDEA obligation to notify parents in time to intervene.
            </p>

            <h2>Writing Progress Narratives That Hold Up</h2>
            <p>
              The most defensible progress reports are built from session data accumulated over the
              quarter, not written from scratch at the end of the marking period. Each session note
              you write is evidence that feeds the quarterly narrative.
            </p>
            <p>Example goal: &ldquo;Student will improve fine-motor manipulation to complete bead stringing 8/10 trials with minimal assist across 3 consecutive sessions.&rdquo;</p>
            <p>Weak progress narrative: &ldquo;Student continues to work on fine motor skills. Progress is being made.&rdquo;</p>
            <p>Strong progress narrative: &ldquo;At IEP baseline (9/2025), student completed bead stringing 3/10 trials with maximum physical assist. As of Q2 reporting period (1/2026), student completes 7/10 trials with minimal verbal cuing across 4 of the last 5 sessions. Student is <strong>on track</strong> to meet the annual goal by the IEP end date of 6/2026. OT will introduce smaller bead diameter in Q3 to maintain challenge toward goal mastery.&rdquo;</p>

            <h2>Common IEP Progress Report Mistakes for OTs</h2>
            <ul>
              <li><strong>No baseline reference</strong> — progress is meaningless without a starting point</li>
              <li><strong>Vague language</strong> — &ldquo;improving&rdquo; and &ldquo;making progress&rdquo; without data are audit red flags</li>
              <li><strong>Missing on-track statement</strong> — required; can&rsquo;t be implicit</li>
              <li><strong>Goal drift</strong> — reporting on skills not in the current IEP</li>
              <li><strong>Late reports</strong> — must go out on the district&rsquo;s IEP schedule, not whenever you finish</li>
              <li><strong>Copy-paste between quarters</strong> — if Q2 looks identical to Q1, it&rsquo;s a liability</li>
            </ul>

            <h2>How Session Notes Feed Quarterly Reports</h2>
            <p>
              The best way to make quarterly reports fast is to write session notes that accumulate
              evidence toward each goal. When every session note includes a measurable data point tied
              to a specific IEP goal, the quarterly report writes itself — you&rsquo;re just summarizing
              a trend line that already exists in your documentation.
            </p>
            <p>
              PraxisOT tracks IEP goals per student and tags session data to the relevant goals. When
              a quarterly reporting window opens, the system drafts progress narratives from the
              accumulated evidence — with on-track determination, baseline reference, and current
              performance level — that you review and finalize.
            </p>
          </div>

          <div className="blog-post__cta">
            <p>Stop writing quarterly reports from memory. PraxisOT builds the evidence as you go.</p>
            <Link href="/#waitlist" className="btn-primary">Get early access →</Link>
          </div>

          <div className="blog-post__related">
            <p className="section-label">Related</p>
            <div className="blog-post__related-links">
              <Link href="/blog/how-to-write-school-ot-soap-note">How to Write a School OT SOAP Note</Link>
              <Link href="/blog/shars-documentation-school-ot">SHARS Documentation Guide</Link>
              <Link href="/faq">School OT Documentation FAQ</Link>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
