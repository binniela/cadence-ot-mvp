import type { Metadata } from "next";
import Link from "next/link";
import { NavBar } from "@/app/components/NavBar";

export const metadata: Metadata = {
  title: "Free School OT SOAP Note Templates | PraxisOT",
  description:
    "Free SOAP, DAP, and Goal-bullets note templates for school-based occupational therapists. Copy-paste ready, SHARS and LEA-BOP compliant, with real examples for IEP goals.",
  alternates: { canonical: "/soap-note-template" },
};

const templates = [
  {
    id: "soap",
    label: "SOAP Note",
    description: "Subjective · Objective · Assessment · Plan — the standard format for most school districts and Medicaid billing.",
    template: `S: [Student presentation at session start. Teacher/parent report. Environmental context.]

O: [Measurable observations — trial counts, percentages, assist levels, duration data. Example: "8/10 trials independently (↑ from 5/10 baseline). Sustained seated tabletop activity 3.5 min before seeking movement break."]

A: [Progress toward IEP goal(s). Clinical interpretation. Skilled service justification — why an OT is required. Example: "Student demonstrating measurable progress toward IEP fine-motor goal. Skilled OT services medically necessary to achieve annual goal and prevent regression."]

P: [Next session focus. Any modifications to approach, task grading, or goal. Example: "Increase task difficulty. Fade verbal cues for letter formation B/D. Target 4.5 min seated tolerance."]`,
  },
  {
    id: "dap",
    label: "DAP Note",
    description: "Data · Assessment · Plan — faster to write, easier to align with IEP goal language. Preferred by many school districts.",
    template: `D: [Combined subjective/objective data. Student presentation + measurable observations. Example: "Student arrived cooperative. Bead stringing: 7/10 trials with minimal verbal cuing (↑ from 3/10 at baseline). Letter formation B/D with moderate verbal cuing."]

A: [Progress toward IEP goal(s). Skilled service justification. Example: "Student on track to meet fine-motor manipulation annual goal by IEP end date. Skilled OT required to grade task demands and provide therapeutic handling."]

P: [Next session plan with specific modifications.]`,
  },
  {
    id: "goal-bullets",
    label: "Goal-Bullets",
    description: "Per-goal bullet format — ideal for districts that track each IEP goal separately in their documentation system.",
    template: `Goal 1: [State the IEP goal]
• Data: [Measurable performance this session]
• Progress: [On track / Progressing / Needs revision]
• Skilled service: [Why OT is required for this goal]
• Plan: [Next session focus for this goal]

Goal 2: [State the IEP goal]
• Data: [Measurable performance this session]
• Progress: [On track / Progressing / Needs revision]
• Skilled service: [Why OT is required for this goal]
• Plan: [Next session focus for this goal]`,
  },
];

const examples = [
  {
    label: "Fine Motor / Bead Stringing",
    goal: "Student will improve fine-motor manipulation to complete bead stringing 8/10 trials with minimal assist across 3 consecutive sessions.",
    soap: {
      s: "Student arrived alert and cooperative. Teacher reported carry-over of pencil grasp cues from last week's session during morning writing.",
      o: "Bead stringing: 8/10 trials independently (↑ from 5/10 baseline). Weighted lap pad trialed — sustained seated tabletop activity 3.5 min before seeking movement break (↑ from 2.5 min). Letter formation B/D with moderate verbal cuing.",
      a: "Student demonstrating measurable progress toward IEP fine-motor manipulation and seated tolerance goals. Letter formation continues to require moderate verbal cueing; opportunity for further fading identified. Skilled OT services medically necessary to achieve IEP annual goals.",
      p: "Increase bead stringing task difficulty. Add bilateral coordination crossing-midline activity. Fade verbal cues for letter formation B/D. Target 4.5 min seated tolerance next session.",
    },
  },
  {
    label: "Handwriting / Letter Formation",
    goal: "Student will improve pencil grasp and letter formation for reversals (B, D, P, Q) with cuing faded to minimal across 4/5 sessions.",
    soap: {
      s: "Student reports feeling tired. Arrived from recess — needed 3 min transition time before engaging. No teacher concerns reported.",
      o: "Pencil grasp: dynamic tripod achieved with minimal tactile cuing (↑ from requiring maximal physical prompt at baseline). Letter B: 5/6 correct orientation with verbal cuing. Letter D: 4/6 correct. P and Q: introduced with visual model, 2/4 correct. Session duration 30 min.",
      a: "Student making expected progress toward handwriting reversal goal. Grasp pattern improving; cuing level decreased from maximum to minimal over 6 sessions. On track to meet annual goal. Skilled OT required to address underlying motor planning deficits driving reversal pattern.",
      p: "Introduce multisensory tracing for B/D. Continue dynamic tripod cueing fading protocol. Target 5/6 correct B orientation without cuing next session.",
    },
  },
];

export default function SoapNoteTemplatePage() {
  return (
    <main>
      <NavBar />
      <div className="template-page">
        <div className="template-page__inner">
          <header className="template-page__header">
            <p className="section-label">Free Templates</p>
            <h1 className="template-page__title">School OT SOAP Note Templates</h1>
            <p className="template-page__sub">
              Free, copy-paste ready SOAP, DAP, and Goal-bullets templates for school-based
              occupational therapists. SHARS and LEA-BOP compliant. No sign-up required.
            </p>
          </header>

          <section className="template-page__section">
            <h2 className="template-page__section-title">Note Templates</h2>
            <div className="template-grid">
              {templates.map((t) => (
                <div key={t.id} className="template-card">
                  <div className="template-card__header">
                    <h3 className="template-card__label">{t.label}</h3>
                    <p className="template-card__desc">{t.description}</p>
                  </div>
                  <pre className="template-card__body">{t.template}</pre>
                  <p className="template-card__hint">Select all text above and copy</p>
                </div>
              ))}
            </div>
          </section>

          <section className="template-page__section">
            <h2 className="template-page__section-title">Completed Examples</h2>
            <p className="template-page__section-sub">
              Real-world examples showing how the templates look filled in for common school OT IEP goals.
            </p>
            {examples.map((ex) => (
              <div key={ex.label} className="example-card">
                <div className="example-card__header">
                  <h3 className="example-card__title">{ex.label}</h3>
                  <p className="example-card__goal"><strong>IEP Goal:</strong> {ex.goal}</p>
                </div>
                <div className="example-card__note">
                  <p><strong>S:</strong> {ex.soap.s}</p>
                  <p><strong>O:</strong> {ex.soap.o}</p>
                  <p><strong>A:</strong> {ex.soap.a}</p>
                  <p><strong>P:</strong> {ex.soap.p}</p>
                </div>
              </div>
            ))}
          </section>

          <section className="template-page__section">
            <h2 className="template-page__section-title">What Makes a School OT Note Billable?</h2>
            <p>Every note submitted for SHARS or LEA-BOP Medicaid reimbursement needs:</p>
            <ul className="template-page__checklist">
              <li>Date, start time, and end time</li>
              <li>Student identifier (initials — never full name in AI-generated drafts)</li>
              <li>Specific IEP goal addressed</li>
              <li>Objective data — trial counts, percentages, assist levels, duration</li>
              <li>Skilled service justification — why a licensed OT is required</li>
              <li>Plan for next session</li>
              <li>OT signature and credentials</li>
            </ul>
            <p>
              See our full guides on{" "}
              <Link href="/blog/shars-documentation-school-ot">SHARS documentation</Link> and{" "}
              <Link href="/blog/lea-bop-documentation-ot">LEA-BOP billing</Link> for state-specific requirements.
            </p>
          </section>

          <div className="template-page__cta">
            <h2>Skip the template. Generate the note.</h2>
            <p>
              Speak a 60-second post-session recap. PraxisOT generates a SOAP, DAP, or Goal-bullets
              note with skilled-service language — ready to paste before your next student.
            </p>
            <Link href="/#waitlist" className="btn-primary">Get early access →</Link>
          </div>

          <div className="template-page__related">
            <p className="section-label">Related</p>
            <div className="template-page__related-links">
              <Link href="/blog/how-to-write-school-ot-soap-note">How to Write a School OT SOAP Note</Link>
              <Link href="/blog/shars-documentation-school-ot">SHARS Documentation Guide</Link>
              <Link href="/blog/iep-quarterly-progress-reports-ot">IEP Quarterly Progress Reports</Link>
              <Link href="/faq">School OT Documentation FAQ</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
