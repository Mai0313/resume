import type { FC, ReactNode } from "react";

interface ItemCardProps {
  children: ReactNode;
  className?: string;
}

/**
 * Reusable card container for resume items with consistent styling
 * Replaces repeated card styling across all ResumeSections
 */
export const ItemCard: FC<ItemCardProps> = ({ children, className = "" }) => (
  <div
    className={`bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] ${className}`}
  >
    {children}
  </div>
);
