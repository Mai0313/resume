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
import { Button } from "@heroui/button";
import { PDFDownloadLink } from "@react-pdf/renderer";

import FuzzyText from "../components/FuzzyText";
import { ResumeContent } from "../components/ResumeContent";
import { ResumePDF } from "../components/ResumePDF";
import { loadResumeData, ResumeData } from "../utils/resumeLoader";

import DefaultLayout from "@/layouts/default";

// Read PIN code from .env via VITE_PIN_CODE
const PIN_CODE = import.meta.env.VITE_PIN_CODE;
const IS_PIN_ENABLED = PIN_CODE && PIN_CODE.trim() !== "";

export default function ResumePage() {
  const [isMounted, setIsMounted] = useState(false);
  const [renderKey, setRenderKey] = useState(0);
  const [forceRender, setForceRender] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<string>("light");
  const [resumeData, setResumeData] = useState<(ResumeData & { sectionOrder: string[] }) | null>(null);
  const [isLoadingResume, setIsLoadingResume] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // 如果沒有設定 PIN 碼，直接載入履歷內容
    if (!IS_PIN_ENABLED) {
      setAuthenticated(true);
      loadResumeContent();
    }
  }, []);

  const [pin, setPin] = useState("");
  const [authenticated, setAuthenticated] = useState(!IS_PIN_ENABLED); // 如果沒有 PIN 碼，預設為已驗證
  const [failCount, setFailCount] = useState(0);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const controls = useAnimation();
  const { theme } = useTheme();

  // 雙重監聽主題變化
  useEffect(() => {
    setCurrentTheme(theme);
    setRenderKey((prev) => prev + 1);
    setForceRender(false);
    const timer = setTimeout(() => {
      setForceRender(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [theme]);

  // 額外監聽 DOM 的 class 變化 (作為備用方案)
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

    // 監聽 DOM 變化
    const observer = new MutationObserver(detectThemeChange);

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });

    // 初始檢測
    detectThemeChange();

    return () => observer.disconnect();
  }, [currentTheme]);

  useEffect(() => {
    if (IS_PIN_ENABLED) {
      onOpen();
    }
  }, [onOpen]);

  // 動態取得 PIN 長度
  const pinLength = PIN_CODE?.length || 4;

  function handleSubmit(onClose: () => void) {
    if (!IS_PIN_ENABLED) return; // 如果沒有啟用 PIN 碼，直接返回

    if (!pin) {
      setFailCount((c) => c + 1);

      return;
    }
    if (pin === PIN_CODE) {
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
        description: "請重新輸入",
        color: "danger",
      });
      setPin("");
    }
  }

  async function loadResumeContent() {
    setIsLoadingResume(true);
    try {
      const data = await loadResumeData();

      setResumeData(data);
    } catch {
      addToast({
        title: "Error",
        description: "Failed to load resume data",
        color: "danger",
      });
    } finally {
      setIsLoadingResume(false);
    }
  }

  // 監聽 pin 長度
  useEffect(() => {
    if (IS_PIN_ENABLED && pin.length === pinLength) {
      handleSubmit(onOpenChange);
    }
  }, [pin, pinLength, onOpenChange]);

  // 監聽 Modal 關閉事件，若未驗證則直接 404 (僅在啟用 PIN 碼時)
  useEffect(() => {
    if (IS_PIN_ENABLED && !isOpen && !authenticated && isMounted) {
      setFailCount(3);
    }
  }, [isOpen, authenticated, isMounted]);

  // 3次錯誤才顯示404，並包在DefaultLayout下 (僅在啟用 PIN 碼時)
  if (IS_PIN_ENABLED && failCount >= 3) {
    const textColor = currentTheme === "dark" ? "#ffffff" : "#000000";

    return (
      <DefaultLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-2">
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
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      {/* Display PIN modal only if PIN is enabled */}
      {IS_PIN_ENABLED && (
        <Modal isOpen={isOpen && !authenticated} onOpenChange={onOpenChange}>
          <ModalContent className="overflow-hidden">
            {/* 移除未使用的 onClose 參數 */}
            <motion.div
              animate={controls}
              className="flex flex-col items-center gap-4 p-4"
              initial={{ x: 0 }}
            >
              <ModalHeader className="text-center">
                輸入 {pinLength} 位 PIN 碼
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
        <div className="min-h-screen">
          {isLoadingResume ? (
            <div className="flex justify-center items-center min-h-[50vh]">
              <Spinner label="Loading resume..." size="lg" />
            </div>
          ) : resumeData ? (
            <div className="space-y-6">
              {/* PDF Download Button */}
              <div className="max-w-6xl mx-auto px-6">
                <div className="flex justify-end mb-4">
                  <PDFDownloadLink
                    document={<ResumePDF data={resumeData} />}
                    fileName={`${resumeData.basics.name.replace(/\s+/g, "_")}_Resume.pdf`}
                  >
                    {({ loading }: { loading: boolean }) => (
                      <Button
                        color="primary"
                        isLoading={loading}
                        size="md"
                        startContent={
                          !loading ? (
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                              />
                            </svg>
                          ) : null
                        }
                        variant="shadow"
                      >
                        {loading ? "Generating PDF..." : "Download PDF"}
                      </Button>
                    )}
                  </PDFDownloadLink>
                </div>
              </div>

              {/* Resume Content */}
              <ResumeContent data={resumeData} />
            </div>
          ) : (
            <div className="flex justify-center items-center min-h-[50vh]">
              <p className="text-gray-500">Failed to load resume content</p>
            </div>
          )}
        </div>
      )}
    </DefaultLayout>
  );
}
