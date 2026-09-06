import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { site } from "@/content/site";
import { SiteAnalytics } from "@/components/SiteAnalytics";
import "./globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-figtree",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.seo.title,
  description: site.seo.description,
  robots:
    process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production"
      ? { index: false, follow: false }
      : { index: true, follow: true },
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": [
        { url: site.feedUrl, title: `${site.name} on Substack` },
      ],
    },
  },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: site.seo.title,
    description: site.seo.description,
    locale: "en_AU",
  },
  twitter: {
    card: "summary_large_image",
    title: site.seo.title,
    description: site.seo.description,
    creator: "@abhishekejam",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={figtree.variable}>
      <body>
        {children}
        <SiteAnalytics />
      </body>
    </html>
  );
}
