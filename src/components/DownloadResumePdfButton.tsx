import React, { useState } from "react";
import { Button } from "@heroui/button";

import type { ResumeData } from "@/utils/resumeLoader";
import { downloadResumePdf } from "@/utils/resumePdf";

interface DownloadResumePdfButtonProps {
  data: ResumeData & { sectionOrder: string[] };
  className?: string;
}

export const DownloadResumePdfButton: React.FC<DownloadResumePdfButtonProps> = ({
  data,
  className,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    try {
      setIsGenerating(true);
      await downloadResumePdf(data);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button
      className={className}
      color="primary"
      isLoading={isGenerating}
      startContent={
        !isGenerating ? (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
        ) : undefined
      }
      onPress={handleDownload}
    >
      {isGenerating ? "Generating..." : "Download PDF"}
    </Button>
  );
};

export default DownloadResumePdfButton;

