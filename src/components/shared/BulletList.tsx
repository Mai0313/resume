import type { FC } from "react";

import { Typography } from "@heroui/react";

import { cn } from "@/lib/utils";

interface BulletListProps {
  items: string[];
  className?: string;
}

export const BulletList: FC<BulletListProps> = ({ items, className = "" }) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <ul
      className={cn("list-disc space-y-2 pl-5 marker:text-muted/60", className)}
    >
      {items.map((item, index) => (
        // text-sm on the <li> keeps the ::marker sized to the body text.
        <li key={index} className="text-sm leading-relaxed text-muted">
          <Typography
            className="text-sm leading-relaxed text-muted"
            type="body-sm"
          >
            {item}
          </Typography>
        </li>
      ))}
    </ul>
  );
};
