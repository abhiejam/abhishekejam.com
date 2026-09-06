import { site } from "@/content/site";

export function Nav() {
  return (
    <header className="flex items-center justify-between gap-6 pt-9">
      <a
        href="#top"
        className="text-lg font-bold tracking-tight whitespace-nowrap sm:text-xl"
      >
        {site.name}
      </a>
      <nav className="flex gap-4 text-sm font-medium sm:gap-8 sm:text-base">
        {site.nav.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="transition-colors hover:text-ink-2"
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
