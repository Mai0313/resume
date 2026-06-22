import type { FC } from "react";

import { Typography } from "@heroui/react";

import { SectionCard, getSectionConfig } from "./SectionCard";

interface TextSectionProps {
  entries: string[] | undefined;
  sectionName: string;
}

export const TextSection: FC<TextSectionProps> = ({ entries, sectionName }) => {
  const { displayTitle } = getSectionConfig(sectionName);

  return (
    <SectionCard title={displayTitle}>
      <div className="max-w-3xl space-y-4">
        {entries?.map((text, index) => (
          <Typography
            key={`${sectionName}-text-${index}`}
            className="text-sm leading-relaxed text-muted"
            type="body-sm"
          >
            {text}
          </Typography>
        ))}
      </div>
    </SectionCard>
  );
};
