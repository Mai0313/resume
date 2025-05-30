import yaml from "js-yaml";

export interface ResumeData {
  personal: {
    name: string;
    email: string;
    linkedin: { text: string; url: string };
    github: { text: string; url: string };
    languages: Array<{ name: string; level: string }>;
  };
  education: Array<{
    institution: string;
    degree: string;
    date: string;
    description: string[];
  }>;
  research: Array<{
    title: string;
    subtitle: string;
    conference: string;
    url?: string;
    description: string;
  }>;
  experience: Array<{
    company: string;
    location: string;
    position: string;
    period: string;
    achievements: Array<{
      category: string;
      items: string[];
    }>;
  }>;
  skills: Array<{
    category: string;
    items: string[];
  }>;
  awards: Array<{
    title: string;
    venue: string;
    url?: string;
    role: string;
  }>;
  community: Array<{
    category: string;
    items: string[];
  }>;
  interests: Array<{
    title: string;
    description: string;
  }>;
}

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
