import { site } from "@/content/site";

export const profileStructuredData = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${site.url}/#profile`,
  url: site.url,
  name: site.seo.title,
  description: site.seo.description,
  mainEntity: {
    "@type": "Person",
    "@id": `${site.url}/#person`,
    name: site.name,
    url: site.url,
    image: new URL(site.profileImage, site.url).href,
    description: site.bio,
    jobTitle: "Software Engineer",
    homeLocation: {
      "@type": "Place",
      name: "Melbourne, Australia",
    },
    sameAs: Object.values(site.links),
  },
};
