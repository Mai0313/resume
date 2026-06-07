import type { FC, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface ItemCardProps {
  children: ReactNode;
  className?: string;
}

export const ItemCard: FC<ItemCardProps> = ({ children, className = "" }) => (
  <div
    className={cn(
      "group rounded-2xl border border-border/70 bg-surface/58 p-5 shadow-[0_1px_0_rgba(255,255,255,0.08)_inset] transition-[background-color,border-color,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 hover:border-accent/35 hover:bg-surface/86 sm:p-6",
      className,
    )}
  >
    {children}
  </div>
);
