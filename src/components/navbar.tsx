import { useSyncExternalStore } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Separator, useTheme } from "@heroui/react";

import { MoonIcon, SunIcon } from "@/components/shared";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

const tabs = [{ label: "Home", href: "/" }, ...siteConfig.navItems];

const subscribeToScroll = (callback: () => void) => {
  window.addEventListener("scroll", callback, { passive: true });

  return () => window.removeEventListener("scroll", callback);
};

const isPageScrolled = () => window.scrollY > 24;

export const Navbar = () => {
  const isScrolled = useSyncExternalStore(subscribeToScroll, isPageScrolled);
  const { resolvedTheme, setTheme } = useTheme("dark");
  const location = useLocation();

  const isDark = resolvedTheme !== "light";

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-30 flex justify-center px-4 pt-4 sm:pt-5">
      <nav
        className={cn(
          "pointer-events-auto flex items-center gap-1 rounded-full border border-border/75 bg-background/82 p-1 shadow-[0_14px_40px_rgba(0,0,0,0.10)] backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
          isScrolled
            ? "border-border bg-background/92 shadow-[0_18px_50px_rgba(0,0,0,0.16)]"
            : "shadow-[0_10px_28px_rgba(0,0,0,0.08)]",
        )}
      >
        <div className="relative flex items-center gap-0.5 pl-1">
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.href;

            return (
              <Link
                key={tab.href}
                className={cn(
                  "relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
                  isActive
                    ? "text-foreground"
                    : "text-muted hover:text-foreground",
                )}
                to={tab.href}
              >
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full bg-default shadow-[0_1px_0_rgba(255,255,255,0.08)_inset]"
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </Link>
            );
          })}
        </div>

        <Separator className="mx-1 h-4" orientation="vertical" />

        <div className="flex items-center gap-0.5 pr-1">
          <Button
            isIconOnly
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="rounded-full transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-95"
            size="sm"
            variant="ghost"
            onPress={() => setTheme(isDark ? "light" : "dark")}
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </Button>
        </div>
      </nav>
    </header>
  );
};
