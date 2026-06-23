<div align="center" markdown="1">

# Personal Resume

[![React](https://img.shields.io/badge/-React_19-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/-TypeScript_5.6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![license](https://img.shields.io/badge/License-MIT-green.svg?labelColor=gray)](https://github.com/Mai0313/resume/blob/main/LICENSE)
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/Mai0313/resume/pulls)
[![contributors](https://img.shields.io/github/contributors/Mai0313/resume.svg)](https://github.com/Mai0313/resume/graphs/contributors)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FMai0313%2Fresume&env=VITE_WEBSITE_TITLE,VITE_RESUME_FILE,VITE_RESUME_PDF_PATH,VITE_ROOT_PATH&project-name=resume-web&repository-name=resume-web&skippable-integrations=1)

</div>

A personal resume website built with Vite, React 19, Tailwind CSS v4, and [HeroUI v3](https://heroui.com). The web resume and the downloadable PDF share one rendercv-compatible YAML file, so profile content stays in one place while the site can be deployed to GitHub Pages, Vercel, or Docker.

## Features

- YAML-driven resume content from `public/resume.yaml`, GitHub Gist, or any raw YAML URL.
- Seven rendercv entry renderers for experience, education, publications, projects, skills, bullets, and text sections.
- Downloadable `public/resume.pdf` generated from the same YAML with [rendercv](https://github.com/rendercv/rendercv).
- Responsive home and resume pages with a WebGL `Threads` background, `DecryptedText` headline animation, theme switching, and Framer Motion transitions.
- Lazy-loaded route bundles keep resume rendering and YAML parsing out of the home page's initial load.
- Subpath-aware routing and asset paths through `VITE_ROOT_PATH`, suitable for GitHub Pages.

## Quick Start

Prerequisites:

- Node.js 18 or newer.
- Yarn, as used by the committed `yarn.lock`.
- [uv](https://docs.astral.sh/uv/) only when regenerating the PDF with `make pdf`.

```bash
yarn install
cp .env.example .env
yarn dev
```

The dev server runs on Vite's default port, usually `http://localhost:5173`.

Useful commands:

```bash
yarn dev              # start the Vite dev server
yarn build            # tsc && vite build
yarn preview          # preview the production build
yarn type-check       # TypeScript only
yarn format:nofix     # Prettier check
yarn lint:nofix       # ESLint check
yarn check            # type-check, format, and lint with fixes

make pdf              # regenerate public/resume.pdf from public/resume.yaml
make run              # shortcut for yarn dev
make fmt              # shortcut for yarn check
make clean            # remove generated output/caches, then prune Git refs and GC
```

## Configuration

Create `.env` from `.env.example` and set the Vite environment variables:

```bash
VITE_WEBSITE_TITLE=Mai
VITE_RESUME_FILE=resume.yaml
VITE_RESUME_PDF_PATH=resume.pdf
# VITE_ROOT_PATH=/resume
```

`VITE_WEBSITE_TITLE` is required at module load. `VITE_RESUME_FILE` is optional; when it is empty, the `/resume` route and nav item are hidden. Local resume files are served from `public/`, while GitHub Gist URLs and raw YAML URLs are fetched directly. `VITE_RESUME_PDF_PATH` defaults to `/resume.pdf`; local paths are prefixed with `VITE_ROOT_PATH` for subpath deployments.

Set `VITE_ROOT_PATH=/resume` when deploying to a GitHub Pages subpath such as `https://<user>.github.io/resume/`. Leave it unset for root-domain deployments.

## Resume Content

Edit `public/resume.yaml` to change the resume. The file follows the [rendercv YAML schema](https://docs.rendercv.com/user_guide/yaml_input_structure), with a `cv` block for content, a `design` block for PDF styling, and optional `settings`.

```yaml
cv:
  name: "Your Name"
  headline: "Your Title"
  location: "City, Country"
  email: "you@example.com"
  social_networks:
    - network: GitHub
      username: your-handle
  sections:
    Experience:
      - company: Acme
        position: Engineer
        start_date: 2024-01
        highlights:
          - Built useful systems.
    Education: []
    Skills: []

design:
  theme: engineeringresumes
```

Entry type is detected from the first entry in each section, not from the section name:

| Entry type       | Required fields       | Typical sections                           |
| ---------------- | --------------------- | ------------------------------------------ |
| ExperienceEntry  | `company`, `position` | Work experience, volunteer work            |
| EducationEntry   | `institution`, `area` | Education                                  |
| PublicationEntry | `title`, `authors`    | Publications                               |
| NormalEntry      | `name`                | Projects, awards, certificates, references |
| OneLineEntry     | `label`, `details`    | Skills, languages, interests               |
| BulletEntry      | `bullet`              | Simple bullet lists                        |
| TextEntry        | plain string          | Summary or paragraph sections              |

Important YAML behavior:

- Section order follows YAML key order.
- A `Languages` OneLine section is hoisted into the resume header and skipped from the main section list.
- Web-only list fields such as `keywords`, `roles`, and `courses` must be comma-separated strings in YAML, for example `keywords: "TypeScript, React, Vite"`. rendercv can fail on list-valued custom fields, and the website normalizes these strings to arrays at runtime.

## Resume PDF

`public/resume.pdf` is generated from `public/resume.yaml` and committed so static hosts can serve it directly.

```bash
make pdf
git add public/resume.yaml public/resume.pdf
git commit -m "docs: update resume content"
```

`make pdf` runs rendercv through `uvx` in an isolated environment. The first run downloads rendercv and Typst, while later runs are usually faster.

GitHub Actions regenerates the PDF during the GitHub Pages deployment as a safety net. Vercel only runs `yarn install && yarn build`, so Vercel serves the committed `public/resume.pdf`; regenerate and commit it before pushing resume content changes.

## Deployment

GitHub Pages:

- `.github/workflows/deploy.yml` runs on pushes to `main`, `master`, and `v*` tags.
- The workflow runs `make pdf`, sets `VITE_ROOT_PATH=/${{ github.event.repository.name }}`, builds with `yarn build`, and deploys `dist/` through GitHub Pages.
- In repository settings, set Pages source to GitHub Actions.

Vercel:

- Import the repository.
- Set `VITE_WEBSITE_TITLE`, `VITE_RESUME_FILE`, `VITE_RESUME_PDF_PATH`, and optionally `VITE_ROOT_PATH`.
- `vercel.json` rewrites only extensionless routes to the SPA, so files such as `/resume.pdf` and `/resume.yaml` are served as static assets.

Docker:

```bash
docker compose up -d
docker compose logs -f
docker compose down
```

The runtime image uses Node.js 20, builds the Vite app, and runs `yarn preview --host=0.0.0.0 --port=3000`, mapped to host port `5173`.

## More Docs

- [CONTRIBUTING.md](.github/CONTRIBUTING.md) covers local development, CI, project layout, and PR conventions.
- [CLAUDE.md](CLAUDE.md) contains concise project-specific notes for AI coding agents.

## License

Licensed under the [MIT license](LICENSE).
