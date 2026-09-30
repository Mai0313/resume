import type { Entry, EntryKind } from "./types";

/**
 * Detect the rendercv entry type from the first non-null entry.
 * Empty or unrecognized entries use text rendering as the conservative fallback.
 */
export function detectEntryType(entries: Entry[]): EntryKind {
  const first = entries?.find((entry) => entry != null);

  if (first == null) {
    return "text";
  }

  if (typeof first === "string") {
    return "text";
  }

  if ("company" in first && "position" in first) {
    return "experience";
  }

  if ("institution" in first) {
    return "education";
  }

  if ("title" in first && ("journal" in first || "authors" in first)) {
    return "publication";
  }

  if ("label" in first && "details" in first) {
    return "oneline";
  }

  if ("bullet" in first) {
    return "bullet";
  }

  if ("name" in first) {
    return "normal";
  }

  return "text";
}
