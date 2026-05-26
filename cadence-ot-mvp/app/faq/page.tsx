import type { Metadata } from "next";
import { NavBar } from "@/app/components/NavBar";

export const metadata: Metadata = {
  title: "FAQ — PraxisOT | School OT Documentation Questions",
  description:
    "Answers to common questions about school OT documentation, SOAP notes, SHARS billing, IDEA §300.320 quarterly reports, and how PraxisOT works.",
};

const faqs = [
  {
    q: "What documentation do I need for SHARS billing as a school OT?",
    a: "Each SHARS session requires a skilled-service note with date, session type, duration, student eligibility, and evidence of a skilled OT service. PraxisOT generates the note and pre-fills a service log with all required fields.",
  },
  {
    q: "What are the IDEA §300.320 requirements for quarterly OT progress reports?",
    a: "IDEA requires written progress reports at least as often as parents receive grade reports. Each report must describe the student's progress toward each IEP annual goal. PraxisOT drafts per-goal narratives from the session evidence you save with daily notes.",
  },
  {
    q: "What should a school-based OT SOAP note include?",
    a: "A school OT SOAP note needs: Subjective (student presentation, reported concerns), Objective (measurable observations, trial data), Assessment (progress toward IEP goals, skilled-service rationale), and Plan (next session focus). PraxisOT generates all four sections from a 60-second post-session dictation.",
  },
  {
    q: "Can I use AI to generate school OT session notes?",
    a: "Yes — with de-identified input. PraxisOT checks your recap for direct identifiers (names, DOB, student IDs) before sending anything to the AI. Use initials or a local label; keep clinical observations in; leave identifying details out.",
  },
  {
    q: "How do I write an IEP progress note for occupational therapy?",
    a: "Link each student's active IEP goals in PraxisOT. After each session, save a note that addresses those goals. PraxisOT tags measurable observations per goal. When the quarterly window opens, it drafts an IDEA-compliant progress paragraph from that accumulated evidence.",
  },
  {
    q: "Does PraxisOT work with Fusion, My School Therapy, or SimplePractice?",
    a: "PraxisOT is a draft layer, not a replacement. It generates a copy-ready note that you paste into whatever system your district uses — Fusion, My School Therapy, SimplePractice, or a custom district EMR. No IT approval or integration required.",
  },
  {
    q: "What is the difference between a SOAP note and a DAP note for OT?",
    a: 'A SOAP note separates Subjective, Objective, Assessment, and Plan into four sections. A DAP note uses Data, Assessment, Plan — combining subjective and objective into "Data." School districts often have a preferred format; PraxisOT generates either from the same dictation.',
  },
  {
    q: "How do school OTs document for LEA-BOP Medicaid billing?",
    a: "LEA-BOP (Local Education Agency Billing Option Program) requires documentation of skilled service necessity, student eligibility, and session details. PraxisOT generates notes with skilled-service language and a service log that includes the fields most state LEA-BOP programs require for audit trails.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

export default function FaqPage() {
  return (
    <main>
      <NavBar />
      <div className="faq-page">
        <div className="faq-page__inner">
          <div className="faq-page__header">
            <p className="section-label">FAQ</p>
            <h1 className="faq-page__title">School OT documentation, answered.</h1>
            <p className="faq-page__sub">
              Common questions about SOAP notes, SHARS billing, IDEA requirements, and how PraxisOT works.
            </p>
          </div>
          <dl className="faq-page__list">
            {faqs.map((item) => (
              <div key={item.q} className="faq-page__item">
                <dt className="faq-page__q">{item.q}</dt>
                <dd className="faq-page__a">{item.a}</dd>
              </div>
            ))}
          </dl>
          <div className="faq-page__cta">
            <p>Ready to try it?</p>
            <a href="/#waitlist" className="btn-primary">Get early access →</a>
          </div>
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </main>
  );
}
