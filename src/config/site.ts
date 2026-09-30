import { envHelpers } from "@/utils/env";

// Generate navigation items once based on environment configuration
const navItems = (() => {
  const items: Array<{ label: string; href: string }> = [];

  if (envHelpers.isResumeFileAvailable()) {
    items.push({ label: "Resume", href: "/resume" });
  }

  return items;
})();

export const siteConfig = {
  navItems,
  // Shown as the mono sub-line under the hero heading. Kept static so the
  // home route bundle never needs to load the resume YAML.
  tagline: "Software Engineer · Hsinchu, Taiwan",
  links: {
    github: "https://github.com/Mai0313",
  },
};
