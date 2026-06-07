import type { FC, ReactNode } from "react";

import { Link } from "@heroui/react";

interface ExternalLinkProps {
  url?: string;
  children: ReactNode;
  className?: string;
  showIcon?: boolean;
}

/**
 * External link built on the HeroUI Link component.
 * Renders as plain text when no URL is provided.
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
      className={className}
      href={url}
      rel="noopener noreferrer"
      target="_blank"
    >
      {children}
      {showIcon && (
        <Link.Icon className="transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      )}
    </Link>
  );
};
