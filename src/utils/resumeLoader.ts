import { envHelpers } from "@/utils/env";

// Dynamically import js-yaml to reduce initial bundle size
let yamlModule: typeof import("js-yaml") | null = null;

async function getYaml() {
  if (!yamlModule) {
    yamlModule = await import("js-yaml");
  }

  return yamlModule;
}

// Reactive Resume Schema interfaces
export interface Website {
  url: string;
  label: string;
}

export interface CustomField {
  id: string;
  icon: string;
  text: string;
  link: string;
}

export interface ResumeBasics {
  name: string;
  headline: string;
  email: string;
  phone: string;
  location: string;
  website: Website;
  customFields: CustomField[];
}

export interface Picture {
  hidden: boolean;
  url: string;
  size: number;
  rotation: number;
  aspectRatio: number;
  borderRadius: number;
  borderColor: string;
  borderWidth: number;
  shadowColor: string;
  shadowWidth: number;
}

export interface Summary {
  title: string;
  columns: number;
  hidden: boolean;
  content: string;
}

export interface SectionItemOptions {
  showLinkInTitle: boolean;
}

export interface BaseItem {
  id: string;
  hidden: boolean;
  options?: SectionItemOptions;
}

export interface ProfileItem extends BaseItem {
  icon: string;
  network: string;
  username: string;
  website: Website;
}

export interface ExperienceItem extends BaseItem {
  company: string;
  position: string;
  location: string;
  period: string;
  website: Website;
  description: string;
}

export interface EducationItem extends BaseItem {
  school: string;
  degree: string;
  area: string;
  grade: string;
  location: string;
  period: string;
  website: Website;
  description: string;
}

export interface ProjectItem extends BaseItem {
  name: string;
  period: string;
  website: Website;
  description: string;
}

export interface SkillItem extends BaseItem {
  icon: string;
  name: string;
  proficiency: string;
  level: number;
  keywords: string[];
}

export interface LanguageItem extends BaseItem {
  language: string;
  fluency: string;
  level: number;
}

export interface InterestItem extends BaseItem {
  icon: string;
  name: string;
  keywords: string[];
}

export interface AwardItem extends BaseItem {
  title: string;
  awarder: string;
  date: string;
  website: Website;
  description: string;
}

export interface CertificateItem extends BaseItem {
  title: string;
  issuer: string;
  date: string;
  website: Website;
  description: string;
}

export interface PublicationItem extends BaseItem {
  title: string;
  publisher: string;
  date: string;
  website: Website;
  description: string;
}

export interface ReferenceItem extends BaseItem {
  name: string;
  position: string;
  company: string;
  email: string;
  phone: string;
  website: Website;
  description: string;
}

export interface Section<T> {
  title: string;
  columns: number;
  hidden: boolean;
  items: T[];
}

export interface Sections {
  profiles?: Section<ProfileItem>;
  experience?: Section<ExperienceItem>;
  education?: Section<EducationItem>;
  projects?: Section<ProjectItem>;
  skills?: Section<SkillItem>;
  languages?: Section<LanguageItem>;
  interests?: Section<InterestItem>;
  awards?: Section<AwardItem>;
  certificates?: Section<CertificateItem>;
  publications?: Section<PublicationItem>;
  references?: Section<ReferenceItem>;
  [key: string]: Section<any> | undefined;
}

// Main Reactive Resume interface
export interface ResumeData {
  picture?: Picture;
  basics: ResumeBasics;
  summary?: Summary;
  sections: Sections;
}

// Legacy interfaces for backward compatibility during migration
export interface JSONResumeWork extends ExperienceItem {
  name?: string;
}
export interface JSONResumeEducation extends EducationItem {
  institution?: string;
  studyType?: string;
  startDate?: string;
  endDate?: string;
  score?: string;
  summary?: string;
  courses?: string[];
  url?: string;
}
export interface JSONResumeSkill extends SkillItem {}
export interface JSONResumeLanguage extends LanguageItem {}
export interface JSONResumeInterest extends InterestItem {}
export interface JSONResumeProject extends ProjectItem {}
export interface JSONResumeAward extends AwardItem {}
export interface JSONResumeCertificate extends CertificateItem {}
export interface JSONResumePublication extends PublicationItem {}
export interface JSONResumeReference extends ReferenceItem {}
export interface JSONResumeVolunteer extends BaseItem {
  organization: string;
  position: string;
  url?: string;
  startDate?: string;
  endDate?: string;
  summary?: string;
  highlights?: string[];
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

    const yaml = await getYaml();
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

    if (!data.sections || typeof data.sections !== "object") {
      throw new Error(
        "Invalid resume format: missing or invalid 'sections' object",
      );
    }

    // Extract section order from sections object
    // YAML parsers preserve key order, so Object.keys will return them in order
    const sectionOrder = Object.keys(data.sections);

    return { ...data, sectionOrder };
  } catch (error) {
    // Re-throw error for upper layer handling
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Unknown error occurred while loading resume data");
  }
}
