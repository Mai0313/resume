import type { FC, ReactNode } from "react";

import { Typography } from "@heroui/react";

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
      "flex flex-col gap-3 md:flex-row md:items-start md:justify-between md:gap-6",
      className,
    )}
  >
    <div className="flex-1">
      <Typography.Heading
        className="text-xl font-semibold leading-snug tracking-normal text-foreground"
        level={3}
      >
        <ExternalLink
          className="text-foreground no-underline decoration-accent/50 underline-offset-4 hover:underline"
          showIcon={false}
          url={url}
        >
          {title}
        </ExternalLink>
      </Typography.Heading>
      {subtitle && (
        <Typography
          className="mt-1 text-sm font-medium leading-6 text-muted"
          type="body-sm"
        >
          {subtitle}
        </Typography>
      )}
    </div>
    <div className="flex shrink-0 flex-col items-start gap-1 md:items-end">
      <DateRange
        className="rounded-full border border-border/70 bg-default/65 px-2.5 py-1"
        endDate={endDate}
        startDate={startDate}
      />
      {rightMeta && (
        <Typography className="text-xs leading-5 text-muted" type="body-xs">
          {rightMeta}
        </Typography>
      )}
    </div>
  </div>
);
