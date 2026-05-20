import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cadence — OT Notes",
  description:
    "Cadence is the daily session-note copilot for school-based occupational therapists. Same-day signing, IEP-linked evidence, quarterly reports drafted for you.",
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
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
