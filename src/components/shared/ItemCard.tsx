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
      "group -mx-4 rounded-lg px-4 py-6 transition-colors duration-200 hover:bg-default/30",
      className,
    )}
  >
    {children}
  </div>
);
