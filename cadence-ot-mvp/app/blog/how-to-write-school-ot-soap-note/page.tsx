import type { Metadata } from "next";
import Link from "next/link";
import { NavBar } from "@/app/components/NavBar";

export const metadata: Metadata = {
  title: "How to Write a School OT SOAP Note (with Examples) | PraxisOT",
  description:
    "Step-by-step guide to writing SOAP notes for school-based occupational therapy. Includes real examples for fine motor, sensory processing, and handwriting IEP goals.",
  alternates: { canonical: "/blog/how-to-write-school-ot-soap-note" },
};

export default function SoapNotePost() {
  return (
    <main>
      <NavBar />
      <article className="blog-post">
        <div className="blog-post__inner">
          <header className="blog-post__header">
            <p className="section-label">Documentation</p>
            <h1 className="blog-post__title">How to Write a School OT SOAP Note (with Examples)</h1>
            <p className="blog-post__meta">May 2026 · 8 min read</p>
          </header>

          <div className="blog-post__body">
            <p>
              School-based OT documentation lives at the intersection of two different frameworks:
              IDEA educational necessity standards and Medicaid billing requirements (SHARS, LEA-BOP).
              A SOAP note that satisfies one doesn&rsquo;t automatically satisfy the other. This guide
              walks through each section with school-specific examples so your notes hold up under
              both IEP review and a Medicaid audit.
            </p>

            <h2>SOAP Format Overview for School OT</h2>
            <p>
              SOAP stands for Subjective, Objective, Assessment, and Plan. In a school-based OT
              context, each section has a specific job:
            </p>
            <ul>
              <li><strong>S (Subjective)</strong> — What the student, teacher, or parent reported; behavioral presentation at session start</li>
              <li><strong>O (Objective)</strong> — Measurable observations, trial data, assist levels, quantitative performance</li>
              <li><strong>A (Assessment)</strong> — Your clinical interpretation; progress toward IEP goals; skilled-service rationale</li>
              <li><strong>P (Plan)</strong> — What happens at the next session; any changes to approach, goals, or frequency</li>
            </ul>

            <h2>S — Subjective</h2>
            <p>
              Keep the Subjective section brief. It&rsquo;s not a narrative — it&rsquo;s context that
              explains what you walked into. Useful things to include:
            </p>
            <ul>
              <li>Student&rsquo;s mood, affect, or behavioral state at session start</li>
              <li>Teacher report of carry-over from the previous session</li>
              <li>Any relevant environmental factors (sub teacher, post-recess, test day)</li>
            </ul>
            <p><em>Example: &ldquo;Student arrived alert and cooperative. Teacher reported carry-over of pencil grasp cues from last week&rsquo;s session during morning writing.&rdquo;</em></p>

            <h2>O — Objective</h2>
            <p>
              This is the most important section for billing compliance. Every statement needs a
              number, a percentage, an assist level, or a measurable outcome. Vague observations
              (&ldquo;student worked on fine motor skills&rdquo;) are the #1 audit failure.
            </p>
            <ul>
              <li>Trial counts and accuracy rates: &ldquo;8/10 trials independently&rdquo;</li>
              <li>Assist levels: &ldquo;moderate verbal cuing,&rdquo; &ldquo;hand-over-hand assist x2&rdquo;</li>
              <li>Duration data: &ldquo;sustained seated tabletop activity 3.5 min before seeking movement break&rdquo;</li>
              <li>Comparison to baseline: &ldquo;improved from 5/10 at baseline&rdquo;</li>
            </ul>
            <p><em>Example: &ldquo;Bead stringing: 8/10 trials independently (↑ from 5/10 baseline). Weighted lap pad trialed — sustained seated tabletop activity 3.5 min before seeking movement break (↑ from 2.5 min). Letter formation B/D with moderate verbal cuing. P and Q introduced with hand-over-hand model.&rdquo;</em></p>

            <h2>A — Assessment</h2>
            <p>
              The Assessment section is where you demonstrate clinical reasoning and establish skilled
              service justification. It should answer two questions: (1) How is the student progressing
              toward their IEP goals? (2) Why does this student need a licensed OT, specifically?
            </p>
            <p><em>Example: &ldquo;Student is demonstrating measurable progress toward IEP fine-motor manipulation and seated tolerance goals. Letter formation continues to require moderate verbal cueing; opportunity for further fading identified. Skilled OT services medically necessary to achieve IEP annual goals and prevent regression.&rdquo;</em></p>

            <h2>P — Plan</h2>
            <p>
              Keep it specific and actionable. Avoid &ldquo;continue current treatment&rdquo; — this
              signals to auditors that nothing is being clinically adjusted.
            </p>
            <p><em>Example: &ldquo;Increase bead stringing task difficulty. Add bilateral coordination crossing-midline activity. Fade verbal cues for letter formation B/D. Target 4.5 min seated tolerance next session.&rdquo;</em></p>

            <h2>Full School OT SOAP Note Example</h2>
            <div className="blog-post__example">
              <p><strong>Date:</strong> 05/20/2026 | <strong>Time:</strong> 9:15–9:45 | <strong>Type:</strong> Pull-out | <strong>Student:</strong> M.R. | <strong>Grade:</strong> 3</p>
              <p><strong>S:</strong> Student arrived alert and cooperative. Teacher reported carry-over of pencil grasp cues from last week&rsquo;s session during morning writing.</p>
              <p><strong>O:</strong> Bead stringing: 8/10 trials independently (↑ from 5/10 baseline). Weighted lap pad trialed — sustained seated tabletop activity 3.5 min before seeking movement break (↑ from 2.5 min). Letter formation B/D with moderate verbal cuing; P and Q introduced with hand-over-hand model.</p>
              <p><strong>A:</strong> Student demonstrating measurable progress toward IEP fine-motor manipulation and seated tolerance goals. Letter formation continues to require moderate verbal cueing; opportunity for further fading identified. Skilled OT services medically necessary to achieve IEP annual goals and prevent regression.</p>
              <p><strong>P:</strong> Increase bead stringing task difficulty. Add bilateral coordination crossing-midline activity. Fade verbal cues for letter formation B/D. Target 4.5 min seated tolerance next session.</p>
            </div>

            <h2>SOAP vs. DAP for School OT</h2>
            <p>
              Many school districts prefer DAP notes (Data, Assessment, Plan) because they&rsquo;re
              faster and easier to align with IEP goal language. DAP combines Subjective and Objective
              into a single &ldquo;Data&rdquo; section. The billing requirements are identical — you
              still need measurable data and skilled-service language, just organized differently.
            </p>
            <p>
              PraxisOT generates both formats from the same voice dictation. See our{" "}
              <Link href="/soap-note-template">free school OT note templates</Link> for SOAP, DAP, and
              Goal-bullets examples you can copy directly.
            </p>

            <h2>The Fastest Way to Write School OT SOAP Notes</h2>
            <p>
              The biggest documentation bottleneck for school OTs isn&rsquo;t knowing what to write —
              it&rsquo;s finding time to write it. Pulling out a laptop between sessions or staying
              after school to catch up means your notes are reconstructions, not real-time observations.
            </p>
            <p>
              PraxisOT is built for the gap between sessions: speak a 60-second recap using initials
              and objective data, and the AI generates a complete SOAP note with skilled-service
              language, goal references, and a SHARS/LEA-BOP service log. Done before your next student.
            </p>
          </div>

          <div className="blog-post__cta">
            <p>Generate SOAP, DAP, or Goal-bullet notes from a 60-second voice recap.</p>
            <Link href="/#waitlist" className="btn-primary">Get early access →</Link>
          </div>

          <div className="blog-post__related">
            <p className="section-label">Related</p>
            <div className="blog-post__related-links">
              <Link href="/soap-note-template">Free School OT Note Templates</Link>
              <Link href="/blog/shars-documentation-school-ot">SHARS Documentation Guide</Link>
              <Link href="/blog/iep-quarterly-progress-reports-ot">IEP Quarterly Progress Reports</Link>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
