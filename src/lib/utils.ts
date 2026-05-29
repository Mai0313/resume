import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Join a list of values with a separator, skipping empty entries.
 * Centralizes the middle-dot metadata formatting used across resume sections.
 */
export function formatList(
  items: ReadonlyArray<string | null | undefined> | undefined,
  separator = " · ",
): string {
  return (items ?? []).filter(Boolean).join(separator);
}
