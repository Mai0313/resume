import type { FC, ReactNode } from "react";

import { DateRange } from "./DateRange";
import { ExternalLink } from "./ExternalLink";

import { cn } from "@/lib/utils";

interface EntryHeaderProps {
  title: ReactNode;
  url?: string;
  subtitle?: ReactNode;
  startDate?: string;
  endDate?: string;
  rightMeta?: ReactNode;
  className?: string;
}

/**
 * Shared header row for Experience/Education-style entries:
 * a linked title with optional subtitle on the left, and a
 * date range with optional meta (location, grade) on the right.
 */
export const EntryHeader: FC<EntryHeaderProps> = ({
  title,
  url,
  subtitle,
  startDate,
  endDate,
  rightMeta,
  className = "mb-5",
}) => (
  <div
    className={cn(
      "flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-6",
      className,
    )}
  >
    <div className="flex-1">
      <h3 className="text-lg font-semibold text-foreground">
        <ExternalLink className="text-foreground" showIcon={false} url={url}>
          {title}
        </ExternalLink>
      </h3>
      {subtitle && <p className="mt-0.5 text-sm text-muted">{subtitle}</p>}
    </div>
    <div className="flex shrink-0 flex-col items-start md:items-end">
      <DateRange endDate={endDate} startDate={startDate} />
      {rightMeta && (
        <span className="mt-1 text-xs text-muted">{rightMeta}</span>
      )}
    </div>
  </div>
);
