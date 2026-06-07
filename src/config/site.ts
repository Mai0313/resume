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
  profile: {
    displayName: "Wei Cheng Lee",
    handle: "Mai",
    role: "Firmware systems engineer",
    summary:
      "Building trusted firmware, pre-silicon validation, and AI-assisted semiconductor systems across Pixel SoCs and EDA research.",
    location: "Hsinchu, Taiwan",
    focusAreas: [
      "Trusted Firmware-A",
      "Pre-Silicon Validation",
      "AI for Semiconductor Design",
    ],
  },
  links: {
    github: "https://github.com/Mai0313",
  },
};
