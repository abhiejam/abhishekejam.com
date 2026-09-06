const substackUrl = "https://abhishekejam.substack.com";

export const site = {
  name: "Abhishek Ejam",
  headline: "Hey, I'm Abhishek.",
  bio: "Indie builder from Melbourne. I ship small software products and share what I learn.",
  url: "https://abhishekejam.com",
  profileImage: "/profile.png",
  links: {
    x: "https://x.com/abhishekejam",
    github: "https://github.com/abhiejam",
    linkedin: "https://www.linkedin.com/in/abhishekejam/",
  },
  substackUrl,
  subscribeUrl: `${substackUrl}/subscribe`,
  feedUrl: `${substackUrl}/feed`,
  nav: [
    { label: "Projects", href: "#projects" },
    { label: "Journey", href: "#journey" },
    { label: "Newsletter", href: substackUrl },
  ],
  newsletter: {
    title: "Join the newsletter",
    pitch: "Build notes, launches and lessons. A few times a month.",
    cta: "Subscribe",
    note: "No spam. Unsubscribe anytime.",
    fallback: "Or subscribe on Substack",
  },
  footerLink: "Read the newsletter →",
} as const;
