import React from "react";
import { Variants } from "framer-motion";

import { SectionCard, getSectionConfig } from "./SectionCard";

import { ItemCard, ExternalLink } from "@/components/shared";
import { PublicationEntry } from "@/utils/resumeLoader";

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
    <SectionCard
      data={entries}
      itemVariants={itemVariants}
      sectionKey={sectionName}
      title={displayTitle}
    >
      <div className="divide-y divide-border">
        {entries?.map((pub, index) => {
          const url =
            pub.url ?? (pub.doi ? `https://doi.org/${pub.doi}` : undefined);
          const meta = [pub.journal, pub.date].filter(Boolean).join(" · ");

          return (
            <ItemCard key={`${sectionName}-${pub.title || "unknown"}-${index}`}>
              <div className="grid grid-cols-[auto_1fr_auto] items-baseline gap-4 md:gap-6">
                <span className="label-mono text-fg-subtle">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3
                    className="font-display text-xl leading-snug text-fg md:text-[1.5rem]"
                    style={{ fontVariationSettings: "'opsz' 72, 'SOFT' 50" }}
                  >
                    {url ? (
                      <ExternalLink showIcon={false} url={url}>
                        {pub.title}
                      </ExternalLink>
                    ) : (
                      pub.title
                    )}
                  </h3>
                  {meta && (
                    <div className="label-mono mt-2 text-fg-muted">{meta}</div>
                  )}
                  {pub.authors && pub.authors.length > 0 && (
                    <p className="mt-3 text-[13.5px] text-fg-muted">
                      {pub.authors.map((author, i) => {
                        const bold = author.match(/^\*\*(.+)\*\*$/);

                        return (
                          <React.Fragment key={i}>
                            {i > 0 && (
                              <span className="text-fg-subtle"> · </span>
                            )}
                            {bold ? (
                              <span className="text-fg">{bold[1]}</span>
                            ) : (
                              author
                            )}
                          </React.Fragment>
                        );
                      })}
                    </p>
                  )}
                  {pub.summary && (
                    <p className="mt-4 max-w-3xl text-[14.5px] leading-[1.65] text-fg-muted">
                      {pub.summary}
                    </p>
                  )}
                </div>
                {url && (
                  <a
                    aria-label={`Open publication: ${pub.title}`}
                    className="mt-1 text-fg-muted transition-colors hover:text-fg"
                    href={url}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <svg
                      fill="none"
                      height="16"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      width="16"
                    >
                      <path d="M7 17L17 7M7 7h10v10" />
                    </svg>
                  </a>
                )}
              </div>
            </ItemCard>
          );
        })}
      </div>
    </SectionCard>
  );
};
