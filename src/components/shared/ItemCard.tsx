import type { FC, ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Reusable entry container for resume items.
 * A divided-list row with a subtle hover surface.
 */
interface ItemCardProps {
  children: ReactNode;
  className?: string;
}

export const ItemCard: FC<ItemCardProps> = ({ children, className = "" }) => (
  <div
    className={cn(
      "group -mx-6 rounded-xl px-6 py-6 transition-[transform,background-color] duration-200 ease-[var(--ease-out-fluid)] hover:-translate-y-px hover:bg-[var(--glass-hover-bg)] active:translate-y-0 active:scale-[0.995] md:-mx-8 md:px-8",
      className,
    )}
  >
    {children}
  </div>
);
