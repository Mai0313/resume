/**
 * Custom error types for better type safety
 */

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
