import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PraxisOT Demo — School OT Note Composer",
  description:
    "Try the school OT note composer. Dictate a 60-second recap, get a SOAP or Goal-bullets note, copy it into your EMR.",
  openGraph: {
    title: "PraxisOT Demo — School OT Note Composer",
    description:
      "Try the school OT note composer. Dictate a 60-second recap, get a SOAP or Goal-bullets note, copy it into your EMR.",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
