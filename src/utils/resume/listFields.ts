import type { RenderCVData } from "./types";

const LIST_FIELDS = ["keywords", "roles", "courses"] as const;

/**
 * Normalize a field that may arrive as a comma-separated string or as an array.
 * Missing or unsupported values return undefined so callers can delete them.
 */
export function normalizeListField(value: unknown): string[] | undefined {
  if (value == null) {
    return undefined;
  }

  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return undefined;
}

/**
 * Normalize list-valued custom fields on CV entries. Mutates entries in place.
 * rendercv can only consume scalar custom fields in its template engine, so the
 * YAML stores these as comma-separated strings and the web UI upgrades them.
 */
export function normalizeEntries(data: RenderCVData): void {
  const sections = data.cv?.sections;

  if (!sections || typeof sections !== "object") {
    return;
  }

  for (const entries of Object.values(sections)) {
    if (!Array.isArray(entries)) {
      continue;
    }

    for (const entry of entries) {
      if (entry == null || typeof entry !== "object") {
        continue;
      }

      const mutable = entry as unknown as Record<string, unknown>;

      for (const field of LIST_FIELDS) {
        if (field in mutable) {
          const normalized = normalizeListField(mutable[field]);

          if (normalized && normalized.length > 0) {
            mutable[field] = normalized;
          } else {
            delete mutable[field];
          }
        }
      }
    }
  }
}
