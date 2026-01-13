/**
 * Application-wide constants
 * Centralized to avoid magic numbers and improve maintainability
 */

// Responsive Breakpoints
export const BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024,
  DESKTOP: 1920,
} as const;

// Particle System
export const PARTICLE_COUNTS = {
  MOBILE: 50,
  TABLET: 100,
  DESKTOP: 200,
} as const;

// RequestQueue
export const REQUEST_QUEUE = {
  MAX_CONCURRENT: 2,
  MAX_RETRIES: 3,
  INITIAL_RETRY_DELAY_MS: 1000,
  MAX_RETRY_DELAY_MS: 32000,
  BACKOFF_MULTIPLIER: 2,
  RATE_LIMIT_WARNING_THRESHOLD: 10,
  PROCESS_QUEUE_DELAY_MS: 100,
} as const;

// Animation
export const ANIMATION = {
  FOCUS_DELAY_MS: 100,
  PROCESS_QUEUE_DELAY_MS: 100,
} as const;
