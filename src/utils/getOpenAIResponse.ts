import type {
  ChatCompletionMessageParam,
  ChatCompletionChunk,
} from "openai/resources";

import { OpenAI } from "openai";
import { Stream } from "openai/streaming";

import { env } from "@/utils/env";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

/**
 * Initialize OpenAI client
 */
const createClient = () => {
  if (!env.OPENAI_BASE_URL) {
    throw new Error("OPENAI_BASE_URL is not configured");
  }

  if (!env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not configured");
  }

  return new OpenAI({
    baseURL: env.OPENAI_BASE_URL,
    apiKey: env.OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });
};

/**
 * Get current page context for the AI
 */
export const getCurrentPageContext = (): string => {
  const currentPath = window.location.pathname;
  const currentUrl = window.location.href;

  // Get page title
  const pageTitle = document.title;

  // Get main content text (excluding navigation and other UI elements)
  const mainContent =
    document.querySelector("main")?.textContent ||
    document.body?.textContent ||
    "";

  // Extract meaningful content (first 2000 characters to avoid token limits)
  const contentPreview = mainContent.slice(0, 2000);

  let pageContext = `Current Page Information:
- URL: ${currentUrl}
- Path: ${currentPath}
- Page Title: ${pageTitle}
- Page Content Preview: ${contentPreview}

You are an AI assistant for a personal website. You should ONLY answer questions related to the current page content shown above. 

Rules:
1. Only respond to questions about the current page content, resume, portfolio, or website navigation
2. If asked about unrelated topics, politely redirect the conversation back to the current page
3. Be helpful and concise in your responses
4. Use the page content to provide accurate information about the user's background, projects, or resume`;

  return pageContext;
};

/**
 * Send chat completion request to OpenAI with streaming support
 */
export const getChatCompletion = async (
  messages: ChatMessage[],
  onToken?: (token: string) => void,
): Promise<string> => {
  try {
    const client = createClient();

    if (!env.OPENAI_MODEL) {
      throw new Error("OPENAI_MODEL is not configured");
    }

    // Add current page context to the first message
    const pageContext = getCurrentPageContext();

    // Format messages for OpenAI API
    const formattedMessages: ChatCompletionMessageParam[] = [
      {
        role: "system",
        content: pageContext,
      },
      ...messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    ];

    // Basic request configuration
    const requestOptions = {
      model: env.OPENAI_MODEL,
      messages: formattedMessages,
      temperature: 0.7,
      max_tokens: 1000,
    };

    console.log("Sending request to OpenAI API");

    // Check if streaming mode is required
    if (onToken) {
      // Create streaming request
      const streamingOptions = {
        ...requestOptions,
        stream: true,
      };

      const stream = (await client.chat.completions.create(
        streamingOptions,
      )) as unknown as Stream<ChatCompletionChunk>;

      let fullResponse = "";

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || "";

        if (content) {
          onToken(content);
          fullResponse += content;
        }
      }

      return fullResponse;
    } else {
      // Non-streaming request
      const response = await client.chat.completions.create(requestOptions);

      return response.choices[0].message.content || "";
    }
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    throw error;
  }
};
