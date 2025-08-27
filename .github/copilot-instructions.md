# Developer Guide: AI Chat Assistant with Reasoning Display

This document explains how the chat assistant streams answers and optionally shows a muted reasoning summary above the answer when the selected model provides reasoning signals.

## Files of Interest

- `src/components/ChatBot/ChatBot.tsx`
- `src/utils/openai-client.ts`
- `src/utils/env.ts`

## Environment

Set these variables for the assistant to appear:

- `VITE_OPENAI_BASE_URL`
- `VITE_OPENAI_API_KEY`
- `VITE_OPENAI_MODEL`

When `VITE_OPENAI_MODEL` points to a reasoning-capable model (e.g., `gpt-5`), the UI can show a reasoning preview.

## Streaming Protocol

We use OpenAI Responses API streaming via `openai-client.ts: responseStream` to emit typed channel events:

- `answer`: `response.output_text.delta` and `response.output_text.done`
- `reasoning`: `response.reasoning_summary_text.delta`, `response.reasoning_summary_text.done`, plus `response.reasoning_summary_part.*` lifecycle events
- `web_search`: `response.web_search_call.*` lifecycle events (optional)

The client forwards these events via `onDelta(update)` with the shape:

```ts
{
  channel: "answer" | "reasoning" | "web_search";
  eventType: string;
  delta?: string;
  text?: string;
}
```

## UI Behavior

`ChatBot.tsx` keeps the original `string[]` message list for minimal changes:

```ts
// Even index = user, odd index = assistant
const [messages, setMessages] = useState<string[]>([]);
// Live streaming states
const [streamingMessage, setStreamingMessage] = useState("");
const [streamingReasoning, setStreamingReasoning] = useState("");
// Reasoning text keyed by assistant message index (odd indices)
const [assistantReasonings, setAssistantReasonings] = useState<
  Record<number, string>
>({});
```

During streaming:

- `streamingReasoning` accumulates reasoning deltas (shown above the partial answer).
- `streamingMessage` accumulates answer deltas.

On completion:

- Append the answer to `messages`.
- If reasoning exists, store it in `assistantReasonings[lastAssistantIndex]`.

### Rendering

- User messages: right-aligned, primary styling.
- Assistant messages: left-aligned, default styling.
- If an assistant message has `reasoning`, render it above the answer as a small, muted paragraph.
- While streaming, if `streamingReasoning` has content, render it above the partial answer paragraph.

### Styling

- Reasoning text uses `text-xs text-default-400` with `mb-2` spacing.

## Extending

- Disable reasoning display by removing the `reasoning` channel handling and the `streamingReasoning` UI.
- Persist conversations by saving both `messages: string[]` and `assistantReasonings: Record<number, string>` to localStorage and restoring on mount.
- Image input is already supported in the client; pass a buffer to `responseStream`.

## Testing

- Configure a reasoning-capable model.
- Ask a question; observe the muted reasoning summary above the streamed answer.

## Notes

- Reasoning events are optional; the UI hides reasoning when none are emitted.
