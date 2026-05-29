import type { Variants } from "framer-motion";
import type {
  BulletEntry,
  EducationEntry,
  Entry,
  ExperienceEntry,
  NormalEntry,
  OneLineEntry,
  PublicationEntry,
} from "@/utils/resume";

import { BulletSection } from "./BulletSection";
import { EducationSection } from "./EducationSection";
import { ExperienceSection } from "./ExperienceSection";
import { NormalSection } from "./NormalSection";
import { OneLineSection } from "./OneLineSection";
import { PublicationSection } from "./PublicationSection";
import { TextSection } from "./TextSection";

import { detectEntryType } from "@/utils/resume";

interface ResumeSectionRendererProps {
  entries: Entry[] | undefined;
  itemVariants: Variants;
  sectionName: string;
}

export function ResumeSectionRenderer({
  entries,
  itemVariants,
  sectionName,
}: ResumeSectionRendererProps) {
  if (!entries || entries.length === 0) {
    return null;
  }

  const kind = detectEntryType(entries);

  switch (kind) {
    case "experience":
      return (
        <ExperienceSection
          entries={entries as ExperienceEntry[]}
          itemVariants={itemVariants}
          sectionName={sectionName}
        />
      );
    case "education":
      return (
        <EducationSection
          entries={entries as EducationEntry[]}
          itemVariants={itemVariants}
          sectionName={sectionName}
        />
      );
    case "publication":
      return (
        <PublicationSection
          entries={entries as PublicationEntry[]}
          itemVariants={itemVariants}
          sectionName={sectionName}
        />
      );
    case "normal":
      return (
        <NormalSection
          entries={entries as NormalEntry[]}
          itemVariants={itemVariants}
          sectionName={sectionName}
        />
      );
    case "oneline":
      return (
        <OneLineSection
          entries={entries as OneLineEntry[]}
          itemVariants={itemVariants}
          sectionName={sectionName}
        />
      );
    case "bullet":
      return (
        <BulletSection
          entries={entries as BulletEntry[]}
          itemVariants={itemVariants}
          sectionName={sectionName}
        />
      );
    case "text":
      return (
        <TextSection
          entries={entries as string[]}
          itemVariants={itemVariants}
          sectionName={sectionName}
        />
      );
    default:
      return null;
  }
}
