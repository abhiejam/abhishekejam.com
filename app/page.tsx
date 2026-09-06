import Image from "next/image";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { ProjectCard } from "@/components/ProjectCard";
import { SocialLinks } from "@/components/SocialLinks";
import { SubscribeForm } from "@/components/SubscribeForm";
import { comingSoonLabel, projects } from "@/content/projects";
import { journey } from "@/content/journey";
import { site } from "@/content/site";

export const dynamic = "force-static";

export default function Home() {
  return (
    <div
      id="top"
      className="mx-auto flex min-h-dvh w-full max-w-[1040px] flex-col px-6"
    >
      <Nav />

      <main>
        <section className="grid items-center gap-12 py-20 md:grid-cols-2 md:gap-20 md:py-32">
          <div className="flex flex-col gap-5">
            <Image
              src={site.profileImage}
              alt={site.name}
              width={112}
              height={112}
              priority
              className="h-28 w-28 rounded-full object-cover"
            />
            <h1 className="mt-3 text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-[56px] md:leading-[1.05]">
              {site.headline}
            </h1>
            <p className="max-w-[460px] text-xl leading-relaxed text-ink-2 md:text-[22px]">
              {site.bio}
            </p>
            <SocialLinks />
          </div>

          <SubscribeForm />
        </section>

        <section id="projects" className="flex flex-col gap-6 pb-20 md:pb-32">
          <h2 className="text-[28px] font-bold tracking-tight">Projects</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
            <div className="flex items-center justify-center rounded-card border border-dashed border-border-strong p-7 text-base text-muted">
              {comingSoonLabel}
            </div>
          </div>
        </section>

        <section id="journey" className="flex flex-col gap-5 pb-24 md:pb-36">
          <h2 className="text-[28px] font-bold tracking-tight">My journey</h2>
          <ul className="flex max-w-[640px] flex-col gap-3.5 text-lg leading-relaxed text-ink-2">
            {journey.map((item) => (
              <li key={item} className="flex gap-3.5">
                <span className="text-ink" aria-hidden="true">
                  •
                </span>
                {item}
              </li>
            ))}
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  );
}
