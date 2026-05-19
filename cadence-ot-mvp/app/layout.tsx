import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cadence - Outpatient OT MVP",
  description:
    "Outpatient occupational therapy documentation copilot for goal-linked, payer-defensible notes."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
