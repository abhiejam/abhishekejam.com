import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="mt-auto flex flex-col gap-2 border-t border-border py-7 text-sm text-muted sm:flex-row sm:justify-between">
      <span>
        © {new Date().getFullYear()} {site.name}
      </span>
      <a href={site.substackUrl} className="transition-colors hover:text-ink">
        {site.footerLink}
      </a>
    </footer>
  );
}
