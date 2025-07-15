import { buildPath } from "@/utils/pathUtils";
import { env, envHelpers } from "@/utils/env";

export type SiteConfig = typeof siteConfig;

// 動態生成導航項目，根據環境變數配置決定顯示哪些頁面
const generateNavItems = () => {
  const baseItems: Array<{ label: string; href: string }> = [];

  // 只有在 Resume 文件可用時才添加 Resume 頁面
  if (envHelpers.isResumeFileAvailable()) {
    baseItems.push({ label: "Resume", href: buildPath("/resume") });
  }

  // 只有在 GitHub Token 可用時才添加 Portfolio 頁面
  if (envHelpers.isGitHubTokenAvailable()) {
    baseItems.push({ label: "Portfolio", href: buildPath("/portfolio") });
  }

  return baseItems;
};

export const siteConfig = {
  name: env.WEBSITE_TITLE,
  description: "Make beautiful websites regardless of your design experience.",
  navItems: generateNavItems(),
  navMenuItems: generateNavItems(),
  links: {
    github: "https://github.com/Mai0313",
    discord: "mai9999",
  },
};
