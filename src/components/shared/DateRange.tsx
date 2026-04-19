import type { FC } from "react";

import { cn } from "@/lib/utils";

interface DateRangeProps {
  startDate?: string;
  endDate?: string;
  className?: string;
  /** kept for backward compatibility, ignored — editorial style has no icon */
  showIcon?: boolean;
}

export const DateRange: FC<DateRangeProps> = ({
  startDate,
  endDate,
  className = "",
}) => {
  if (!startDate && !endDate) {
    return null;
  }

  let text = "";

  if (startDate && endDate) text = `${startDate} — ${endDate}`;
  else if (startDate) text = startDate;
  else if (endDate) text = endDate;

  return (
    <span className={cn("label-mono text-fg-muted", className)}>{text}</span>
  );
};
