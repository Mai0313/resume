# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal resume/portfolio website built with React, TypeScript, and Vite. It features a modular architecture with conditional page rendering based on environment variables.

## Development Commands

### Build and Run

```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Build for production
yarn build

# Preview production build
yarn preview

# Deploy to GitHub Pages
yarn deploy
```

### Code Quality

```bash
# Run all checks (type-check + format + lint)
yarn check

# Type checking
yarn type-check

# Format code
yarn format

# Lint and fix
yarn lint

# Format without fixing (check only)
yarn format:nofix

# Lint without fixing (check only)
yarn lint:nofix
```

### Makefile Commands

```bash
make          # Build the project
make clean    # Clean generated files and Git cache
make fmt      # Run formatters and linters
make run      # Run the project
make help     # Show all available commands
```

## Architecture and Key Concepts

### Environment-Driven Page Display

The application dynamically shows/hides pages based on environment variables:

- Resume page requires `VITE_RESUME_FILE` to be set

This logic is centralized in:

- `src/utils/env.ts`: Environment variable management with validation
- `src/config/site.ts`: Dynamic navigation generation
- `src/App.tsx`: Conditional route rendering

### Component Architecture

#### Pages (`src/pages/`)

- `index.tsx`: Home page with particle effects and animations
- `resume.tsx`: Resume page with PIN protection and PDF download

#### Key Components (`src/components/`)

- `ResumeSections/`: Modular resume section components
- `Particles/`, `Orb/`, `SplitText/`: Visual effect components
- `ResumeContent.tsx`: Resume rendering with section ordering

#### Utilities (`src/utils/`)

- `env.ts`: Centralized environment variable access
- `resumeLoader.ts`: YAML resume loader supporting local files and URLs
- `pathUtils.ts`: Path utilities for subpath deployment

### Resume System

- Supports YAML format following JSON Resume Schema
- Three data sources: local files, GitHub Gist, or raw URLs
- Section display order controlled by `sectionOrder` field in YAML
- Optional PIN code protection with URL parameter support

### GitHub Integration

- Automatically fetches authenticated user's repositories
- Displays language stats, stars, forks, and recent commits
- Token-based authentication for API rate limit management

### Deployment

- Supports GitHub Pages with automatic subpath configuration
- Docker containerization with multi-stage builds
- Vercel deployment configuration included
- GitHub Actions for automatic deployment on push to main/master

## Testing Approach

### Running Tests

Currently, the project doesn't have a formal test suite. When implementing tests:

1. For component testing:

```bash
# Install testing dependencies first
yarn add -D @testing-library/react @testing-library/jest-dom vitest
# Run tests
yarn test
```

2. For manual testing:

- Test conditional page rendering by toggling environment variables
- Verify GitHub API integration with valid token
- Test resume loading from different sources (local, Gist, URL)
- Check responsive design across different viewport sizes

### Key Testing Areas

- Environment variable validation in `src/utils/env.ts`
- Conditional navigation and routing based on env vars
- Resume YAML parsing and rendering
- GitHub API error handling and rate limiting
- PIN code verification flow
- Theme switching functionality

## Important Implementation Details

### State Management

- Uses React Context for theme management (`src/provider.tsx`)
- Local state for component-specific data
- No global state management library; components are largely self-contained

### Styling

- Tailwind CSS for utility-first styling
- HeroUI component library for UI elements
- CSS modules for component-specific styles (e.g., `Orb.css`, `SpotlightCard.css`)

### Performance Considerations

- Lazy loading for heavy animation libraries
- GitHub API response caching to reduce API calls
- Conditional imports based on environment variables

### Security

- Environment variables for sensitive data (tokens)
- PIN code protection for resume access
- Client-side only; no backend server required