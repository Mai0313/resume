# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn dev              # dev server on port 5173
yarn build            # tsc && vite build
yarn check            # tsc --noEmit && prettier --write . && eslint --fix (run before commit)
yarn type-check       # tsc --noEmit only
yarn preview          # preview production build
yarn deploy           # build + gh-pages push (manual GitHub Pages deploy)

make pdf              # regenerate public/resume.pdf from public/resume.yaml via rendercv.
                      # Requires uv. First run ~1 min (installs rendercv+Typst); subsequent ~1-2s.
                      # Run after editing YAML, then commit BOTH resume.yaml and resume.pdf.
make fmt              # alias for `yarn check`
make clean            # removes dist/target/cache and rendercv_output, keeps public/resume.pdf
```

No test runner is configured — quality is enforced via TypeScript strict mode + ESLint + Prettier.

## Architecture: single-YAML, dual-output

The website and the downloadable PDF are both rendered from **the same `public/resume.yaml`** using the [rendercv YAML schema](https://docs.rendercv.com/user_guide/yaml_input_structure). The website parses the YAML at runtime in the browser; the PDF is generated ahead of time by `rendercv` (Typst-based) and committed to git as `public/resume.pdf`.

This drives three load-bearing design choices:

1. **Entry-type dispatch, not section-name dispatch.** `detectEntryType()` in `src/utils/resumeLoader.ts:236` inspects the first entry's shape (fields like `company`+`position`, `institution`, `title`+`authors`, `label`+`details`, `bullet`, `name`) and picks one of seven renderers in `src/components/ResumeSections/`. Adding a new YAML section just works — no code changes needed as long as its entries match an existing type. `ResumeContent.tsx:63` does the routing via a switch statement.

2. **Section order follows YAML key order.** `loadResumeData()` captures `Object.keys(cv.sections)` into `sectionOrder` (JS preserves insertion order on string-keyed objects). `ResumeContent.tsx:392` maps over `sectionOrder` to render. Renaming or reordering in YAML is the only way to change display order.

3. **List-valued custom fields must be comma-separated strings in YAML.** `keywords`, `roles`, `courses` — the web UI treats them as arrays, but rendercv's Typst template engine crashes on list-valued custom fields. `normalizeEntries()` in `resumeLoader.ts:193` splits the strings into arrays at load time. If you write them as YAML lists, `make pdf` will fail.

## Non-obvious behaviors

- **`Languages` is a magic section name.** Any `OneLineEntry` section whose key matches `/languages/i` is hoisted into the header chip row and skipped from the main section list. Match is hard-coded at `ResumeContent.tsx:44` (`findLanguagesSection`). Renaming to e.g. `Spoken Languages` makes it render as a normal section.

- **`VITE_ROOT_PATH` controls Vite's `base`, React Router's `basename`, and local asset paths.** On GitHub Pages subpath deploys (`https://user.github.io/resume/`), a bare `/resume.yaml` fetches the wrong URL. `buildPath()` in `src/utils/pathUtils.ts` prefixes local resume/PDF paths; URLs pass through unchanged. `getBasename()` returns `""` for root deploys (not `"/"` — React Router treats those differently).

- **Pages are conditionally registered.** `App.tsx` only mounts `/resume` when `envHelpers.isResumeFileAvailable()` returns true; `siteConfig.navItems` in `src/config/site.ts` only includes items for configured pages. To add a new conditionally-rendered page: add an env check in `src/utils/env.ts`, gate the route in `App.tsx`, and gate the nav item in `src/config/site.ts`.

- **Required env var enforcement runs at module load.** `validateRequiredEnvVars()` in `src/utils/env.ts` throws synchronously if `VITE_WEBSITE_TITLE` is missing — the app won't even mount.

- **SPA 404 fallback for GitHub Pages.** The custom `createSpa404Plugin()` in `vite.config.ts` copies `dist/index.html` to `dist/404.html` at build time so direct URLs to subroutes resolve.

- **Vercel rewrite is extension-scoped.** `vercel.json` uses `/((?!.*\\.).*)` to rewrite only paths without a file extension to `index.html`. Without this, `/resume.pdf` would be masked by the SPA fallback.

- **Vercel does NOT regenerate the PDF** — it only runs `yarn install && yarn build`. GitHub Actions (`deploy.yml`) does run `make pdf` as a safety net. For Vercel, always `make pdf` locally and commit before pushing, or it serves a stale PDF.

## PIN protection

Optional `VITE_PIN_CODE` gates the `/resume` page via a modal. PIN length is auto-detected from the env var. URL param `?pin=xxx` auto-submits and is then stripped from history. Three wrong attempts trigger a 404 render via the FuzzyText component. All wired in `src/pages/resume.tsx`.

## Commit conventions

Enforced by the `semantic-pull-request.yml` workflow — **PR titles must follow [Conventional Commits](https://www.conventionalcommits.org/)** (`feat:`, `fix:`, `docs:`, `chore:`, etc.). Commit messages should follow the same format. English only.

## Key files

- `src/utils/resumeLoader.ts` — rendercv schema types, entry-type detection, YAML loader, social URL templates, list-field normalization
- `src/components/ResumeContent.tsx` — header rendering, Languages hoist, section dispatch
- `src/components/ResumeSections/SectionCard.tsx` — shared card shell + `getSectionConfig()` registry mapping section names to icons/colors (case-insensitive, generic fallback)
- `src/utils/env.ts` — all `VITE_*` env var access, centralized with validation/defaults
- `src/utils/pathUtils.ts` — `VITE_ROOT_PATH` helpers (`buildPath`, `getBasename`)
- `vite.config.ts` — reads `VITE_ROOT_PATH` for `base`, installs SPA 404 plugin
- `public/resume.yaml` — single source of truth for both web UI and PDF
