// rendercv YAML schema interfaces
// Reference: https://docs.rendercv.com/user_guide/yaml_input_structure
//
// All entries support arbitrary custom keys. Fields listed after the standard
// rendercv fields are custom fields used by the web UI but ignored by rendercv.

export interface ExperienceEntry {
  company: string;
  position: string;
  location?: string;
  start_date?: string;
  end_date?: string;
  date?: string;
  summary?: string;
  highlights?: string[];
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
  url?: string;
  keywords?: string[];
  roles?: string[];
  entity?: string;
  issuer?: string;
}

export interface OneLineEntry {
  label: string;
  details: string;
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

export type LoadedResumeData = RenderCVData & { sectionOrder: string[] };
