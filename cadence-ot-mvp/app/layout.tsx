import type { Metadata, Viewport } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "900"],
  variable: "--font-urbanist",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://praxisot.app";

const title =
  "Cadence | School OT Documentation — SOAP Notes, SHARS & IEP Progress Reports";
const description =
  "AI-assisted SOAP, DAP, and Goal-bullet notes for school-based OTs. Covers SHARS, LEA-BOP billing fields, IDEA §300.320 quarterly reports, and pastes into Fusion or My School Therapy.";

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Cadence",
    applicationCategory: "HealthApplication",
    operatingSystem: "Web, iOS, Android",
    description:
      "AI-assisted session note and IEP quarterly progress report tool for school-based occupational therapists. Supports SOAP, DAP, Goal-bullets, and Narrative formats with SHARS and LEA-BOP service log fields.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: [
      "SOAP, DAP, Goal-bullets, Narrative note formats",
      "SHARS and LEA-BOP billing service log fields",
      "IDEA §300.320 quarterly progress report drafting",
      "Voice dictation with identifier check",
      "IEP goal tracking and evidence accumulation",
      "Export to Word",
    ],
    url: siteUrl,
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Cadence Health, Inc.",
    url: siteUrl,
    description:
      "Developer of Cadence, a documentation tool for school-based occupational therapists",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What documentation do I need for SHARS billing as a school OT?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Each SHARS session requires a skilled-service note with date, session type, duration, student eligibility, and evidence of a skilled OT service. Cadence generates the note and pre-fills a service log with all required fields.",
        },
      },
      {
        "@type": "Question",
        name: "What are the IDEA §300.320 requirements for quarterly OT progress reports?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "IDEA requires written progress reports at least as often as parents receive grade reports. Each report must describe the student's progress toward each IEP annual goal. Cadence drafts per-goal narratives from the session evidence you save with daily notes.",
        },
      },
      {
        "@type": "Question",
        name: "What should a school-based OT SOAP note include?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A school OT SOAP note needs: Subjective (student presentation, reported concerns), Objective (measurable observations, trial data), Assessment (progress toward IEP goals, skilled-service rationale), and Plan (next session focus). Cadence generates all four sections from a 60-second post-session dictation.",
        },
      },
      {
        "@type": "Question",
        name: "Can I use AI to generate school OT session notes?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes — with de-identified input. Cadence checks your recap for direct identifiers (names, DOB, student IDs) before sending anything to the AI. Use initials or a local label; keep clinical observations in; leave identifying details out.",
        },
      },
      {
        "@type": "Question",
        name: "How do I write an IEP progress note for occupational therapy?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Link each student's active IEP goals in Cadence. After each session, save a note that addresses those goals. Cadence tags measurable observations per goal. When the quarterly window opens, it drafts an IDEA-compliant progress paragraph from that accumulated evidence.",
        },
      },
      {
        "@type": "Question",
        name: "Does Cadence work with Fusion, My School Therapy, or SimplePractice?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Cadence is a draft layer, not a replacement. It generates a copy-ready note that you paste into whatever system your district uses — Fusion, My School Therapy, SimplePractice, or a custom district EMR. No IT approval or integration required.",
        },
      },
      {
        "@type": "Question",
        name: "What is the difference between a SOAP note and a DAP note for OT?",
        acceptedAnswer: {
          "@type": "Answer",
          text: 'A SOAP note separates Subjective, Objective, Assessment, and Plan into four sections. A DAP note uses Data, Assessment, Plan — combining subjective and objective into "Data." School districts often have a preferred format; Cadence generates either from the same dictation.',
        },
      },
      {
        "@type": "Question",
        name: "How do school OTs document for LEA-BOP Medicaid billing?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "LEA-BOP (Local Education Agency Billing Option Program) requires documentation of skilled service necessity, student eligibility, and session details. Cadence generates notes with skilled-service language and a service log that includes the fields most state LEA-BOP programs require for audit trails.",
        },
      },
    ],
  },
];

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Cadence",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Cadence — School OT Documentation Tool",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.png"],
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Cadence",
  },
  other: {
    "mobile-web-app-capable": "yes",
    "theme-color": "#4e8a6e",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={urbanist.variable}>
      <body suppressHydrationWarning>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
