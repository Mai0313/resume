import yaml from "js-yaml";

import { envHelpers } from "@/utils/env";

// JSON Resume Schema interfaces
export interface JSONResumeBasics {
  name: string;
  label?: string;
  image?: string;
  email?: string;
  phone?: string;
  url?: string;
  summary?: string;
  location?: {
    address?: string;
    postalCode?: string;
    city?: string;
    countryCode?: string;
    region?: string;
  };
  profiles?: Array<{
    network: string;
    username: string;
    url: string;
  }>;
}

export interface JSONResumeWork {
  name: string;
  position: string;
  url?: string;
  location?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  summary?: string;
  highlights?: string[];
}

export interface JSONResumeVolunteer {
  organization: string;
  position: string;
  url?: string;
  startDate?: string;
  endDate?: string;
  summary?: string;
  highlights?: string[];
}

export interface JSONResumeEducation {
  institution: string;
  url?: string;
  area?: string;
  studyType?: string;
  startDate?: string;
  endDate?: string;
  gpa?: string;
  score?: string;
  summary?: string;
  courses?: string[];
}

export interface JSONResumeAward {
  title: string;
  date?: string;
  awarder: string;
  summary?: string;
  url?: string;
}

export interface JSONResumePublication {
  name: string;
  publisher: string;
  releaseDate?: string;
  url?: string;
  summary?: string;
}

export interface JSONResumeSkill {
  name: string;
  level?: string;
  keywords?: string[];
}

export interface JSONResumeLanguage {
  language: string;
  fluency: string;
}

export interface JSONResumeInterest {
  name: string;
  keywords?: string[];
}

export interface JSONResumeReference {
  name: string;
  reference: string;
  title?: string;
  company?: string;
  email?: string;
}

export interface JSONResumeCertificate {
  name: string;
  date?: string;
  issuer?: string;
  url?: string;
}

export interface JSONResumeProject {
  name: string;
  description?: string;
  highlights?: string[];
  keywords?: string[];
  startDate?: string;
  endDate?: string;
  url?: string;
  roles?: string[];
  entity?: string;
  type?: string;
}

// Main JSON Resume interface
export interface ResumeData {
  basics: JSONResumeBasics;
  work?: JSONResumeWork[];
  volunteer?: JSONResumeVolunteer[];
  education?: JSONResumeEducation[];
  awards?: JSONResumeAward[];
  certificates?: JSONResumeCertificate[];
  publications?: JSONResumePublication[];
  skills?: JSONResumeSkill[];
  languages?: JSONResumeLanguage[];
  interests?: JSONResumeInterest[];
  references?: JSONResumeReference[];
  projects?: JSONResumeProject[];
}

/**
 * Check if a string is a valid URL
 */
function isURL(str: string): boolean {
  try {
    new URL(str);

    return true;
  } catch {
    return false;
  }
}

/**
 * Convert GitHub Gist URL to raw URL
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

    // If already a raw URL, return as is
    if (filename) {
      return url;
    }

    // Convert to raw URL - for the first file in the gist
    return `https://gist.githubusercontent.com/${username}/${gistId}/raw`;
  }

  return url;
}

/**
 * Get resume file path or URL
 * Supports both local files and remote URLs (including GitHub Gist)
 */
function getResumeSource(): string {
  const resumeFile = envHelpers.getResumeFilePath();

  // If it's a URL, return it directly (with Gist conversion if needed)
  if (isURL(resumeFile)) {
    return convertGistToRawURL(resumeFile);
  }

  // If it's a local file, ensure it starts with /
  return resumeFile.startsWith("/") ? resumeFile : `/${resumeFile}`;
}

export async function loadResumeData(): Promise<
  ResumeData & { sectionOrder: string[] }
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

    // Ensure YAML content is not empty
    if (!yamlText.trim()) {
      throw new Error("Resume file is empty");
    }

    const data = yaml.load(yamlText) as ResumeData;

    // Validate parsed data structure
    if (!data || typeof data !== "object") {
      throw new Error("Invalid YAML format: data is not an object");
    }

    if (!data.basics || typeof data.basics !== "object") {
      throw new Error(
        "Invalid resume format: missing or invalid 'basics' section",
      );
    }

    if (!data.basics.name) {
      throw new Error(
        "Invalid resume format: missing 'name' in basics section",
      );
    }

    // Extract key order from original YAML
    const sectionOrder = extractSectionOrder(yamlText);

    return { ...data, sectionOrder };
  } catch (error) {
    // Re-throw error for upper layer handling
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Unknown error occurred while loading resume data");
  }
}

/**
 * Extract top-level key order from YAML text
 * This way the original section order can be maintained
 */
function extractSectionOrder(yamlText: string): string[] {
  const lines = yamlText.split("\n");
  const sectionOrder: string[] = [];

  for (const line of lines) {
    // Match top-level key-value pairs (lines not starting with space or # and containing colon)
    const match = line.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*:/);

    if (match) {
      const sectionName = match[1];

      // Only add valid sections other than basics, because basics is always at the front
      if (sectionName !== "basics" && !sectionOrder.includes(sectionName)) {
        sectionOrder.push(sectionName);
      }
    }
  }

  return sectionOrder;
}
