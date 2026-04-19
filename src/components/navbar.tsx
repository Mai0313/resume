import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "@heroui/use-theme";

import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

const SunIcon = () => (
  <svg
    fill="none"
    height="18"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="1.75"
    viewBox="0 0 24 24"
    width="18"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
);

const MoonIcon = () => (
  <svg
    fill="none"
    height="18"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="1.75"
    viewBox="0 0 24 24"
    width="18"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  const tabs = [{ label: "Home", href: "/" }, ...siteConfig.navItems];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isDark = theme !== "light";

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-5">
      <motion.nav
        animate={{
          paddingTop: isScrolled ? 4 : 6,
          paddingBottom: isScrolled ? 4 : 6,
        }}
        className={cn(
          "pointer-events-auto flex items-center gap-1 rounded-full border border-border bg-surface/70 backdrop-blur-xl transition-shadow duration-300",
          isScrolled
            ? "shadow-[0_8px_32px_-8px_rgba(0,0,0,0.25)]"
            : "shadow-none",
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
                  "relative rounded-full px-3 py-1.5 text-[13px] font-medium transition-colors",
                  isActive ? "text-fg" : "text-fg-muted hover:text-fg",
                )}
                to={tab.href}
              >
                {isActive && (
                  <motion.span
                    className="absolute inset-0 rounded-full bg-elevated"
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

        <span className="mx-1 h-4 w-px bg-border" />

        <div className="flex items-center gap-0.5 pr-1">
          <button
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="rounded-full p-2 text-fg-muted transition-colors hover:bg-elevated hover:text-fg"
            type="button"
            onClick={() => setTheme(isDark ? "light" : "dark")}
          >
            {isMounted ? (
              isDark ? (
                <SunIcon />
              ) : (
                <MoonIcon />
              )
            ) : (
              <div className="h-[18px] w-[18px]" />
            )}
          </button>
        </div>
      </motion.nav>
    </header>
  );
};
