import React from "react";
import { Variants } from "framer-motion";
import { Link } from "@heroui/react";

import { SectionCard, getSectionConfig } from "./SectionCard";

import { ItemCard, ExternalLink, SummaryText } from "@/components/shared";
import { PublicationEntry } from "@/utils/resume";
import { formatList } from "@/lib/utils";

interface PublicationSectionProps {
  entries: PublicationEntry[] | undefined;
  sectionName: string;
  itemVariants: Variants;
}

export const PublicationSection: React.FC<PublicationSectionProps> = ({
  entries,
  sectionName,
  itemVariants,
}) => {
  const { displayTitle } = getSectionConfig(sectionName);

  return (
    <SectionCard itemVariants={itemVariants} title={displayTitle}>
      <div className="divide-y divide-border">
        {entries?.map((pub, index) => {
          const url =
            pub.url ?? (pub.doi ? `https://doi.org/${pub.doi}` : undefined);
          const meta = formatList([pub.journal, pub.date]);

          return (
            <ItemCard key={`${sectionName}-${pub.title || "unknown"}-${index}`}>
              <div className="grid grid-cols-[auto_1fr_auto] items-baseline gap-4 md:gap-6">
                <span className="font-mono text-xs text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-lg font-semibold leading-snug text-foreground">
                    <ExternalLink
                      className="text-foreground"
                      showIcon={false}
                      url={url}
                    >
                      {pub.title}
                    </ExternalLink>
                  </h3>
                  {meta && (
                    <div className="mt-2 text-xs text-muted">{meta}</div>
                  )}
                  {pub.authors && pub.authors.length > 0 && (
                    <p className="mt-3 text-sm text-muted">
                      {pub.authors.map((author, i) => {
                        const bold = author.match(/^\*\*(.+)\*\*$/);

                        return (
                          <React.Fragment key={i}>
                            {i > 0 && (
                              <span className="text-muted/60"> · </span>
                            )}
                            {bold ? (
                              <span className="font-medium text-foreground">
                                {bold[1]}
                              </span>
                            ) : (
                              author
                            )}
                          </React.Fragment>
                        );
                      })}
                    </p>
                  )}
                  <SummaryText className="mt-4" text={pub.summary} />
                </div>
                {url && (
                  <Link
                    aria-label={
                      pub.title
                        ? `Open publication: ${pub.title}`
                        : "Open publication"
                    }
                    className="mt-1"
                    href={url}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Link.Icon />
                  </Link>
                )}
              </div>
            </ItemCard>
          );
        })}
      </div>
    </SectionCard>
  );
};
