import { useState, useEffect } from "react";
import DefaultLayout from '@/layouts/default';
import { InputOtp } from "@heroui/input-otp";
import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from "@heroui/modal";
import { addToast } from "@heroui/toast";
import { motion, useAnimation } from "framer-motion";
import FuzzyText from '../components/FuzzyText';
import { useTheme } from "@heroui/use-theme";

// Read PIN code from .env via VITE_PIN_CODE
const PIN_CODE = import.meta.env.VITE_PIN_CODE;

export default function ResumePage() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true); }, []);
  const [pin, setPin] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [failCount, setFailCount] = useState(0);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const controls = useAnimation();
  const { theme } = useTheme();
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
      onClose();
    } else {
      setFailCount((c) => c + 1);
      controls.start({ x: [0, -10, 10, -10, 10, 0], transition: { duration: 0.5 } });
      addToast({ title: "Invalid PIN", description: "請重新輸入", color: "danger" });
      setPin("");
    }
  }

  // 監聽 pin 長度
  useEffect(() => {
    if (pin.length === pinLength) {
      handleSubmit(onOpenChange);
    }
    // eslint-disable-next-line
  }, [pin, pinLength]);

  // 監聽 Modal 關閉事件，若未驗證則直接 404
  useEffect(() => {
    if (!isOpen && !authenticated && isMounted) {
      setFailCount(3);
    }
  }, [isOpen, authenticated, isMounted]);

  // 3次錯誤才顯示404，並包在DefaultLayout下
  if (failCount >= 3) {
    return (
      <DefaultLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          {isMounted && (
            <FuzzyText
              baseIntensity={0.2}
              hoverIntensity={0.5}
              enableHover={true}
              color={theme === "dark" ? "#fff" : "#222"}
            >
              404
            </FuzzyText>
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
          <motion.div animate={controls} initial={{ x: 0 }} className="flex flex-col items-center gap-4 p-4">
            <ModalHeader className="text-center">輸入 {pinLength} 位 PIN 碼</ModalHeader>
            <ModalBody className="flex justify-center">
              <InputOtp length={pinLength} value={pin} onValueChange={setPin} />
            </ModalBody>
          </motion.div>
        </ModalContent>
      </Modal>
      {authenticated && <div>{/* TODO: Resume content */}</div>}
    </DefaultLayout>
  );
}
