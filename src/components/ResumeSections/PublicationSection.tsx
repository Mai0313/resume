import type { FC } from "react";
import type { PublicationEntry } from "@/utils/resume";

import { Fragment } from "react";
import { Link, Typography } from "@heroui/react";

import { SectionCard, getSectionConfig } from "./SectionCard";

import { ItemCard, ExternalLink, SummaryText } from "@/components/shared";
import { formatList } from "@/lib/utils";

interface PublicationSectionProps {
  entries: PublicationEntry[] | undefined;
  sectionName: string;
}

export const PublicationSection: FC<PublicationSectionProps> = ({
  entries,
  sectionName,
}) => {
  const { displayTitle } = getSectionConfig(sectionName);

  return (
    <SectionCard title={displayTitle}>
      <div className="divide-y divide-border">
        {entries?.map((pub, index) => {
          const url =
            pub.url ?? (pub.doi ? `https://doi.org/${pub.doi}` : undefined);
          const meta = formatList([pub.journal, pub.date]);

          return (
            <ItemCard key={`${sectionName}-${pub.title || "unknown"}-${index}`}>
              <div className="grid grid-cols-[auto_1fr_auto] items-baseline gap-4 md:gap-6">
                <Typography
                  className="font-mono text-xs leading-4 text-muted tabular-nums"
                  type="body-xs"
                >
                  {String(index + 1).padStart(2, "0")}
                </Typography>
                <div>
                  <Typography.Heading
                    className="text-lg font-semibold leading-snug tracking-normal text-foreground"
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
                      className="mt-2 font-mono text-xs leading-4 text-muted"
                      type="body-xs"
                    >
                      {meta}
                    </Typography>
                  )}
                  {pub.authors && pub.authors.length > 0 && (
                    <Typography
                      className="mt-3 text-sm leading-5 text-muted"
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
