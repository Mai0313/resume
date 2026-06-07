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
    <ul className={cn("space-y-2.5", className)}>
      {items.map((item, index) => (
        <li key={index} className="grid grid-cols-[0.65rem_1fr] gap-3">
          <span className="mt-2 size-1.5 rounded-full bg-accent/75" />
          <Typography className="text-sm leading-7 text-muted" type="body-sm">
            {item}
          </Typography>
        </li>
      ))}
    </ul>
  );
};
