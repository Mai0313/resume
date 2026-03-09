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
