/**
 * Custom error types for better type safety
 */

export class GitHubAPIError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly response: Response,
    public readonly headers: Headers,
    public readonly resetTime?: number,
  ) {
    super(message);
    this.name = "GitHubAPIError";
    Object.setPrototypeOf(this, GitHubAPIError.prototype);
  }

  get isRateLimitError(): boolean {
    return this.status === 403 || this.status === 429;
  }

  get resetDate(): Date | null {
    return this.resetTime ? new Date(this.resetTime * 1000) : null;
  }
}

export class ResumeLoadError extends Error {
  constructor(
    message: string,
    public readonly cause?: Error,
  ) {
    super(message);
    this.name = "ResumeLoadError";
    Object.setPrototypeOf(this, ResumeLoadError.prototype);
  }
}

export class OpenAIError extends Error {
  constructor(
    message: string,
    public readonly cause?: Error,
  ) {
    super(message);
    this.name = "OpenAIError";
    Object.setPrototypeOf(this, OpenAIError.prototype);
  }
}
