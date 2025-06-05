import { useState, useEffect } from "react";
import { addToast } from "@heroui/toast";

import { loadResumeData, ResumeData } from "../utils/resumeLoader";

export function useResumeData() {
  const [resumeData, setResumeData] = useState<
    (ResumeData & { sectionOrder: string[] }) | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadResume = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await loadResumeData();

      // 驗證資料結構的完整性
      if (!data || !data.basics || !data.basics.name) {
        throw new Error("Resume data is incomplete or missing required fields");
      }

      setResumeData(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to load resume data";

      setError(errorMessage);
      addToast({
        title: "Error",
        description: errorMessage,
        color: "danger",
      });
      setResumeData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadResume();
  }, []);

  return {
    resumeData,
    isLoading,
    error,
    reload: loadResume,
  };
}
