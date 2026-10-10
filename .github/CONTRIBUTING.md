# Contributing

Contributions are welcome. Keep changes focused, update docs when behavior changes, and use Conventional Commits for commit messages and PR titles.

## Local Setup

Prerequisites:

- Node.js 20.19+ or 22.13+.
- npm, matching the committed `package-lock.json`.
- [uv](https://docs.astral.sh/uv/) only when regenerating `public/resume.pdf`.

```bash
git clone https://github.com/<your-username>/resume.git
cd resume
npm install
cp .env.example .env
npm run dev
```

Common commands:

```bash
npm run dev           # start the Vite dev server
npm run build         # tsc && vite build
npm run preview       # preview the production build
npm run type-check    # tsc --noEmit
npm run format        # prettier --write .
npm run format:nofix  # prettier --check .
npm run lint          # eslint --fix
npm run lint:nofix    # eslint
npm run check         # tsc --noEmit && prettier --write . && eslint --fix

make pdf              # regenerate public/resume.pdf from public/resume.yaml
make run              # npm run dev
make fmt              # npm run check
make clean            # remove generated output/caches, then prune Git refs and GC
```

If you edit `public/resume.yaml`, run `make pdf` and commit `public/resume.pdf` with the YAML. GitHub Pages deployment regenerates the PDF as a safety net, but Vercel serves the committed PDF.

## Project Layout

- `src/pages/` contains the lazy-loaded home and resume route components.
- `src/components/` contains reusable UI, including `navbar.tsx`, `ResumeContent.tsx`, `ResumeHeader.tsx`, `Threads/`, `DecryptedText/`, and the `ResumeSections/` renderers.
- `src/components/shared/` contains small cross-section primitives such as `BulletList`, `DateRange`, `ExternalLink`, `ItemCard`, and shared icons.
- `src/utils/` contains environment access, path helpers, resume compatibility exports, and animation variants.
- `src/utils/resume/` contains focused resume modules for schema types, YAML loading, entry-type detection, list-field normalization, source resolution, and social URLs.
- `src/config/site.ts` defines navigation items and external links from the current environment.
- `src/styles/` contains the global stylesheet importing Tailwind CSS v4 and `@heroui/styles`.
- `public/` contains static assets, including `resume.yaml` and the generated `resume.pdf`.
- `.github/workflows/` contains CI, security scanning, GitHub Pages deployment, release drafting, labeler, and Docker image workflows.
- `docker/` and `docker-compose.yaml` contain the production Docker setup.
- `.devcontainer/` contains the VS Code Dev Container setup.
- `CLAUDE.md` contains concise project-specific notes for AI coding agents.

## Workflow

1. Create a focused branch.
2. Make the change and keep unrelated formatting churn out of the diff.
3. Update docs when commands, environment variables, resume schema behavior, deployment behavior, or public UI behavior changes.
4. Run the relevant local checks before opening a PR.
5. Use a Conventional Commits title, such as `fix: correct resume PDF path handling`.
6. Open a PR and wait for CI to pass before requesting review.

Commit and PR title format:

```text
<type>(<scope>): <description>
```

Common types are `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, and `ci`.

## Testing And Quality Gates

There is no dedicated test runner. Quality is enforced through TypeScript, Prettier, ESLint, builds, and GitHub Actions.

Run these before submitting code changes:

```bash
npm run type-check
npm run format:nofix
npm run lint:nofix
npm run build
```

Use `npm run check` when you want TypeScript plus auto-format and auto-fix in one command.

CI coverage:

- `code-quality-check.yml` runs `npm run format:nofix` and `npm run lint:nofix` on pull requests.
- `deploy.yml` runs `make pdf`, `npm ci`, and `npm run build` before deploying GitHub Pages.
- `code_scan.yml` runs Gitleaks, TruffleHog, CodeQL, and Trivy.
- `semantic-pull-request.yml` validates PR titles against Conventional Commits.
- `auto_review_merge.yml` runs dependency review and auto-merges passing Dependabot PRs.
- `auto_labeler.yml` labels PRs from branch names and changed paths.
- `build_image.yml` builds and publishes the Docker image to GHCR on pushes to `main`, `master`, and `v*` tags.

## Release Process

Releases are drafted automatically by `release_drafter.yml` on pushes to `main` or `master`. It uses `orhun/git-cliff-action` to generate the next tag and changelog body, then creates a draft GitHub release with `softprops/action-gh-release`.

GitHub Pages deployment runs on pushes to `main`, `master`, and `v*` tags.

## Issues

When reporting a bug, include steps to reproduce, expected behavior, actual behavior, browser and OS details when relevant, and screenshots for UI issues.

## License

By contributing, you agree that your contributions are licensed under the [MIT License](../LICENSE).
