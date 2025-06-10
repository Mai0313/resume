import { buildPath } from "@/utils/pathUtils";

export type SiteConfig = typeof siteConfig;
const WEBSITE_TITLE = import.meta.env.VITE_WEBSITE_TITLE;

export const siteConfig = {
  name: WEBSITE_TITLE,
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    { label: "Resume", href: buildPath("/resume") },
    { label: "Portfolio", href: buildPath("/portfolio") },
  ],
  navMenuItems: [
    { label: "Resume", href: buildPath("/resume") },
    { label: "Portfolio", href: buildPath("/portfolio") },
  ],
  links: {
    github: "https://github.com/Mai0313",
    discord: "mai9999",
  },
};
