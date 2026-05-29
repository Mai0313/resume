import type { FC } from "react";

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
    <p
      className={cn(
        "max-w-3xl text-[14.5px] leading-[1.65] text-fg-muted",
        className,
      )}
    >
      {text}
    </p>
  );
};
