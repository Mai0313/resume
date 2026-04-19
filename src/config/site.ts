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
  links: {
    github: "https://github.com/Mai0313",
  },
};
