import type { FC, ReactNode } from "react";

type BadgeSize = "sm" | "md" | "lg";

interface IconBadgeProps {
  icon: ReactNode;
  gradientFrom: string;
  gradientTo: string;
  size?: BadgeSize;
  className?: string;
}

const sizeClasses: Record<BadgeSize, string> = {
  sm: "w-8 h-8",
  md: "w-12 h-12",
  lg: "w-16 h-16",
};

/**
 * Colored badge with gradient background for displaying icons
 * Used in resume item cards for visual hierarchy
 */
export const IconBadge: FC<IconBadgeProps> = ({
  icon,
  gradientFrom,
  gradientTo,
  size = "md",
  className = "",
}) => (
  <div
    className={`${sizeClasses[size]} bg-gradient-to-br from-${gradientFrom} to-${gradientTo} rounded-lg flex items-center justify-center flex-shrink-0 ${className}`}
  >
    {icon}
  </div>
);
