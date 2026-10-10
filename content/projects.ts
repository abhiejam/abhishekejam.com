export type Project = {
  name: string;
  initial: string;
  icon?: string;
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
  {
    name: "AirMic",
    initial: "A",
    icon: "/airmic/airmic-app-icon.svg",
    status: "Beta",
    tagline: "Turn your iPhone into a wireless mic for your computer.",
    href: "/airmic?ref=site",
    linkLabel: "Join the App Store waitlist →",
  },
];

export const comingSoonLabel = "Next product coming soon";
