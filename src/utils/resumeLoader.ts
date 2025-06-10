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
export interface JSONResumeData {
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

// Type alias for backward compatibility
export type ResumeData = JSONResumeData;

/**
 * 獲取 resume 文件的路徑
 /**
 * 取得履歷檔案路徑
 * 優先使用環境變數 VITE_RESUME_FILE 指定的路徑
 * 如果未設定，則使用預設的 example.yaml
 */
function getResumeFilePath(): string {
  const customPath = envHelpers.getResumeFilePath();

  return customPath.startsWith("/") ? customPath : `/${customPath}`;
}

export async function loadResumeData(): Promise<
  ResumeData & { sectionOrder: string[] }
> {
  try {
    const resumeFilePath = getResumeFilePath();
    const response = await fetch(resumeFilePath);

    if (!response.ok) {
      throw new Error(
        `Failed to load resume file: ${response.status} ${response.statusText}`,
      );
    }

    const yamlText = await response.text();

    // 確保 YAML 內容不為空
    if (!yamlText.trim()) {
      throw new Error("Resume file is empty");
    }

    const data = yaml.load(yamlText) as ResumeData;

    // 驗證解析後的資料結構
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

    // 從原始 YAML 中提取鍵值順序
    const sectionOrder = extractSectionOrder(yamlText);

    return { ...data, sectionOrder };
  } catch (error) {
    // 重新拋出錯誤以便上層處理
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Unknown error occurred while loading resume data");
  }
}

/**
 * 從 YAML 文字中提取頂層鍵值的順序
 * 這樣可以保持原始的區域順序
 */
function extractSectionOrder(yamlText: string): string[] {
  const lines = yamlText.split("\n");
  const sectionOrder: string[] = [];

  for (const line of lines) {
    // 匹配頂層鍵值 (不以空格或 # 開頭的行，且包含冒號)
    const match = line.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*:/);

    if (match) {
      const sectionName = match[1];

      // 只添加 basics 以外的有效區域，因為 basics 總是在最前面
      if (sectionName !== "basics" && !sectionOrder.includes(sectionName)) {
        sectionOrder.push(sectionName);
      }
    }
  }

  return sectionOrder;
}
