import { buildPath } from "@/utils/pathUtils";
import { env, envHelpers } from "@/utils/env";

export type SiteConfig = typeof siteConfig;

// Generate navigation items once based on environment configuration
// Cached to avoid redundant generation on every import
const navItems = (() => {
  const items: Array<{ label: string; href: string }> = [];

  // Only add Resume page if resume file is available
  if (envHelpers.isResumeFileAvailable()) {
    items.push({ label: "Resume", href: buildPath("/resume") });
  }

  // Only add Portfolio page if GitHub token is available
  if (envHelpers.isGitHubTokenAvailable()) {
    items.push({ label: "Portfolio", href: buildPath("/portfolio") });
  }

  return items;
})();

export const siteConfig = {
  name: env.WEBSITE_TITLE,
  description: "Make beautiful websites regardless of your design experience.",
  navItems,
  navMenuItems: navItems, // Reuse the same array reference
  links: {
    github: "https://github.com/Mai0313",
    discord: "mai9999",
  },
};
