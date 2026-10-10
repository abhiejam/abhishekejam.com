import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { WaitlistForm } from "@/components/WaitlistForm";
import { airmic } from "@/content/airmic";
import { site } from "@/content/site";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: airmic.seo.title,
  description: airmic.seo.description,
  alternates: { canonical: "/airmic" },
  openGraph: {
    type: "website",
    url: `${site.url}/airmic`,
    siteName: site.name,
    title: airmic.seo.title,
    description: airmic.seo.description,
    locale: "en_AU",
  },
  twitter: {
    card: "summary_large_image",
    title: airmic.seo.title,
    description: airmic.seo.description,
    creator: "@abhishekejam",
  },
};

export default function AirMicPage() {
  const { video } = airmic;

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[1040px] flex-col px-6">
      <header className="pt-9">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight whitespace-nowrap sm:text-xl"
        >
          {site.name}
        </Link>
      </header>

      <main className="grid items-center gap-12 py-12 md:grid-cols-[1fr_auto] md:gap-16 md:py-16">
        <div className="flex max-w-[500px] flex-col gap-5">
          <div className="flex items-center gap-3.5">
            <Image
              src={airmic.icon}
              alt=""
              width={56}
              height={56}
              priority
              className="h-14 w-14 rounded-[13px]"
            />
            <span className="text-xl font-bold tracking-tight">
              {airmic.name}
            </span>
          </div>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-[56px] md:leading-[1.05]">
            {airmic.headline}
          </h1>
          <p className="text-lg leading-relaxed text-ink-2 md:text-xl">
            {airmic.pitch}
          </p>
          <div className="mt-2">
            <WaitlistForm />
          </div>
          <a
            href={airmic.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted underline underline-offset-4 transition-colors hover:text-ink"
          >
            {airmic.waitlist.buildYourself}
          </a>
        </div>

        <video
          src={video.src}
          poster={video.poster}
          width={video.width}
          height={video.height}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="AirMic launch video"
          className="mx-auto aspect-[4/5] h-auto w-full max-w-[440px] rounded-card bg-black object-cover md:h-[min(72dvh,600px)] md:w-auto"
        />
      </main>

      <Footer />
    </div>
  );
}
