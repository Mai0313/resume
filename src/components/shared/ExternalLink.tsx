import type { FC, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface ExternalLinkProps {
  url?: string;
  children: ReactNode;
  className?: string;
  showIcon?: boolean;
}

const ArrowUpRight = () => (
  <svg
    aria-hidden="true"
    fill="none"
    height="14"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    width="14"
  >
    <path d="M7 17L17 7M7 7h10v10" />
  </svg>
);

/**
 * External link, renders as plain text when no URL is provided.
 * Uses link-underline hover animation.
 */
export const ExternalLink: FC<ExternalLinkProps> = ({
  url,
  children,
  className = "",
  showIcon = true,
}) => {
  if (!url) {
    return <>{children}</>;
  }

  return (
    <a
      className={cn(
        "group inline-flex items-center gap-1.5 text-fg transition-opacity hover:opacity-80",
        className,
      )}
      href={url}
      rel="noopener noreferrer"
      target="_blank"
    >
      <span className="link-underline">{children}</span>
      {showIcon && (
        <span className="text-fg-muted transition-colors group-hover:text-fg">
          <ArrowUpRight />
        </span>
      )}
    </a>
  );
};
