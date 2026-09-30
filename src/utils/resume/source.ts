import { envHelpers } from "@/utils/env";
import { buildPath } from "@/utils/pathUtils";

function isUrl(value: string): boolean {
  try {
    new URL(value);

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
function convertGistToRawUrl(url: string): string {
  const gistMatch = url.match(
    /https:\/\/gist\.github\.com\/([^/]+)\/([a-f0-9]+)(?:\/raw\/(.+))?/,
  );

  if (!gistMatch) {
    return url;
  }

  const [, username, gistId, filename] = gistMatch;

  if (filename) {
    return url;
  }

  return `https://gist.githubusercontent.com/${username}/${gistId}/raw`;
}

export function getResumeSource(): string {
  const resumeFile = envHelpers.getResumeFilePath();

  if (isUrl(resumeFile)) {
    return convertGistToRawUrl(resumeFile);
  }

  // Local files live under Vite `base` so GitHub Pages subpath deploys resolve.
  return buildPath(resumeFile);
}
