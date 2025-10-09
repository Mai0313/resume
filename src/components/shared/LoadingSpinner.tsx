import React from "react";
import { Spinner } from "@heroui/spinner";

interface LoadingSpinnerProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  minHeight?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = "Loading...",
  size = "lg",
  minHeight = "400px",
}) => {
  return (
    <div className="flex justify-center items-center" style={{ minHeight }}>
      <div className="flex flex-col items-center gap-4">
        <Spinner size={size} />
        {message && (
          <p className="text-gray-600 dark:text-gray-400">{message}</p>
        )}
      </div>
    </div>
  );
};

export default LoadingSpinner;
