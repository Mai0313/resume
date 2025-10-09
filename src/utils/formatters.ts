/**
 * Common formatting utilities
 * Centralized to avoid recreation on every render
 */

/**
 * Format date string to localized format
 */
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

/**
 * Get color for programming language
 */
export const getLanguageColor = (language: string | null): string => {
  const colors: Record<string, string> = {
    "JavaScript": "#f1e05a",
    "TypeScript": "#2b7489",
    "Python": "#3572A5",
    "Java": "#b07219",
    "Go": "#00ADD8",
    "Rust": "#dea584",
    "C++": "#f34b7d",
    "C": "#555555",
    "HTML": "#e34c26",
    "CSS": "#1572B6",
    "Vue": "#4FC08D",
    "React": "#61DAFB",
    "PHP": "#4F5D95",
  };

  return colors[language || ""] || "#666666";
};
