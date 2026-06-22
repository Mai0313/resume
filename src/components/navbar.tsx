import { useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
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

interface PillRect {
  left: number;
  top: number;
  width: number;
  height: number;
  visible: boolean;
  animate: boolean;
}

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

export const Navbar = () => {
  const isScrolled = useSyncExternalStore(subscribeToScroll, isPageScrolled);
  const { resolvedTheme, setTheme } = useTheme("dark");
  const location = useLocation();
  const listRef = useRef<HTMLDivElement>(null);
  const [pill, setPill] = useState<PillRect>({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    visible: false,
    animate: false,
  });

  const isDark = resolvedTheme !== "light";

  // Slide the active-tab pill by measuring the active link. Replaces the former
  // framer-motion shared-layout (layoutId) animation.
  useLayoutEffect(() => {
    const list = listRef.current;

    if (!list) return;

    const measure = () => {
      const activeIndex = tabs.findIndex((t) => t.href === location.pathname);
      const links = list.querySelectorAll("a");
      const active = activeIndex >= 0 ? links[activeIndex] : null;

      setPill((prev) =>
        active
          ? {
              left: active.offsetLeft,
              top: active.offsetTop,
              width: active.offsetWidth,
              height: active.offsetHeight,
              visible: true,
              // Skip the slide on first reveal; only animate later moves.
              animate: prev.visible,
            }
          : { ...prev, visible: false },
      );
    };

    measure();
    window.addEventListener("resize", measure);

    return () => window.removeEventListener("resize", measure);
  }, [location.pathname]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-5">
      <nav
        className={cn(
          "pointer-events-auto flex items-center gap-1 rounded-full border border-border bg-surface/70 backdrop-blur-xl transition-[box-shadow,padding] duration-300",
          isScrolled ? "py-1 shadow-lg" : "py-1.5 shadow-none",
        )}
      >
        <div ref={listRef} className="relative flex items-center gap-0.5 pl-1">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute rounded-full bg-default"
            style={{
              left: pill.left,
              top: pill.top,
              width: pill.width,
              height: pill.height,
              opacity: pill.visible ? 1 : 0,
              transition: pill.animate
                ? `left 300ms ${EASE}, width 300ms ${EASE}, opacity 150ms ease`
                : "opacity 150ms ease",
            }}
          />
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.href;

            return (
              <Link
                key={tab.href}
                className={cn(
                  "relative z-10 rounded-full px-3 py-1.5 text-sm font-medium tracking-tight transition-colors",
                  isActive
                    ? "text-foreground"
                    : "text-muted hover:text-foreground",
                )}
                to={tab.href}
              >
                {tab.label}
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
      </nav>
    </header>
  );
};
