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
    <div className={className}>
      <ul className="space-y-2.5">
        {items.map((item, index) => (
          <li
            key={index}
            className={cn(
              "grid grid-cols-[auto_1fr] items-start gap-3",
              "text-[14.5px] leading-[1.6] text-fg-muted",
            )}
          >
            <span
              aria-hidden="true"
              className="label-mono mt-[0.55rem] text-fg-subtle"
            >
              &mdash;
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
