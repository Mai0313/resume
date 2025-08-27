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

import OpenAI from "openai";
import { ChatCompletionCreateParamsStreaming } from "openai/resources.js";
import { ResponseCreateParamsStreaming } from "openai/resources/responses/responses.js";

import { env } from "@/utils/env";

export class OpenAIClient {
  private async getCurrentPageContext(): Promise<string> {
    const currentPath = window.location.pathname;
    const currentUrl = window.location.href;

    // Get page title
    const pageTitle = document.title;

    // Get main content text (excluding navigation and other UI elements)
    const mainContent =
      document.querySelector("main")?.textContent ||
      document.body?.textContent ||
      "";

    let pageContext = `
You are an AI assistant for a personal website. You should ONLY answer questions related to the current page content shown above. 

Rules:
1. Only respond to questions about the current page content, resume, portfolio, or website navigation
2. If asked about unrelated topics, politely redirect the conversation back to the current page
3. Be helpful and concise in your responses
4. Use the page content to provide accurate information about the user's background, projects, or resume

Here is the page information:
- URL: ${currentUrl}
- Path: ${currentPath}
- Page Title: ${pageTitle}
- Page Content Preview: ${mainContent}
`;

    return pageContext;
  }

  private async initialize(): Promise<OpenAI> {
    if (!env.OPENAI_BASE_URL) {
      throw new Error("OPENAI_BASE_URL is not configured");
    }

    if (!env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is not configured");
    }
    const client = new OpenAI({
      apiKey: env.OPENAI_API_KEY,
      baseURL: env.OPENAI_BASE_URL,
      dangerouslyAllowBrowser: true,
    });

    return client;
  }

  async completionStream(
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
    const client = await this.initialize();
    const pageContent = await this.getCurrentPageContext();
    const base64 = imageBuffer?.toString("base64");
    const messages: ChatCompletionMessageParam[] = [];

    messages.push({
      name: "message",
      role: "system",
      content: [{ type: "text", text: pageContent.trim() }],
    });
    const effectiveText = `${textPrompt.trim()}\nResponse to the question based on the info or image you have.`;

    const userContent: ChatCompletionUserMessageParam["content"] = [
      { type: "text", text: effectiveText },
    ];

    if (imageBuffer && base64) {
      userContent.push({
        type: "image_url",
        image_url: { url: `data:image/png;base64,${base64}`, detail: "auto" },
      });
    }
    messages.push({
      name: "message",
      role: "user",
      content: userContent,
    });

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

  async responseStream(
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
    const client = await this.initialize();
    const pageContent = await this.getCurrentPageContext();
    const base64 = imageBuffer?.toString("base64");
    const input: ResponseInput = [];

    input.push({
      type: "message",
      role: "system",
      content: [{ type: "input_text", text: pageContent.trim() }],
    });
    const effectiveText = `${textPrompt.trim()}\nResponse to the question based on the info or image you have.`;

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
    input.push({
      type: "message",
      role: "user",
      content: userContent,
    });

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
}

export const openAIClient = new OpenAIClient();
