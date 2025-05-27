export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Vite + HeroUI",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    { label: "Resume", href: "/resume" },
    { label: "Portfolio", href: "/portfolio" },
  ],
  navMenuItems: [
    { label: "Resume", href: "/resume" },
    { label: "Portfolio", href: "/portfolio" },
  ],
  links: {
    github: "https://github.com/Mai0313",
    twitter: "https://twitter.com/hero_ui",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
