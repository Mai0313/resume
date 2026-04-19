import type { FC, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface ItemCardProps {
  children: ReactNode;
  className?: string;
}

/**
 * Reusable entry container for resume items.
 * Oxide editorial style — no backgrounds, just spacing and hover affordance.
 */
export const ItemCard: FC<ItemCardProps> = ({ children, className = "" }) => (
  <div
    className={cn(
      "group -mx-4 rounded-lg px-4 py-6 transition-colors duration-200 hover:bg-elevated/40",
      className,
    )}
  >
    {children}
  </div>
);
