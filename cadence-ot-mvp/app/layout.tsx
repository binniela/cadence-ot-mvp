import type { Metadata, Viewport } from "next";
import { Urbanist } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "900"],
  variable: "--font-urbanist",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.praxisot.app";

const title =
  "PraxisOT | School OT Documentation — SOAP Notes, SHARS & IEP Progress Reports";
const description =
  "AI-assisted SOAP, DAP, and Goal-bullet notes for school-based OTs. Covers SHARS, LEA-BOP billing fields, IDEA §300.320 quarterly reports, and pastes into Fusion or My School Therapy.";

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "PraxisOT",
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
    name: "PraxisOT, Inc.",
    url: siteUrl,
    description:
      "Developer of PraxisOT, a documentation tool for school-based occupational therapists",
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
    siteName: "PraxisOT",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PraxisOT — School OT Documentation Tool",
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
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "PraxisOT",
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
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
