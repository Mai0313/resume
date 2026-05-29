import type { Entry, OneLineEntry } from "@/utils/resume";

import { detectEntryType } from "@/utils/resume";

export interface LanguagesSection {
  key: string;
  entries: OneLineEntry[];
}

export function findLanguagesSection(
  sections: Record<string, Entry[]>,
): LanguagesSection | null {
  for (const [key, entries] of Object.entries(sections)) {
    if (key.toLowerCase() !== "languages" || !Array.isArray(entries)) {
      continue;
    }

    if (detectEntryType(entries) === "oneline") {
      return { key, entries: entries as OneLineEntry[] };
    }
  }

  return null;
}
