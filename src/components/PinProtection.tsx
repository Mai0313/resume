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

interface PinProtectionProps {
  onAuthenticated: () => void;
  pinCode: string | undefined;
  enabled: boolean;
}

export function PinProtection({
  onAuthenticated,
  pinCode,
  enabled,
}: PinProtectionProps) {
  const [pin, setPin] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const controls = useAnimation();

  const pinLength = pinCode?.length || 4;

  useEffect(() => {
    if (enabled) {
      onOpen();
    }
  }, [enabled, onOpen]);

  useEffect(() => {
    if (enabled && pin.length === pinLength) {
      handleSubmit();
    }
  }, [pin, pinLength, enabled]);

  // 檢查 URL 參數中的 PIN 碼
  useEffect(() => {
    if (!enabled || !pinCode) return;

    const urlParams = new URLSearchParams(window.location.search);
    const urlPin = urlParams.get("pin");

    if (urlPin && urlPin === pinCode) {
      onAuthenticated();
      // 從 URL 中移除 PIN 參數以保護隱私
      urlParams.delete("pin");
      const newUrl =
        window.location.pathname +
        (urlParams.toString() ? "?" + urlParams.toString() : "");

      window.history.replaceState({}, "", newUrl);
    }
  }, [enabled, pinCode, onAuthenticated]);

  const handleSubmit = () => {
    if (!pin) {
      return;
    }

    if (pin === pinCode) {
      onAuthenticated();
      onOpenChange();
    } else {
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
  };

  if (!enabled) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent className="overflow-hidden">
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
  );
}
