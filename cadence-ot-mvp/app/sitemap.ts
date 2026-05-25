import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.praxisot.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${siteUrl}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/soap-note-template`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/blog/how-to-write-school-ot-soap-note`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/blog/shars-documentation-school-ot`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/blog/iep-quarterly-progress-reports-ot`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/blog/lea-bop-documentation-ot`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/vs-my-school-therapy`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/vs-spry`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/app`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];
}
