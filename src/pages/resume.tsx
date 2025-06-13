import { useState, useEffect } from "react";
import { InputOtp } from "@heroui/input-otp";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@heroui/modal";
import { addToast } from "@heroui/toast";
import { motion, useAnimation } from "framer-motion";
import { useTheme } from "@heroui/use-theme";
import { Spinner } from "@heroui/spinner";

import FuzzyText from "../components/FuzzyText/FuzzyText";
import { ProfessionalResumeContent } from "../components/ProfessionalResumeContent";
import { loadResumeData, ResumeData } from "../utils/resumeLoader";
import { Navbar } from "../components/navbar";

import { env, envHelpers } from "@/utils/env";

// Read PIN code from .env via VITE_PIN_CODE
const IS_PIN_ENABLED = envHelpers.isPinEnabled();

export default function ResumePage() {
  const [isMounted, setIsMounted] = useState(false);
  const [renderKey, setRenderKey] = useState(0);
  const [forceRender, setForceRender] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<string>("light");
  const [resumeData, setResumeData] = useState<
    (ResumeData & { sectionOrder: string[] }) | null
  >(null);
  const [isLoadingResume, setIsLoadingResume] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Check if URL parameters contain PIN code
    const urlParams = new URLSearchParams(window.location.search);
    const urlPin = urlParams.get("pin");

    // If PIN code is not set, directly load resume content
    if (!IS_PIN_ENABLED) {
      setAuthenticated(true);
      loadResumeContent();

      return;
    }

    // If URL contains PIN code, check if it's correct
    if (urlPin && urlPin === env.PIN_CODE) {
      setAuthenticated(true);
      loadResumeContent();
      // Remove PIN parameter from URL to protect privacy
      urlParams.delete("pin");
      const newUrl =
        window.location.pathname +
        (urlParams.toString() ? "?" + urlParams.toString() : "");

      window.history.replaceState({}, "", newUrl);
    }
  }, []);

  const [pin, setPin] = useState("");
  const [authenticated, setAuthenticated] = useState(!IS_PIN_ENABLED); // If no PIN code, default to authenticated
  const [failCount, setFailCount] = useState(0);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const controls = useAnimation();
  const { theme } = useTheme();

  // Dual theme change listening
  useEffect(() => {
    setCurrentTheme(theme);
    setRenderKey((prev) => prev + 1);
    setForceRender(false);
    const timer = setTimeout(() => {
      setForceRender(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [theme]);

  // Additional listening for DOM class changes (as backup)
  useEffect(() => {
    const detectThemeChange = () => {
      const isDark =
        document.documentElement.classList.contains("dark") ||
        document.documentElement.getAttribute("data-theme") === "dark";
      const detectedTheme = isDark ? "dark" : "light";

      if (detectedTheme !== currentTheme) {
        setCurrentTheme(detectedTheme);
        setRenderKey((prev) => prev + 1);
        setForceRender(false);
        setTimeout(() => setForceRender(true), 100);
      }
    };

    // Listen for DOM changes
    const observer = new MutationObserver(detectThemeChange);

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });

    // Initial detection
    detectThemeChange();

    return () => observer.disconnect();
  }, [currentTheme]);

  useEffect(() => {
    if (IS_PIN_ENABLED) {
      onOpen();
    }
  }, [onOpen]);

  // Dynamically get PIN length
  const pinLength = env.PIN_CODE?.length || 4;

  function handleSubmit(onClose: () => void) {
    if (!IS_PIN_ENABLED) return; // If PIN code is not enabled, return directly

    if (!pin) {
      setFailCount((c) => c + 1);

      return;
    }
    if (pin === env.PIN_CODE) {
      setAuthenticated(true);
      loadResumeContent();
      onClose();
    } else {
      setFailCount((c) => c + 1);
      controls.start({
        x: [0, -10, 10, -10, 10, 0],
        transition: { duration: 0.5 },
      });
      addToast({
        title: "Invalid PIN",
        description: "Please try again",
        color: "danger",
      });
      setPin("");
    }
  }

  async function loadResumeContent() {
    setIsLoadingResume(true);
    try {
      const data = await loadResumeData();

      // Verify data structure integrity
      if (!data || !data.basics || !data.basics.name) {
        throw new Error("Resume data is incomplete or missing required fields");
      }

      setResumeData(data);
    } catch (error) {
      addToast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to load resume data",
        color: "danger",
      });
      setResumeData(null);
    } finally {
      setIsLoadingResume(false);
    }
  }

  // Listen for pin length
  useEffect(() => {
    if (IS_PIN_ENABLED && pin.length === pinLength) {
      handleSubmit(onOpenChange);
    }
  }, [pin, pinLength, onOpenChange]);

  // Listen for Modal close event, if not authenticated show 404 directly (only when PIN code is enabled)
  useEffect(() => {
    if (IS_PIN_ENABLED && !isOpen && !authenticated && isMounted) {
      setFailCount(3);
    }
  }, [isOpen, authenticated, isMounted]);

  // Show 404 after 3 errors, wrapped in full page layout (only when PIN code is enabled)
  if (IS_PIN_ENABLED && failCount >= 3) {
    const textColor = currentTheme === "dark" ? "#ffffff" : "#000000";

    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-2 pt-16">
          {isMounted && forceRender && (
            <div key={`fuzzy-container-${renderKey}`}>
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
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Navigation Bar */}
      <Navbar />

      {/* Display PIN modal only if PIN is enabled */}
      {IS_PIN_ENABLED && (
        <Modal isOpen={isOpen && !authenticated} onOpenChange={onOpenChange}>
          <ModalContent className="overflow-hidden">
            {/* Remove unused onClose parameter */}
            <motion.div
              animate={controls}
              className="flex flex-col items-center gap-4 p-4"
              initial={{ x: 0 }}
            >
              <ModalHeader className="text-center">
                Enter {pinLength}-digit PIN Code
              </ModalHeader>
              <ModalBody className="flex justify-center">
                <InputOtp
                  length={pinLength}
                  value={pin}
                  onValueChange={setPin}
                />
              </ModalBody>
            </motion.div>
          </ModalContent>
        </Modal>
      )}

      {/* Display resume content */}
      {authenticated && (
        <div className="min-h-screen pt-16">
          {" "}
          {/* Add top padding for navbar */}
          {isLoadingResume ? (
            <div className="flex justify-center items-center min-h-[50vh]">
              <Spinner label="Loading resume..." size="lg" />
            </div>
          ) : resumeData && resumeData.basics && resumeData.basics.name ? (
            <div className="space-y-0">
              {/* Professional Resume Content */}
              <ProfessionalResumeContent data={resumeData} />
            </div>
          ) : (
            <div className="flex justify-center items-center min-h-[50vh] p-8">
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="text-center max-w-md mx-auto p-8"
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.6 }}
              >
                <div className="mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    Resume Loading Failed
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Unable to load resume content. Please check your resume file
                    configuration or try refreshing the page.
                  </p>
                </div>
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-sm text-red-700 dark:text-red-300">
                    Check if{" "}
                    <code className="bg-red-100 dark:bg-red-800 px-1 py-0.5 rounded text-xs font-mono">
                      VITE_RESUME_FILE
                    </code>{" "}
                    environment variable points to a valid YAML file.
                  </p>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
