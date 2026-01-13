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
