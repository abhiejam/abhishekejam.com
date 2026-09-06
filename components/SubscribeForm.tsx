import { site } from "@/content/site";

export function SubscribeForm() {
  const { newsletter } = site;

  return (
    <div
      id="newsletter"
      className="flex flex-col gap-4 rounded-card border border-border bg-surface p-7 sm:p-9"
    >
      <h2 className="text-2xl font-bold tracking-tight">{newsletter.title}</h2>
      <p className="text-[17px] leading-relaxed text-ink-2">
        {newsletter.pitch}
      </p>

      <form
        action={site.subscribeUrl}
        method="get"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-1.5 flex flex-col gap-2.5 sm:flex-row"
      >
        <label htmlFor="subscribe-email" className="sr-only">
          Your email
        </label>
        <input
          id="subscribe-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="Your email"
          className="h-[50px] min-h-[50px] rounded-[10px] border border-border-strong bg-white px-4 text-base outline-none focus-visible:border-ink sm:flex-1"
        />
        <button
          type="submit"
          className="h-[50px] cursor-pointer rounded-[10px] bg-ink px-6 text-base font-semibold text-cream transition-colors hover:bg-ink-2"
        >
          {newsletter.cta}
        </button>
      </form>

      <p className="text-sm text-muted">{newsletter.note}</p>
      <a
        href={site.subscribeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-muted underline underline-offset-4 transition-colors hover:text-ink"
      >
        {newsletter.fallback}
      </a>
    </div>
  );
}
