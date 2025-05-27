import { useState, useEffect } from "react";
import DefaultLayout from '@/layouts/default';
import { InputOtp } from "@heroui/input-otp";
import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from "@heroui/modal";
import { addToast } from "@heroui/toast";
import { motion, useAnimation } from "framer-motion";

// Read PIN code from .env via VITE_PIN_CODE
const PIN_CODE = import.meta.env.VITE_PIN_CODE;

export default function ResumePage() {
  const [pin, setPin] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const controls = useAnimation();
  useEffect(onOpen, []);

  function handleSubmit(onClose: () => void) {
    if (pin === PIN_CODE) {
      setAuthenticated(true);
      onClose();
    } else {
      controls.start({ x: [0, -10, 10, -10, 10, 0], transition: { duration: 0.5 } });
      addToast({ title: "Invalid PIN", description: "請重新輸入", color: "danger" });
      setPin("");
    }
  }

  return (
    <DefaultLayout>
      {/* Display resume after authentication */}
      <Modal isOpen={isOpen && !authenticated} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose: () => void) => (
            <motion.div animate={controls} initial={{ x: 0 }} className="flex flex-col items-center gap-4 p-4">
              <ModalHeader className="text-center">輸入 4 位 PIN 碼</ModalHeader>
              <ModalBody className="flex justify-center">
                <InputOtp length={4} value={pin} onValueChange={(val) => {
                    setPin(val);
                    if (val.length === 4) handleSubmit(onClose);
                  }}
                />
              </ModalBody>
            </motion.div>
          )}
        </ModalContent>
      </Modal>
      {authenticated && <div>{/* TODO: Resume content */}</div>}
    </DefaultLayout>
  );
}
