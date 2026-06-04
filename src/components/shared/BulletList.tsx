import type { FC } from "react";

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
        <li key={index} className="text-sm leading-relaxed text-muted">
          {item}
        </li>
      ))}
    </ul>
  );
};
