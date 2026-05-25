import type { Metadata } from "next";
import Link from "next/link";
import { NavBar } from "@/app/components/NavBar";

export const metadata: Metadata = {
  title: "School OT Documentation Blog | PraxisOT",
  description:
    "Guides, templates, and compliance tips for school-based occupational therapists — SOAP notes, SHARS billing, IEP progress reports, and LEA-BOP documentation.",
  alternates: { canonical: "/blog" },
};

const posts = [
  {
    slug: "shars-documentation-school-ot",
    title: "SHARS Documentation: What School OTs Need to Know",
    description:
      "A practical guide to SHARS billing documentation requirements for school-based OTs — what to include in every note to survive an audit.",
    date: "May 2026",
    tag: "Billing & Compliance",
  },
  {
    slug: "how-to-write-school-ot-soap-note",
    title: "How to Write a School OT SOAP Note (with Examples)",
    description:
      "Step-by-step guide to writing SOAP notes for school-based occupational therapy, including real examples for fine motor, sensory, and handwriting goals.",
    date: "May 2026",
    tag: "Documentation",
  },
  {
    slug: "iep-quarterly-progress-reports-ot",
    title: "IEP Quarterly Progress Reports for OTs: IDEA §300.320 Guide",
    description:
      "Everything school-based OTs need to know about writing IDEA-compliant quarterly progress reports — what to include, how often, and common mistakes.",
    date: "May 2026",
    tag: "IEP & IDEA",
  },
  {
    slug: "lea-bop-documentation-ot",
    title: "LEA-BOP Billing: OT Documentation Checklist",
    description:
      "A state-by-state overview of LEA-BOP Medicaid billing documentation requirements for school-based occupational therapists.",
    date: "May 2026",
    tag: "Billing & Compliance",
  },
];

export default function BlogIndex() {
  return (
    <main>
      <NavBar />
      <div className="blog-index">
        <div className="blog-index__inner">
          <div className="blog-index__header">
            <p className="section-label">Resources</p>
            <h1 className="blog-index__title">School OT Documentation Guides</h1>
            <p className="blog-index__sub">
              Practical guides for school-based occupational therapists on SOAP notes,
              SHARS billing, IEP progress reports, and compliance.
            </p>
          </div>
          <div className="blog-index__grid">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-card">
                <span className="blog-card__tag">{post.tag}</span>
                <h2 className="blog-card__title">{post.title}</h2>
                <p className="blog-card__desc">{post.description}</p>
                <span className="blog-card__date">{post.date}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
