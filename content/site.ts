const substackUrl = "https://abhishekejam.substack.com";

export const site = {
  name: "Abhishek Ejam",
  headline: "Hey, I'm Abhishek.",
  bio: "Software engineer and indie builder, based in Melbourne. I build small products and share what I learn along the way.",
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
    pitch:
      "Notes on building and launching small software products, with lessons from the work along the way.",
    cta: "Subscribe",
    note: "No spam. Unsubscribe anytime.",
    fallback: "Or subscribe on Substack",
  },
  footerLink: "Read the newsletter →",
} as const;
