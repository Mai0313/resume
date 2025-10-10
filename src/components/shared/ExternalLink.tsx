import type { FC, ReactNode } from "react";

import { Link } from "@heroui/link";

import { ExternalLinkIcon } from "./IconLibrary";

interface ExternalLinkProps {
  url?: string;
  children: ReactNode;
  className?: string;
  showIcon?: boolean;
}

/**
 * Conditional external link component
 * Renders as a link if URL is provided, otherwise renders as plain text
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
    <Link
      isExternal
      className={`hover:opacity-80 flex items-center gap-2 ${className}`}
      href={url}
    >
      {children}
      {showIcon && <ExternalLinkIcon className="w-4 h-4" />}
    </Link>
  );
};
