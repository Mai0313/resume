import type {
  ChatCompletionChunk,
  ChatCompletionCreateParams,
  ChatCompletionMessageParam,
  ChatCompletionUserMessageParam,
} from "openai/resources/chat/completions";
import type {
  ResponseCreateParams,
  ResponseStreamEvent,
  ResponseInput,
  ResponseInputMessageContentList,
} from "openai/resources/responses/responses";
import type { Stream } from "openai/streaming";
import type OpenAI from "openai";
import type { ChatCompletionCreateParamsStreaming } from "openai/resources.js";
import type { ResponseCreateParamsStreaming } from "openai/resources/responses/responses.js";

import { env } from "@/utils/env";
import { CHAT } from "@/constants";

// Dynamically import OpenAI SDK to reduce initial bundle size
let OpenAIClass: typeof OpenAI | null = null;

async function getOpenAIClass() {
  if (!OpenAIClass) {
    const module = await import("openai");

    OpenAIClass = module.default;
  }

  return OpenAIClass;
}

// Singleton state
let cachedClient: OpenAI | null = null;

/**
 * Extract page content efficiently with early stopping
 * Uses TreeWalker to avoid extracting entire DOM text at once
 */
function extractPageContent(): string {
  if (typeof window === "undefined") return "";

  const mainElement = document.querySelector("main");

  if (!mainElement) return "";

  const maxLength = CHAT.PAGE_CONTEXT_MAX_LENGTH * 1.1; // Add 10% buffer for trimming
  const walker = document.createTreeWalker(mainElement, NodeFilter.SHOW_TEXT, {
    acceptNode: (node) => {
      // Skip empty text nodes
      if (!node.textContent?.trim()) return NodeFilter.FILTER_REJECT;

      // Skip hidden elements for better performance
      const parent = node.parentElement;

      if (!parent) return NodeFilter.FILTER_REJECT;

      const style = window.getComputedStyle(parent);

      if (style.display === "none" || style.visibility === "hidden") {
        return NodeFilter.FILTER_REJECT;
      }

      return NodeFilter.FILTER_ACCEPT;
    },
  });

  let text = "";
  let node;

  // Early stopping when we have enough content
  while ((node = walker.nextNode()) && text.length < maxLength) {
    text += (node.textContent || "") + " ";
  }

  // Normalize whitespace and trim to exact length
  return text
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, CHAT.PAGE_CONTEXT_MAX_LENGTH);
}

/**
 * Get current page context - always fresh, no caching
 * This avoids memory overhead and stale data issues
 */
async function getCurrentPageContext(): Promise<string> {
  const currentUrl = window.location.href;
  const currentPath = window.location.pathname;
  const pageTitle = document.title;
  const mainContent = extractPageContent();

  return `
You are an AI assistant for a personal website. You should ONLY answer questions related to the current page content shown above.

Rules:
1. Only respond to questions about the current page content, resume, or website navigation
2. If asked about unrelated topics, politely redirect the conversation back to the current page
3. Be helpful and concise in your responses
4. Use the page content to provide accurate information about the user's background, projects, or resume

Here is the page information:
- URL: ${currentUrl}
- Path: ${currentPath}
- Page Title: ${pageTitle}
- Page Content Preview: ${mainContent}
`;
}

/**
 * Get or initialize OpenAI client (singleton pattern)
 */
async function getClient(): Promise<OpenAI> {
  if (cachedClient) {
    return cachedClient;
  }

  if (!env.OPENAI_BASE_URL) {
    throw new Error("OPENAI_BASE_URL is not configured");
  }

  if (!env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not configured");
  }

  const OpenAIConstructor = await getOpenAIClass();

  cachedClient = new OpenAIConstructor({
    apiKey: env.OPENAI_API_KEY,
    baseURL: env.OPENAI_BASE_URL,
    dangerouslyAllowBrowser: true,
  });

  return cachedClient;
}

/**
 * Prepare common request data (system context and user message)
 * Reduces duplication between completion and response APIs
 */
async function prepareRequestData(
  imageBuffer: Buffer | undefined,
  textPrompt: string,
) {
  const pageContent = await getCurrentPageContext();
  const base64 = imageBuffer?.toString("base64");
  const effectiveText = `${textPrompt.trim()}\nResponse to the question based on the info or image you have.`;

  return {
    pageContent: pageContent.trim(),
    effectiveText,
    base64,
  };
}

/**
 * Build messages array for Chat Completion API
 */
async function buildMessagesArray(
  imageBuffer: Buffer | undefined,
  textPrompt: string,
): Promise<{
  systemMessage: ChatCompletionMessageParam;
  userMessage: ChatCompletionMessageParam;
}> {
  const { pageContent, effectiveText, base64 } = await prepareRequestData(
    imageBuffer,
    textPrompt,
  );

  const systemMessage: ChatCompletionMessageParam = {
    name: "message",
    role: "system",
    content: [{ type: "text", text: pageContent }],
  };

  const userContent: ChatCompletionUserMessageParam["content"] = [
    { type: "text", text: effectiveText },
  ];

  if (imageBuffer && base64) {
    userContent.push({
      type: "image_url",
      image_url: { url: `data:image/png;base64,${base64}`, detail: "auto" },
    });
  }

  const userMessage: ChatCompletionMessageParam = {
    name: "message",
    role: "user",
    content: userContent,
  };

  return { systemMessage, userMessage };
}

export async function completionStream(
  imageBuffer: Buffer | undefined,
  textPrompt: string,
  onDelta: (update: {
    channel: "answer";
    delta?: string;
    text?: string;
    eventType: string;
  }) => void,
  signal: AbortSignal,
): Promise<string> {
  const client = await getClient();
  const { systemMessage, userMessage } = await buildMessagesArray(
    imageBuffer,
    textPrompt,
  );
  const messages: ChatCompletionMessageParam[] = [systemMessage, userMessage];

  const request: ChatCompletionCreateParams & { stream: true } = {
    model: env.OPENAI_MODEL,
    messages: messages,
    stream: true,
  } as ChatCompletionCreateParamsStreaming;

  if (env.OPENAI_MODEL === "gpt-5") {
    request.reasoning_effort = "low";
  }
  const stream: Stream<ChatCompletionChunk> =
    await client.chat.completions.create(request, {
      signal,
    });

  let finalContent = "";

  for await (const chunk of stream) {
    const delta = chunk.choices[0].delta.content ?? "";

    if (delta) {
      finalContent += delta;
      onDelta({
        channel: "answer",
        delta,
        eventType: "chat.output_text.delta",
      });
    }
  }
  // Emit a final done event for completeness (not required by current UI)
  onDelta({
    channel: "answer",
    text: finalContent,
    eventType: "chat.output_text.done",
  });

  return finalContent;
}

export async function responseStream(
  imageBuffer: Buffer | undefined,
  textPrompt: string,
  onDelta: (update: {
    channel: "answer" | "reasoning" | "web_search";
    eventType: string;
    delta?: string;
    text?: string;
  }) => void,
  signal: AbortSignal,
): Promise<string> {
  const client = await getClient();
  const { pageContent, effectiveText, base64 } = await prepareRequestData(
    imageBuffer,
    textPrompt,
  );

  const userContent: ResponseInputMessageContentList = [
    { type: "input_text", text: effectiveText },
  ];

  if (imageBuffer && base64) {
    userContent.push({
      type: "input_image",
      image_url: `data:image/png;base64,${base64}`,
      detail: "auto",
    });
  }

  const input: ResponseInput = [
    {
      type: "message",
      role: "system",
      content: [{ type: "input_text", text: pageContent }],
    },
    {
      type: "message",
      role: "user",
      content: userContent,
    },
  ];

  const request: ResponseCreateParams & { stream: true } = {
    model: env.OPENAI_MODEL,
    input: input,
    tools: [{ type: "web_search_preview" }],
    stream: true,
  } as ResponseCreateParamsStreaming;

  if (env.OPENAI_MODEL === "gpt-5") {
    request.reasoning = { effort: "low", summary: "auto" };
  }
  const stream: Stream<ResponseStreamEvent> = await client.responses.create(
    request,
    { signal },
  );

  let finalContent = "";

  for await (const event of stream) {
    // Reasoning stream (models with reasoning support)
    if (event.type === "response.reasoning_summary_text.delta") {
      onDelta({
        channel: "reasoning",
        delta: event.delta,
        eventType: event.type,
      });
      continue;
    }

    // Final reasoning text (models with reasoning support)
    if (event.type === "response.reasoning_summary_text.done") {
      onDelta({
        channel: "reasoning",
        text: event.text,
        eventType: event.type,
      });
      continue;
    }

    // Reasoning lifecycle events (no full content available)
    if (
      event.type === "response.reasoning_summary_part.added" ||
      event.type === "response.reasoning_summary_part.done"
    ) {
      onDelta({ channel: "reasoning", eventType: event.type });
      continue;
    }

    // Web search lifecycle events (no full content available)
    if (
      event.type === "response.web_search_call.in_progress" ||
      event.type === "response.web_search_call.searching" ||
      event.type === "response.web_search_call.completed"
    ) {
      onDelta({ channel: "web_search", eventType: event.type });
      continue;
    }

    // Prefer granular answer delta events
    if (event.type === "response.output_text.delta") {
      onDelta({
        channel: "answer",
        delta: event.delta,
        eventType: event.type,
      });
      finalContent += event.delta;
      continue;
    }

    // Ensure we get the final answer text
    if (event.type === "response.output_text.done") {
      onDelta({ channel: "answer", text: event.text, eventType: event.type });
      finalContent = event.text;
      continue;
    }
  }

  return finalContent;
}
