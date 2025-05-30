import yaml from "js-yaml";

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
export interface JSONResumeData {
  basics: JSONResumeBasics;
  work?: JSONResumeWork[];
  volunteer?: JSONResumeVolunteer[];
  education?: JSONResumeEducation[];
  awards?: JSONResumeAward[];
  publications?: JSONResumePublication[];
  skills?: JSONResumeSkill[];
  languages?: JSONResumeLanguage[];
  interests?: JSONResumeInterest[];
  references?: JSONResumeReference[];
  projects?: JSONResumeProject[];
}

// Type alias for backward compatibility
export type ResumeData = JSONResumeData;

export async function loadResumeData(): Promise<ResumeData> {
  try {
    const response = await fetch("/resume.yaml");
    const yamlText = await response.text();
    const data = yaml.load(yamlText) as ResumeData;

    return data;
  } catch (error) {
    console.error("Error loading resume data:", error);
    throw error;
  }
}
