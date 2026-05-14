import type { LoadedResumeData, RenderCVData } from "./types";

import { normalizeEntries } from "./listFields";
import { getResumeSource } from "./source";

let yamlModule: typeof import("js-yaml") | null = null;

async function getYaml() {
  if (!yamlModule) {
    yamlModule = await import("js-yaml");
  }

  return yamlModule;
}

function assertResumeData(data: unknown): asserts data is RenderCVData {
  if (!data || typeof data !== "object") {
    throw new Error("Invalid YAML format: data is not an object");
  }

  const candidate = data as Partial<RenderCVData>;

  if (!candidate.cv || typeof candidate.cv !== "object") {
    throw new Error("Invalid resume format: missing or invalid 'cv' section");
  }

  if (!candidate.cv.name) {
    throw new Error("Invalid resume format: missing 'name' in cv section");
  }

  if (!candidate.cv.sections || typeof candidate.cv.sections !== "object") {
    throw new Error("Invalid resume format: missing or invalid 'cv.sections'");
  }
}

export async function loadResumeData(): Promise<LoadedResumeData> {
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
    const data = yaml.load(yamlText);

    assertResumeData(data);
    normalizeEntries(data);

    // YAML parsers preserve key order, so Object.keys follows source order.
    const sectionOrder = Object.keys(data.cv.sections);

    return { ...data, sectionOrder };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    throw new Error("Unknown error occurred while loading resume data");
  }
}
