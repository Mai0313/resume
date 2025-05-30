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

import FuzzyText from "../components/FuzzyText";
import { ResumeContent } from "../components/ResumeContent";
import { loadResumeData, ResumeData } from "../utils/resumeLoader";

import DefaultLayout from "@/layouts/default";

// Read PIN code from .env via VITE_PIN_CODE
const PIN_CODE = import.meta.env.VITE_PIN_CODE;

export default function ResumePage() {
  const [isMounted, setIsMounted] = useState(false);
  const [renderKey, setRenderKey] = useState(0);
  const [forceRender, setForceRender] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<string>("light");
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [isLoadingResume, setIsLoadingResume] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const [pin, setPin] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
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

  useEffect(onOpen, []);

  // 動態取得 PIN 長度
  const pinLength = PIN_CODE?.length || 4;

  function handleSubmit(onClose: () => void) {
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
    } catch (error) {
      console.log("Error loading resume data:", error);
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
    if (pin.length === pinLength) {
      handleSubmit(onOpenChange);
    }
  }, [pin, pinLength]);

  // 監聽 Modal 關閉事件，若未驗證則直接 404
  useEffect(() => {
    if (!isOpen && !authenticated && isMounted) {
      setFailCount(3);
    }
  }, [isOpen, authenticated, isMounted]);

  // 3次錯誤才顯示404，並包在DefaultLayout下
  if (failCount >= 3) {
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
      {/* Display resume after authentication */}
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
              <InputOtp length={pinLength} value={pin} onValueChange={setPin} />
            </ModalBody>
          </motion.div>
        </ModalContent>
      </Modal>
      {authenticated && (
        <div className="min-h-screen">
          {isLoadingResume ? (
            <div className="flex justify-center items-center min-h-[50vh]">
              <Spinner label="Loading resume..." size="lg" />
            </div>
          ) : resumeData ? (
            <ResumeContent data={resumeData} />
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
