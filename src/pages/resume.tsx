import { useState, useEffect } from "react";
import { Spinner } from "@heroui/spinner";

import { PinProtection } from "../components/PinProtection";
import { ResumeContent } from "../components/ResumeContent";
import { ResumeErrorDisplay } from "../components/ResumeErrorDisplay";
import { NotFoundPage } from "../components/NotFoundPage";
import { useResumeData } from "../hooks/useResumeData";

import DefaultLayout from "@/layouts/default";

// Read PIN code from .env via VITE_PIN_CODE
const PIN_CODE = import.meta.env.VITE_PIN_CODE;
const IS_PIN_ENABLED = PIN_CODE && PIN_CODE.trim() !== "";

export default function ResumePage() {
  const [authenticated, setAuthenticated] = useState(!IS_PIN_ENABLED);
  const [failCount, setFailCount] = useState(0);
  const { resumeData, isLoading, error } = useResumeData();

  // 監聽認證狀態變化，處理失敗次數
  useEffect(() => {
    if (IS_PIN_ENABLED && !authenticated) {
      const timer = setTimeout(() => {
        setFailCount((prev) => (prev >= 3 ? prev : prev + 1));
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [authenticated]);

  const handleAuthenticated = () => {
    setAuthenticated(true);
    setFailCount(0);
  };

  // 3次錯誤顯示404
  if (IS_PIN_ENABLED && failCount >= 3) {
    return (
      <DefaultLayout>
        <NotFoundPage />
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      {/* PIN 碼保護組件 */}
      <PinProtection
        enabled={Boolean(IS_PIN_ENABLED && !authenticated)}
        pinCode={PIN_CODE}
        onAuthenticated={handleAuthenticated}
      />

      {/* 履歷內容 */}
      {authenticated && (
        <div className="min-h-screen">
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[50vh]">
              <Spinner label="Loading resume..." size="lg" />
            </div>
          ) : error ? (
            <ResumeErrorDisplay error={error} />
          ) : resumeData && resumeData.basics && resumeData.basics.name ? (
            <div className="space-y-6">
              <ResumeContent data={resumeData} />
            </div>
          ) : (
            <ResumeErrorDisplay error="Unable to load resume content. Please check your resume file configuration or try refreshing the page." />
          )}
        </div>
      )}
    </DefaultLayout>
  );
}
