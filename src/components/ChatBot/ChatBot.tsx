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

import { openAIClient } from "@/utils/openai-client";
import { envHelpers } from "@/utils/env";

interface ChatBotProps {
  className?: string;
}

export const ChatBot: React.FC<ChatBotProps> = ({ className = "" }) => {
  // Always call hooks at the top level
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  // Store messages as plain strings: even index = user, odd index = assistant
  const [messages, setMessages] = useState<string[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState("");
  const [streamingReasoning, setStreamingReasoning] = useState("");
  // Store assistant reasoning per assistant message index (odd indices)
  const [assistantReasonings, setAssistantReasonings] = useState<
    Record<number, string>
  >({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Auto scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingMessage, streamingReasoning]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Cleanup: abort any pending requests when component unmounts
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }
    };
  }, []);

  // Only render if OpenAI is available
  if (!envHelpers.isOpenAIChatBotAvailable()) {
    return null;
  }

  const handleSendMessage = async () => {
    if (!currentMessage.trim() || isLoading) return;
    const userText = currentMessage.trim();

    // Add user message (as text) and clear input
    setMessages((prev) => [...prev, userText]);
    setCurrentMessage("");
    setIsLoading(true);
    setStreamingMessage("");
    setStreamingReasoning("");

    try {
      // Stream AI response using new client
      let fullResponse = "";
      let fullReasoning = "";
      const controller = new AbortController();

      abortControllerRef.current = controller;

      await openAIClient.responseStream(
        undefined,
        userText,
        (update) => {
          if (update.channel === "answer") {
            if (update.delta) {
              fullResponse += update.delta;
              setStreamingMessage(fullResponse);
            }
            if (update.text) {
              fullResponse = update.text;
              setStreamingMessage(fullResponse);
            }

            return;
          }
          if (update.channel === "reasoning") {
            if (update.delta) {
              fullReasoning += update.delta;
              setStreamingReasoning(fullReasoning);
            }
            if (update.text) {
              fullReasoning = update.text;
              setStreamingReasoning(fullReasoning);
            }

            return;
          }
        },
        controller.signal,
      );

      // Add complete AI response to messages as text
      setMessages((prev) => {
        const nextMessages = [...prev, fullResponse];
        const assistantIndex = nextMessages.length - 1; // assistant is last, odd index

        if (fullReasoning) {
          setAssistantReasonings((prevMap) => ({
            ...prevMap,
            [assistantIndex]: fullReasoning,
          }));
        }

        return nextMessages;
      });
      setStreamingMessage("");
      setStreamingReasoning("");
    } catch (error) {
      console.error("Error getting AI response:", error);
      // Add error message (assistant)
      const errorMessage =
        "Sorry, I encountered an error while processing your request. Please try again.";

      setMessages((prev) => [...prev, errorMessage]);
      setStreamingMessage("");
      setStreamingReasoning("");
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    if (isLoading && abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setMessages([]);
    setStreamingMessage("");
    setStreamingReasoning("");
    setAssistantReasonings({});
  };

  const handleModalOpenChange = (open: boolean) => {
    if (!open) {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }
      setIsLoading(false);
      setStreamingMessage("");
    }
    // Toggle modal state using hook's handler (no args)
    onOpenChange();
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
        onOpenChange={handleModalOpenChange}
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
                          className={`flex ${index % 2 === 0 ? "justify-end" : "justify-start"}`}
                          exit={{ opacity: 0, y: -20 }}
                          initial={{ opacity: 0, y: 20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Card
                            className={`max-w-[80%] ${index % 2 === 0 ? "bg-primary text-primary-foreground" : "bg-default-100"}`}
                          >
                            <CardBody className="px-4 py-3">
                              {index % 2 === 1 &&
                                assistantReasonings[index] && (
                                  <p className="text-xs text-default-400 whitespace-pre-wrap mb-2">
                                    {assistantReasonings[index]}
                                  </p>
                                )}
                              <p className="text-sm whitespace-pre-wrap">
                                {message}
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
                            {streamingReasoning && (
                              <p className="text-xs text-default-400 whitespace-pre-wrap mb-2">
                                {streamingReasoning}
                              </p>
                            )}
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
