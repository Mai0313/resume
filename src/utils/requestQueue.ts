/**
 * Request Queue Utility with Rate Limiting and Retry Logic
 * Features:
 * - Limits concurrent requests to prevent API rate limiting
 * - Exponential backoff for retries
 * - Adaptive rate limiting based on response headers
 */

import { REQUEST_QUEUE } from "@/constants";

type QueueItem<T> = {
  fn: () => Promise<T>;
  resolve: (value: T) => void;
  reject: (error: any) => void;
  retries?: number;
  retryDelay?: number;
};

interface RateLimitInfo {
  remaining: number | null;
  reset: number | null;
  limit: number | null;
}

interface RequestQueueOptions {
  maxConcurrent?: number;
  maxRetries?: number;
  initialRetryDelay?: number;
  maxRetryDelay?: number;
  backoffMultiplier?: number;
}

export class RequestQueue {
  private queue: QueueItem<any>[] = [];
  private running = 0;
  private maxConcurrent: number;
  private maxRetries: number;
  private initialRetryDelay: number;
  private maxRetryDelay: number;
  private backoffMultiplier: number;
  private rateLimitInfo: RateLimitInfo = {
    remaining: null,
    reset: null,
    limit: null,
  };
  private isPaused = false;
  private pauseUntil: number | null = null;

  constructor(options: RequestQueueOptions = {}) {
    this.maxConcurrent = options.maxConcurrent ?? REQUEST_QUEUE.MAX_CONCURRENT;
    this.maxRetries = options.maxRetries ?? REQUEST_QUEUE.MAX_RETRIES;
    this.initialRetryDelay =
      options.initialRetryDelay ?? REQUEST_QUEUE.INITIAL_RETRY_DELAY_MS;
    this.maxRetryDelay =
      options.maxRetryDelay ?? REQUEST_QUEUE.MAX_RETRY_DELAY_MS;
    this.backoffMultiplier =
      options.backoffMultiplier ?? REQUEST_QUEUE.BACKOFF_MULTIPLIER;
  }

  /**
   * Add a request to the queue with retry logic
   * @param fn Function that returns a Promise
   * @returns Promise that resolves with the function result
   */
  async enqueue<T>(fn: () => Promise<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.queue.push({
        fn,
        resolve,
        reject,
        retries: 0,
        retryDelay: this.initialRetryDelay,
      });
      this.processQueue();
    });
  }

  /**
   * Process the queue with rate limit awareness
   */
  private async processQueue() {
    // Check if we're paused due to rate limiting
    if (this.isPaused && this.pauseUntil) {
      const now = Date.now();

      if (now < this.pauseUntil) {
        // Still paused, schedule next check
        setTimeout(() => this.processQueue(), this.pauseUntil - now);

        return;
      } else {
        // Pause period ended
        this.isPaused = false;
        this.pauseUntil = null;
      }
    }

    // Check concurrent limit and queue
    if (this.running >= this.maxConcurrent || this.queue.length === 0) {
      return;
    }

    // Adaptive rate limiting based on remaining API calls
    if (
      this.rateLimitInfo.remaining !== null &&
      this.rateLimitInfo.remaining < REQUEST_QUEUE.RATE_LIMIT_WARNING_THRESHOLD
    ) {
      // If we have less than threshold requests remaining, slow down
      if (this.maxConcurrent > 1) {
        this.maxConcurrent = 1;
        console.warn(
          `Rate limit low (${this.rateLimitInfo.remaining} remaining), reducing concurrent requests to 1`,
        );
      }
    }

    const item = this.queue.shift();

    if (!item) return;

    this.running++;

    try {
      const result = await this.executeWithRetry(item);

      item.resolve(result);
    } catch (error) {
      item.reject(error);
    } finally {
      this.running--;
      // Process next item after a small delay to avoid hitting rate limits
      setTimeout(
        () => this.processQueue(),
        REQUEST_QUEUE.PROCESS_QUEUE_DELAY_MS || 100,
      );
    }
  }

  /**
   * Execute a request with retry logic and exponential backoff
   */
  private async executeWithRetry<T>(item: QueueItem<T>): Promise<T> {
    try {
      const result = await item.fn();

      // Reset retry count on success
      item.retries = 0;
      item.retryDelay = this.initialRetryDelay;

      return result;
    } catch (error: any) {
      // Check if this is a rate limit error
      const isRateLimitError = this.isRateLimitError(error);

      if (isRateLimitError) {
        // Extract rate limit info from error if available
        this.updateRateLimitInfo(error);

        // Handle rate limit with longer pause
        if (this.rateLimitInfo.reset) {
          const resetTime = this.rateLimitInfo.reset * 1000;
          const now = Date.now();
          const waitTime = Math.max(0, resetTime - now + 1000); // Add 1 second buffer

          console.warn(
            `Rate limited. Waiting ${Math.ceil(waitTime / 1000)} seconds until reset...`,
          );

          this.isPaused = true;
          this.pauseUntil = now + waitTime;

          // Re-queue the item to be processed after pause
          this.queue.unshift(item);

          // Schedule processing after pause
          setTimeout(() => {
            this.isPaused = false;
            this.pauseUntil = null;
            this.processQueue();
          }, waitTime);

          throw new Error(
            `Rate limited. Will retry after ${new Date(resetTime).toLocaleTimeString()}`,
          );
        }
      }

      // Check if we should retry
      if (
        item.retries! < this.maxRetries &&
        (isRateLimitError || this.isRetryableError(error))
      ) {
        item.retries!++;

        const delay = Math.min(item.retryDelay!, this.maxRetryDelay);

        console.warn(
          `Request failed (attempt ${item.retries}/${this.maxRetries}). ` +
            `Retrying in ${delay / 1000} seconds...`,
          error.message,
        );

        // Wait with exponential backoff
        await this.delay(delay);

        // Increase delay for next retry
        item.retryDelay = Math.min(
          item.retryDelay! * this.backoffMultiplier,
          this.maxRetryDelay,
        );

        // Retry the request
        return this.executeWithRetry(item);
      }

      // Max retries exceeded or non-retryable error
      throw error;
    }
  }

  /**
   * Check if an error is a rate limit error
   */
  private isRateLimitError(error: any): boolean {
    if (!error) return false;

    const message = error.message?.toLowerCase() || "";
    const status = error.status || error.response?.status;

    return (
      status === 403 ||
      status === 429 ||
      message.includes("rate limit") ||
      message.includes("api rate limit") ||
      message.includes("forbidden")
    );
  }

  /**
   * Check if an error is retryable
   */
  private isRetryableError(error: any): boolean {
    if (!error) return false;

    const status = error.status || error.response?.status;
    const message = error.message?.toLowerCase() || "";

    // Retry on network errors or 5xx server errors
    return (
      status >= 500 ||
      status === 408 || // Request Timeout
      status === 409 || // Conflict (might be temporary)
      status === 423 || // Locked (might be temporary)
      status === 424 || // Failed Dependency
      status === 425 || // Too Early
      status === 0 || // Network error
      message.includes("network") ||
      message.includes("timeout") ||
      message.includes("econnreset") ||
      message.includes("enotfound")
    );
  }

  /**
   * Parse rate limit headers from Headers or plain object
   */
  private parseRateLimitHeaders(
    headers: Headers | Record<string, string>,
  ): RateLimitInfo {
    const getHeader = (key: string): string => {
      if (headers instanceof Headers) {
        return headers.get(key) || "";
      }
      return headers[key] || "";
    };

    const remaining = parseInt(getHeader("x-ratelimit-remaining"), 10);
    const reset = parseInt(getHeader("x-ratelimit-reset"), 10);
    const limit = parseInt(getHeader("x-ratelimit-limit"), 10);

    return {
      remaining: !isNaN(remaining) ? remaining : null,
      reset: !isNaN(reset) ? reset : null,
      limit: !isNaN(limit) ? limit : null,
    };
  }

  /**
   * Update rate limit info from error response
   */
  private updateRateLimitInfo(error: any): void {
    const headers = error.response?.headers || error.headers;

    if (headers) {
      const info = this.parseRateLimitHeaders(headers);

      if (info.remaining !== null)
        this.rateLimitInfo.remaining = info.remaining;
      if (info.reset !== null) this.rateLimitInfo.reset = info.reset;
      if (info.limit !== null) this.rateLimitInfo.limit = info.limit;
    }
  }

  /**
   * Delay helper for exponential backoff
   */
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Get current queue status
   */
  getStatus() {
    return {
      queued: this.queue.length,
      running: this.running,
      maxConcurrent: this.maxConcurrent,
      isPaused: this.isPaused,
      pauseUntil: this.pauseUntil,
      rateLimitInfo: this.rateLimitInfo,
    };
  }

  /**
   * Clear the queue
   */
  clear(): void {
    this.queue = [];
  }

  /**
   * Update rate limit info from response headers
   * Should be called after successful requests
   */
  updateFromHeaders(headers: Headers | Record<string, string>): void {
    const info = this.parseRateLimitHeaders(headers);

    if (info.remaining !== null) this.rateLimitInfo.remaining = info.remaining;
    if (info.reset !== null) this.rateLimitInfo.reset = info.reset;
    if (info.limit !== null) this.rateLimitInfo.limit = info.limit;
  }
}

// Shared instance for GitHub API requests with conservative settings
export const githubRequestQueue = new RequestQueue({
  maxConcurrent: REQUEST_QUEUE.MAX_CONCURRENT,
  maxRetries: REQUEST_QUEUE.MAX_RETRIES,
  initialRetryDelay: REQUEST_QUEUE.INITIAL_RETRY_DELAY_MS,
  maxRetryDelay: REQUEST_QUEUE.MAX_RETRY_DELAY_MS,
  backoffMultiplier: REQUEST_QUEUE.BACKOFF_MULTIPLIER,
});
