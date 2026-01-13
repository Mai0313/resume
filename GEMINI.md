# Project Context: Resume/Portfolio Website

## Overview
This project is a personal resume and portfolio website built with **React**, **Vite**, and **HeroUI**. It features a modern, responsive design with dynamic visual effects (Particles, Orb), a configurable resume system driven by YAML/JSON, and an integrated AI assistant powered by OpenAI/Azure OpenAI.

## Tech Stack
*   **Core:** React 18, TypeScript 5.6, Vite 6.3
*   **Styling:** Tailwind CSS 3.4, HeroUI, Framer Motion, GSAP
*   **Routing:** React Router 7
*   **Data:** YAML (js-yaml), GitHub API
*   **AI:** OpenAI Node.js Library (supporting Azure)
*   **Deployment:** GitHub Pages, Vercel, Docker

## Key Features
1.  **Resume System:** Loads resume data from local YAML, GitHub Gist, or raw URLs. Supports PIN protection.
2.  **AI Assistant:** Floating chat interface with streaming responses and reasoning capabilities (OpenAI/Azure).
3.  **Visual Effects:** Interactive background elements (Particles, WebGL Orb) and text animations.
4.  **Smart Configuration:** Features enable/disable based on environment variables.

## Development Workflow

### Installation
```bash
npm install
# or
yarn install
```

### Development Server
Starts the local development server at `http://localhost:5173`.
```bash
npm run dev
# or
yarn dev
```

### Build
Type-checks and builds the production-ready application to the `dist/` directory.
```bash
npm run build
# or
yarn build
```

### Preview
Previews the production build locally.
```bash
npm run preview
# or
yarn preview
```

### Linting & Formatting
Runs TypeScript type-checking, Prettier formatting, and ESLint fixing.
```bash
npm run check
# or
yarn check
```

## Configuration
The project relies heavily on environment variables defined in `.env`.

**Key Variables:**
*   `VITE_WEBSITE_TITLE`: Website title (Required).
*   `VITE_RESUME_FILE`: Path or URL to the resume YAML file (Required for Resume page).
*   `VITE_PIN_CODE`: Optional PIN for resume protection.
*   `VITE_OPENAI_BASE_URL`, `VITE_OPENAI_API_KEY`, `VITE_OPENAI_MODEL`: Required for AI Assistant.
*   `VITE_ROOT_PATH`: Base path for deployment (e.g., `/resume` for GitHub Pages).

## Project Structure
*   `src/components/`: Reusable UI components.
    *   `ResumeSections/`: Specific components for resume sections (Work, Education, etc.).
    *   `ChatBot/`: AI assistant components.
*   `src/pages/`: Top-level page components (`index.tsx`, `resume.tsx`).
*   `src/config/site.ts`: Site-wide configuration and navigation.
*   `src/utils/`: Utility functions (resume loader, OpenAI client, env helpers).
*   `public/`: Static assets (default resume YAML, icons).

## Conventions
*   **Styling:** Tailwind CSS for layout and styling. HeroUI for UI primitives.
*   **State Management:** React Context and local state.
*   **Type Safety:** Strict TypeScript usage.
*   **Code Style:** Enforced by Prettier and ESLint.
