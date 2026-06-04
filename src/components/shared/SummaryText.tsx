import type { FC } from "react";

import { Typography } from "@heroui/react";

import { cn } from "@/lib/utils";

interface SummaryTextProps {
  text?: string;
  className?: string;
}

/**
 * Shared summary paragraph used across resume entry sections.
 * Renders nothing when there is no text. The margin lives in `className`
 * so callers can opt into top vs bottom spacing.
 */
export const SummaryText: FC<SummaryTextProps> = ({
  text,
  className = "mb-5",
}) => {
  if (!text) {
    return null;
  }

  return (
    <Typography
      className={cn("max-w-3xl text-sm leading-relaxed text-muted", className)}
      type="body-sm"
    >
      {text}
    </Typography>
  );
};
