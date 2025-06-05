import { useState, useEffect } from "react";
import { useTheme } from "@heroui/use-theme";

import FuzzyText from "./FuzzyText";

export function NotFoundPage() {
  const [isMounted, setIsMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const textColor = theme === "dark" ? "#ffffff" : "#000000";

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-2">
      {isMounted && (
        <>
          <FuzzyText
            baseIntensity={0.15}
            color={textColor}
            enableHover={true}
            fontSize="clamp(2rem, 8vw, 8rem)"
            hoverIntensity={0.5}
          >
            404
          </FuzzyText>
          <FuzzyText
            baseIntensity={0.15}
            color={textColor}
            enableHover={true}
            fontSize="clamp(2rem, 4vw, 4rem)"
            hoverIntensity={0.5}
          >
            Not Found
          </FuzzyText>
        </>
      )}
    </div>
  );
}
