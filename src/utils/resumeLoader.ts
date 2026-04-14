import { envHelpers } from "@/utils/env";

// Dynamically import js-yaml to reduce initial bundle size
let yamlModule: typeof import("js-yaml") | null = null;

async function getYaml() {
  if (!yamlModule) {
    yamlModule = await import("js-yaml");
  }

  return yamlModule;
}

// ===============================================
// rendercv YAML schema interfaces
// ===============================================
// Reference: https://docs.rendercv.com/user_guide/yaml_input_structure
//
// All entries support arbitrary custom keys. Fields listed after the standard
// rendercv fields (e.g., `url`, `keywords`, `roles`) are custom fields used by
// the web UI but ignored by rendercv when producing PDF output.
//
// IMPORTANT: rendercv's template engine fails on list-valued custom fields
// (it tries to stringify them). So list-like custom fields (`keywords`, `roles`,
// `courses`) are stored in the YAML as comma-separated strings and normalized
// to arrays at load time. See `normalizeListField()` below.

export interface ExperienceEntry {
  company: string;
  position: string;
  location?: string;
  start_date?: string;
  end_date?: string;
  date?: string;
  summary?: string;
  highlights?: string[];
  // Custom fields (web UI only)
  url?: string;
  description?: string;
}

export interface EducationEntry {
  institution: string;
  area: string;
  degree?: string;
  location?: string;
  start_date?: string;
  end_date?: string;
  date?: string;
  summary?: string;
  highlights?: string[];
  grade?: string;
  // Custom fields (web UI only)
  url?: string;
  courses?: string[];
}

export interface PublicationEntry {
  title: string;
  authors: string[];
  journal?: string;
  date?: string;
  doi?: string;
  url?: string;
  summary?: string;
}

export interface NormalEntry {
  name: string;
  location?: string;
  start_date?: string;
  end_date?: string;
  date?: string;
  summary?: string;
  highlights?: string[];
  // Custom fields (web UI only)
  url?: string;
  keywords?: string[];
  roles?: string[];
  entity?: string;
  issuer?: string;
}

export interface OneLineEntry {
  label: string;
  details: string;
  // Custom field (web UI only)
  keywords?: string[];
}

export interface BulletEntry {
  bullet: string;
}

export type TextEntry = string;

export type Entry =
  | ExperienceEntry
  | EducationEntry
  | PublicationEntry
  | NormalEntry
  | OneLineEntry
  | BulletEntry
  | TextEntry;

export type EntryKind =
  | "experience"
  | "education"
  | "publication"
  | "normal"
  | "oneline"
  | "bullet"
  | "text";

export type SocialNetworkName =
  | "LinkedIn"
  | "GitHub"
  | "GitLab"
  | "IMDB"
  | "Instagram"
  | "ORCID"
  | "Mastodon"
  | "StackOverflow"
  | "ResearchGate"
  | "YouTube"
  | "Google Scholar"
  | "Telegram"
  | "WhatsApp"
  | "Leetcode"
  | "X"
  | "Bluesky"
  | "Reddit";

export interface SocialNetwork {
  network: SocialNetworkName;
  username: string;
}

export interface CVData {
  name: string;
  headline?: string;
  location?: string;
  email?: string;
  phone?: string;
  website?: string;
  photo?: string;
  social_networks?: SocialNetwork[];
  sections: Record<string, Entry[]>;
}

export interface RenderCVData {
  cv: CVData;
  design?: Record<string, unknown>;
  locale?: Record<string, unknown>;
  settings?: Record<string, unknown>;
}

// ===============================================
// List field normalization
// ===============================================

/**
 * Normalize a field that may arrive as a comma-separated string or as an
 * array. Returns `undefined` when the value is missing so consumers can use
 * optional chaining.
 */
function normalizeListField(value: unknown): string[] | undefined {
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
 * rendercv can only consume scalar custom fields in its template engine, so
 * the YAML stores these as comma-separated strings; we upgrade them to arrays
 * here for the web UI.
 */
function normalizeEntries(data: RenderCVData): void {
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

      for (const field of ["keywords", "roles", "courses"] as const) {
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

// ===============================================
// Entry type detection
// ===============================================

/**
 * Detect the rendercv entry type from a list of entries.
 * Inspects the first non-null entry to determine which renderer component to use.
 * Returns "text" as a safe fallback for empty or unrecognized entries.
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

  if ("title" in first) {
    // Treat title-only entries as publications (rendercv's minimal PublicationEntry)
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

// ===============================================
// Social network URL construction
// ===============================================

const SOCIAL_NETWORK_URL_TEMPLATES: Record<string, string> = {
  linkedin: "https://www.linkedin.com/in/",
  github: "https://github.com/",
  gitlab: "https://gitlab.com/",
  imdb: "https://www.imdb.com/name/",
  instagram: "https://www.instagram.com/",
  orcid: "https://orcid.org/",
  mastodon: "https://mastodon.social/@",
  stackoverflow: "https://stackoverflow.com/users/",
  researchgate: "https://www.researchgate.net/profile/",
  youtube: "https://www.youtube.com/@",
  googlescholar: "https://scholar.google.com/citations?user=",
  telegram: "https://t.me/",
  whatsapp: "https://wa.me/",
  leetcode: "https://leetcode.com/u/",
  x: "https://x.com/",
  twitter: "https://x.com/",
  bluesky: "https://bsky.app/profile/",
  reddit: "https://www.reddit.com/user/",
};

/**
 * Build a full URL for a social network given its name and a username.
 * Falls back to the raw username when the network is not recognized.
 */
export function buildSocialUrl(network: string, username: string): string {
  const key = network.toLowerCase().replace(/[\s_-]/g, "");
  const base = SOCIAL_NETWORK_URL_TEMPLATES[key];

  if (!base) {
    return username;
  }

  return `${base}${username}`;
}

// ===============================================
// Resume source resolution
// ===============================================

function isURL(str: string): boolean {
  try {
    new URL(str);

    return true;
  } catch {
    return false;
  }
}

/**
 * Convert GitHub Gist URL to raw URL.
 * Supports both:
 * - https://gist.github.com/username/gist_id
 * - https://gist.github.com/username/gist_id/raw/filename.yaml
 */
function convertGistToRawURL(url: string): string {
  const gistMatch = url.match(
    /https:\/\/gist\.github\.com\/([^\/]+)\/([a-f0-9]+)(?:\/raw\/(.+))?/,
  );

  if (gistMatch) {
    const [, username, gistId, filename] = gistMatch;

    if (filename) {
      return url;
    }

    return `https://gist.githubusercontent.com/${username}/${gistId}/raw`;
  }

  return url;
}

function getResumeSource(): string {
  const resumeFile = envHelpers.getResumeFilePath();

  if (isURL(resumeFile)) {
    return convertGistToRawURL(resumeFile);
  }

  return resumeFile.startsWith("/") ? resumeFile : `/${resumeFile}`;
}

// ===============================================
// Loader
// ===============================================

export async function loadResumeData(): Promise<
  RenderCVData & { sectionOrder: string[] }
> {
  try {
    const resumeSource = getResumeSource();
    const response = await fetch(resumeSource);

    if (!response.ok) {
      throw new Error(
        `Failed to load resume data: ${response.status} ${response.statusText}`,
      );
    }

    const yamlText = await response.text();

    if (!yamlText.trim()) {
      throw new Error("Resume file is empty");
    }

    const yaml = await getYaml();
    const data = yaml.load(yamlText) as RenderCVData;

    if (!data || typeof data !== "object") {
      throw new Error("Invalid YAML format: data is not an object");
    }

    if (!data.cv || typeof data.cv !== "object") {
      throw new Error("Invalid resume format: missing or invalid 'cv' section");
    }

    if (!data.cv.name) {
      throw new Error("Invalid resume format: missing 'name' in cv section");
    }

    if (!data.cv.sections || typeof data.cv.sections !== "object") {
      throw new Error(
        "Invalid resume format: missing or invalid 'cv.sections'",
      );
    }

    normalizeEntries(data);

    // YAML parsers preserve key order, so Object.keys returns sections in
    // the order they appear in the source file.
    const sectionOrder = Object.keys(data.cv.sections);

    return { ...data, sectionOrder };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Unknown error occurred while loading resume data");
  }
}
