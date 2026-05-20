import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cadence — School-Based OT Documentation",
  description:
    "Cadence turns 9 weeks of session notes into IDEA-compliant quarterly progress reports for school-based occupational therapists."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
