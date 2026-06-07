import type { FC } from "react";

import { Typography } from "@heroui/react";

import { cn } from "@/lib/utils";

interface DateRangeProps {
  startDate?: string;
  endDate?: string;
  className?: string;
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

  if (startDate && endDate) text = `${startDate} - ${endDate}`;
  else if (startDate) text = startDate;
  else if (endDate) text = endDate;

  return (
    <Typography
      className={cn(
        "font-mono text-xs leading-4 tracking-tight text-muted tabular-nums",
        className,
      )}
      type="body-xs"
    >
      {text}
    </Typography>
  );
};
