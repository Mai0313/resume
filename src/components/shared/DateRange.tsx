import type { FC } from "react";

import { CalendarIcon } from "./IconLibrary";

interface DateRangeProps {
  startDate?: string;
  endDate?: string;
  className?: string;
  showIcon?: boolean;
}

/**
 * Display a date range with optional calendar icon
 * Handles "Present" for ongoing items
 */
export const DateRange: FC<DateRangeProps> = ({
  startDate,
  endDate,
  className = "",
  showIcon = true,
}) => {
  if (!startDate && !endDate) {
    return null;
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {showIcon && <CalendarIcon className="w-4 h-4 text-gray-500" />}
      <span className="text-sm text-gray-600 dark:text-gray-400">
        {startDate && endDate && `${startDate} - ${endDate}`}
        {startDate && !endDate && startDate}
        {!startDate && endDate && endDate}
      </span>
    </div>
  );
};
