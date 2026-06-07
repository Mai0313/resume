import type { FC } from "react";
import type { Variants } from "framer-motion";
import type { PublicationEntry } from "@/utils/resume";

import { Fragment } from "react";
import { Link, Typography } from "@heroui/react";

import { SectionCard, getSectionConfig } from "./SectionCard";

import { ItemCard, ExternalLink, SummaryText } from "@/components/shared";
import { formatList } from "@/lib/utils";

interface PublicationSectionProps {
  entries: PublicationEntry[] | undefined;
  sectionName: string;
  sectionIndex: number;
  itemVariants: Variants;
}

export const PublicationSection: FC<PublicationSectionProps> = ({
  entries,
  sectionName,
  sectionIndex,
  itemVariants,
}) => {
  const { displayTitle } = getSectionConfig(sectionName);

  return (
    <SectionCard
      index={sectionIndex}
      itemVariants={itemVariants}
      title={displayTitle}
    >
      <div className="space-y-3">
        {entries?.map((pub, index) => {
          const url =
            pub.url ?? (pub.doi ? `https://doi.org/${pub.doi}` : undefined);
          const meta = formatList([pub.journal, pub.date]);

          return (
            <ItemCard key={`${sectionName}-${pub.title || "unknown"}-${index}`}>
              <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-4 md:grid-cols-[auto_minmax(0,1fr)_auto] md:gap-6">
                <Typography
                  className="rounded-full border border-border/70 bg-default/65 px-2.5 py-1 font-mono text-[11px] font-medium leading-4 text-muted"
                  type="body-xs"
                >
                  {String(index + 1).padStart(2, "0")}
                </Typography>
                <div>
                  <Typography.Heading
                    className="text-xl font-semibold leading-snug tracking-normal text-foreground"
                    level={3}
                  >
                    <ExternalLink
                      className="text-foreground"
                      showIcon={false}
                      url={url}
                    >
                      {pub.title}
                    </ExternalLink>
                  </Typography.Heading>
                  {meta && (
                    <Typography
                      className="mt-2 font-mono text-[11px] font-medium uppercase leading-4 tracking-[0.08em] text-muted"
                      type="body-xs"
                    >
                      {meta}
                    </Typography>
                  )}
                  {pub.authors && pub.authors.length > 0 && (
                    <Typography
                      className="mt-3 text-sm leading-6 text-muted"
                      type="body-sm"
                    >
                      {pub.authors.map((author, i) => {
                        const bold = author.match(/^\*\*(.+)\*\*$/);

                        return (
                          <Fragment key={i}>
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
                          </Fragment>
                        );
                      })}
                    </Typography>
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
                    className="mt-1 hidden rounded-full border border-border/70 bg-default/65 p-2 text-foreground transition-[background-color,border-color,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 hover:border-accent/40 hover:bg-default md:inline-flex"
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
