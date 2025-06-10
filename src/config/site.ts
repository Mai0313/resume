import { buildPath } from "@/utils/pathUtils";
import { env } from "@/utils/env";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: env.WEBSITE_TITLE,
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
