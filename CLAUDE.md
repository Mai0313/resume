# CLAUDE.md

Project notes for AI agents working in this repo.

## Commands

```bash
yarn dev              # Vite dev server
yarn build            # tsc && vite build
yarn check            # tsc --noEmit && prettier --write . && eslint --fix
yarn type-check       # tsc --noEmit
yarn preview          # preview production build
yarn deploy           # build + gh-pages deploy

make pdf              # regenerate public/resume.pdf from public/resume.yaml via uvx rendercv
make run              # yarn dev
make fmt              # yarn check
make clean            # removes generated output/caches, keeps public/resume.pdf, then prunes Git refs and GC
```

No test runner is configured. Use TypeScript, Prettier, ESLint, and builds for verification.

## Architecture

The web resume and downloadable PDF both come from `public/resume.yaml`. The browser loads YAML at runtime; `make pdf` generates `public/resume.pdf` ahead of time with rendercv. Commit both YAML and PDF after resume content changes because Vercel serves the committed PDF.

Resume section rendering is entry-shape based, not section-name based. `detectEntryType()` in `src/utils/resumeLoader.ts` chooses one of the renderers in `src/components/ResumeSections/` from the first non-null entry.

Section order follows YAML key order. `loadResumeData()` stores `Object.keys(cv.sections)` as `sectionOrder`, and `ResumeContent` renders in that order.

List-like web custom fields must be comma-separated strings in YAML. `keywords`, `roles`, and `courses` are normalized into arrays at runtime; YAML lists can break rendercv's Typst template rendering.

`App.tsx` lazy-loads route pages. Resume-specific rendering and the `js-yaml` parser should stay out of the home page's initial route bundle.

## Gotchas

- `Languages` is special. A `OneLineEntry` section named `Languages` case-insensitively is hoisted into the header chip row and skipped from the main section list.
- `VITE_WEBSITE_TITLE` is required at module load in `src/utils/env.ts`; missing it prevents the app from mounting.
- `VITE_ROOT_PATH` controls Vite `base`, React Router `basename`, and local resume/PDF asset paths. Root deploys use Router basename `""`, not `"/"`.
- `/resume` is registered only when `VITE_RESUME_FILE` is set. Gate new conditional pages in `src/utils/env.ts`, `src/config/site.ts`, and `src/App.tsx`.
- `vite.config.ts` copies `dist/index.html` to `dist/404.html` for GitHub Pages SPA fallback.
- `vercel.json` rewrites only extensionless routes so `/resume.pdf`, `/resume.yaml`, and other static files are not masked by `index.html`.
- GitHub Pages deploy runs `make pdf`; Vercel does not.

## Key Files

- `src/utils/resume/`: rendercv schema types, entry detection, YAML loading, social URL templates, source resolution, list-field normalization.
- `src/utils/resumeLoader.ts`: compatibility barrel for resume utilities and types.
- `src/components/ResumeContent.tsx`: resume layout composition and section order rendering.
- `src/components/ResumeHeader.tsx`: header rendering, PDF link, social links, and `Languages` hoist display.
- `src/components/ResumeSections/ResumeSectionRenderer.tsx`: entry-shape dispatch to section renderers.
- `src/components/ResumeSections/SectionCard.tsx`: shared section shell and section-title mapping.
- `src/utils/env.ts`: centralized `VITE_*` access and validation.
- `src/utils/pathUtils.ts`: `VITE_ROOT_PATH` helpers.
- `vite.config.ts`: Vite base and SPA 404 plugin.
- `public/resume.yaml`: single source of truth for website content and PDF content.
