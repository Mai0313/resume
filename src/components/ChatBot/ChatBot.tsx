import React, { useState, useRef, useEffect } from "react";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import { Spinner } from "@heroui/spinner";
import { motion, AnimatePresence } from "framer-motion";

import { getChatCompletion, type ChatMessage } from "@/utils/getOpenAIResponse";
import { envHelpers } from "@/utils/env";

interface ChatBotProps {
  className?: string;
}

export const ChatBot: React.FC<ChatBotProps> = ({ className = "" }) => {
  // Always call hooks at the top level
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingMessage]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Only render if OpenAI is available
  if (!envHelpers.isOpenAIChatBotAvailable()) {
    return null;
  }

  const handleSendMessage = async () => {
    if (!currentMessage.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      role: "user",
      content: currentMessage.trim(),
    };

    // Add user message and clear input
    setMessages((prev) => [...prev, userMessage]);
    setCurrentMessage("");
    setIsLoading(true);
    setStreamingMessage("");

    try {
      // Get AI response with streaming
      const allMessages = [...messages, userMessage];
      let fullResponse = "";

      await getChatCompletion(allMessages, (token: string) => {
        fullResponse += token;
        setStreamingMessage(fullResponse);
      });

      // Add complete AI response to messages
      const aiMessage: ChatMessage = {
        role: "assistant",
        content: fullResponse,
      };

      setMessages((prev) => [...prev, aiMessage]);
      setStreamingMessage("");
    } catch (error) {
      console.error("Error getting AI response:", error);

      // Add error message
      const errorMessage: ChatMessage = {
        role: "assistant",
        content:
          "Sorry, I encountered an error while processing your request. Please try again.",
      };

      setMessages((prev) => [...prev, errorMessage]);
      setStreamingMessage("");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    setMessages([]);
    setStreamingMessage("");
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.div
        animate={{ scale: 1, opacity: 1 }}
        className={`fixed bottom-6 right-6 z-50 ${className}`}
        initial={{ scale: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          isIconOnly
          aria-label="Open chat assistant"
          className="shadow-lg hover:shadow-xl transition-shadow duration-200"
          color="primary"
          size="lg"
          onPress={onOpen}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
        </Button>
      </motion.div>

      {/* Chat Modal */}
      <Modal
        className="mx-4"
        classNames={{
          header: "border-b border-divider",
          footer: "border-t border-divider",
          body: "py-0",
        }}
        isOpen={isOpen}
        size="2xl"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex items-center justify-between w-full">
                  <div>
                    <h3 className="text-lg font-semibold">AI Assistant</h3>
                    <p className="text-sm text-default-500">
                      Ask me about this page&apos;s content
                    </p>
                  </div>
                  <Button
                    className="text-default-500"
                    size="sm"
                    variant="light"
                    onPress={handleClearChat}
                  >
                    Clear Chat
                  </Button>
                </div>
              </ModalHeader>

              <ModalBody className="px-0">
                <div className="h-96 flex flex-col">
                  {/* Messages Area */}
                  <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                    {messages.length === 0 && !streamingMessage && (
                      <div className="text-center text-default-500 py-8">
                        <svg
                          className="w-12 h-12 mx-auto mb-4 text-default-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                          />
                        </svg>
                        <p>
                          Hi! I&apos;m here to help you with questions about
                          this page.
                        </p>
                        <p className="text-sm mt-2">
                          Ask me about the resume, portfolio, or any content you
                          see here.
                        </p>
                      </div>
                    )}

                    <AnimatePresence>
                      {messages.map((message, index) => (
                        <motion.div
                          key={index}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex ${
                            message.role === "user"
                              ? "justify-end"
                              : "justify-start"
                          }`}
                          exit={{ opacity: 0, y: -20 }}
                          initial={{ opacity: 0, y: 20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Card
                            className={`max-w-[80%] ${
                              message.role === "user"
                                ? "bg-primary text-primary-foreground"
                                : "bg-default-100"
                            }`}
                          >
                            <CardBody className="px-4 py-3">
                              <p className="text-sm whitespace-pre-wrap">
                                {message.content}
                              </p>
                            </CardBody>
                          </Card>
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {/* Streaming Message */}
                    {streamingMessage && (
                      <motion.div
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start"
                        initial={{ opacity: 0, y: 20 }}
                      >
                        <Card className="max-w-[80%] bg-default-100">
                          <CardBody className="px-4 py-3">
                            <p className="text-sm whitespace-pre-wrap">
                              {streamingMessage}
                              <span className="inline-block w-2 h-4 bg-primary ml-1 animate-pulse" />
                            </p>
                          </CardBody>
                        </Card>
                      </motion.div>
                    )}

                    {/* Loading indicator */}
                    {isLoading && !streamingMessage && (
                      <motion.div
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start"
                        initial={{ opacity: 0, y: 20 }}
                      >
                        <Card className="max-w-[80%] bg-default-100">
                          <CardBody className="px-4 py-3 flex items-center">
                            <Spinner className="mr-2" size="sm" />
                            <p className="text-sm text-default-500">
                              Thinking...
                            </p>
                          </CardBody>
                        </Card>
                      </motion.div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>
                </div>
              </ModalBody>

              <ModalFooter className="px-6">
                <div className="flex w-full gap-2">
                  <Input
                    ref={inputRef}
                    className="flex-1"
                    disabled={isLoading}
                    placeholder="Ask me about this page..."
                    value={currentMessage}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setCurrentMessage(e.target.value)
                    }
                    onKeyPress={handleKeyPress}
                  />
                  <Button
                    color="primary"
                    disabled={!currentMessage.trim() || isLoading}
                    isLoading={isLoading}
                    onPress={handleSendMessage}
                  >
                    Send
                  </Button>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ChatBot;
