import { useSyncExternalStore } from "react";
import { Link, useLocation } from "react-router-dom";
import { m } from "framer-motion";
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
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-5">
      <m.nav
        animate={{
          paddingTop: isScrolled ? 4 : 6,
          paddingBottom: isScrolled ? 4 : 6,
        }}
        className={cn(
          "pointer-events-auto flex items-center gap-1 rounded-full border border-border bg-surface/70 backdrop-blur-xl transition-shadow duration-300",
          isScrolled ? "shadow-lg" : "shadow-none",
        )}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative flex items-center gap-0.5 pl-1">
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.href;

            return (
              <Link
                key={tab.href}
                className={cn(
                  "relative rounded-full px-3 py-1.5 text-sm font-medium tracking-tight transition-colors",
                  isActive
                    ? "text-foreground"
                    : "text-muted hover:text-foreground",
                )}
                to={tab.href}
              >
                {isActive && (
                  <m.span
                    className="absolute inset-0 rounded-full bg-default"
                    layoutId="active-tab-pill"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 32,
                    }}
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
            className="rounded-full"
            size="sm"
            variant="ghost"
            onPress={() => setTheme(isDark ? "light" : "dark")}
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </Button>
        </div>
      </m.nav>
    </header>
  );
};
