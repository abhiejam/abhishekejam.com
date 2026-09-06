export type Project = {
  name: string;
  initial: string;
  status: "Live" | "Beta" | "Building";
  tagline: string;
  href: string;
  linkLabel: string;
};

export const projects: Project[] = [
  {
    name: "NameSnap",
    initial: "N",
    status: "Live",
    tagline: "Describe your idea. Snap your domain, instantly.",
    href: "https://namesnap.app",
    linkLabel: "namesnap.app →",
  },
];

export const comingSoonLabel = "Next product coming soon";
