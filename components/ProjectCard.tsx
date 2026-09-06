import type { Project } from "@/content/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={project.href}
      className="flex flex-col gap-3 rounded-card border border-border bg-surface p-7 transition-colors hover:border-ink"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-ink text-lg font-extrabold text-cream">
            {project.initial}
          </span>
          <span className="text-[22px] font-bold">{project.name}</span>
        </div>
        <span className="rounded-full bg-badge px-2.5 py-1 text-[13px] font-semibold text-ink-2">
          {project.status}
        </span>
      </div>
      <p className="text-[17px] leading-relaxed text-ink-2">
        {project.tagline}
      </p>
      <span className="mt-1 text-[15px] font-semibold">
        {project.linkLabel}
      </span>
    </a>
  );
}
