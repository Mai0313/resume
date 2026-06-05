<div align="center" markdown="1">

# 个人简历

[![React](https://img.shields.io/badge/-React_19-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/-TypeScript_5.6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![license](https://img.shields.io/badge/License-MIT-green.svg?labelColor=gray)](https://github.com/Mai0313/resume/blob/main/LICENSE)
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/Mai0313/resume/pulls)
[![contributors](https://img.shields.io/github/contributors/Mai0313/resume.svg)](https://github.com/Mai0313/resume/graphs/contributors)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FMai0313%2Fresume&env=VITE_WEBSITE_TITLE,VITE_RESUME_FILE,VITE_RESUME_PDF_PATH,VITE_ROOT_PATH&project-name=resume-web&repository-name=resume-web&skippable-integrations=1)

</div>

这是一个用 Vite、React 19、Tailwind CSS v4 和 [HeroUI v3](https://heroui.com) 构建的个人简历网站。网页简历和可下载的 PDF 共用同一份 rendercv 兼容 YAML，因此简历内容只需要维护一份，同时可以部署到 GitHub Pages、Vercel 或 Docker。

## 功能特性

- 以 YAML 驱动简历内容，来源可以是 `public/resume.yaml`、GitHub Gist 或任何 raw YAML URL。
- 提供七种 rendercv entry renderer，覆盖 experience、education、publications、projects、skills、bullets 和 text sections。
- 可下载的 `public/resume.pdf` 由同一份 YAML 通过 [rendercv](https://github.com/rendercv/rendercv) 生成。
- Responsive home 和 resume pages，包含 WebGL `Threads` 背景、`DecryptedText` headline animation、theme switching 和 Framer Motion transitions。
- Lazy-loaded route bundles 让 resume rendering 和 YAML parsing 不会进入 home page 的 initial load。
- 通过 `VITE_ROOT_PATH` 支持 subpath-aware routing 和 asset paths，适合 GitHub Pages。

## 快速开始

前置需求：

- Node.js 18 或更新版本。
- Yarn，与 repo 内 committed `yarn.lock` 一致。
- 只有在使用 `make pdf` 重新生成 PDF 时才需要 [uv](https://docs.astral.sh/uv/)。

```bash
yarn install
cp .env.example .env
yarn dev
```

Dev server 会跑在 Vite 默认 port，通常是 `http://localhost:5173`。

常用 commands：

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

## 配置

从 `.env.example` 创建 `.env`，并设置 Vite environment variables：

```bash
VITE_WEBSITE_TITLE=Mai
VITE_RESUME_FILE=resume.yaml
VITE_RESUME_PDF_PATH=resume.pdf
# VITE_ROOT_PATH=/resume
```

`VITE_WEBSITE_TITLE` 会在 module load 时检查，必填。`VITE_RESUME_FILE` 是可选项，空值时 `/resume` route 和 nav item 会被隐藏。本地 resume files 会从 `public/` serve，GitHub Gist URLs 和 raw YAML URLs 则会直接 fetch。`VITE_RESUME_PDF_PATH` 默认是 `/resume.pdf`；local paths 会依 `VITE_ROOT_PATH` 加上 prefix，以支持 subpath deployments。

部署到 `https://<user>.github.io/resume/` 这类 GitHub Pages subpath 时，设置 `VITE_ROOT_PATH=/resume`。如果部署在 root domain，保持未设置即可。

## 简历内容

编辑 `public/resume.yaml` 来更新简历。这份文件采用 [rendercv YAML schema](https://docs.rendercv.com/user_guide/yaml_input_structure)，`cv` block 放内容，`design` block 放 PDF styling，另外可选择加入 `settings`。

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

Entry type 会依每个 section 的第一个 entry 自动识别，不依 section name：

| Entry type       | Required fields       | Typical sections                           |
| ---------------- | --------------------- | ------------------------------------------ |
| ExperienceEntry  | `company`, `position` | Work experience, volunteer work            |
| EducationEntry   | `institution`, `area` | Education                                  |
| PublicationEntry | `title`, `authors`    | Publications                               |
| NormalEntry      | `name`                | Projects, awards, certificates, references |
| OneLineEntry     | `label`, `details`    | Skills, languages, interests               |
| BulletEntry      | `bullet`              | Simple bullet lists                        |
| TextEntry        | plain string          | Summary or paragraph sections              |

重要 YAML 行为：

- Section order 会跟 YAML key order 一致。
- `Languages` OneLine section 会被 hoist 到 resume header，并从 main section list 跳过。
- Web-only list fields 像 `keywords`、`roles` 和 `courses` 必须在 YAML 写成 comma-separated strings，例如 `keywords: "TypeScript, React, Vite"`。rendercv 可能会在 list-valued custom fields 上失败，而网站会在 runtime 把这些字符串 normalize 成 arrays。

## 简历 PDF

`public/resume.pdf` 由 `public/resume.yaml` 生成并 commit，让 static hosts 可以直接 serve。

```bash
make pdf
git add public/resume.yaml public/resume.pdf
git commit -m "docs: update resume content"
```

`make pdf` 会通过 `uvx` 在 isolated environment 执行 rendercv。第一次会下载 rendercv 和 Typst，后续通常会比较快。

GitHub Actions 在 GitHub Pages deployment 期间会重新生成 PDF，作为 safety net。Vercel 只跑 `yarn install && yarn build`，所以 Vercel 会 serve committed `public/resume.pdf`；更新简历内容后，push 前要先重新生成并 commit PDF。

## 部署

GitHub Pages：

- `.github/workflows/deploy.yml` 会在 push 到 `main`、`master` 和 `v*` tags 时执行。
- Workflow 会跑 `make pdf`，设置 `VITE_ROOT_PATH=/${{ github.event.repository.name }}`，用 `yarn build` build，并通过 GitHub Pages 部署 `dist/`。
- Repository settings 里的 Pages source 要设为 GitHub Actions。

Vercel：

- Import repository。
- 设置 `VITE_WEBSITE_TITLE`、`VITE_RESUME_FILE`、`VITE_RESUME_PDF_PATH`，以及可选的 `VITE_ROOT_PATH`。
- `vercel.json` 只会把没有 extension 的 routes rewrite 到 SPA，因此 `/resume.pdf` 和 `/resume.yaml` 这类文件会以 static assets serve。

Docker：

```bash
docker compose up -d
docker compose logs -f
docker compose down
```

Runtime image 使用 Node.js 20，会 build Vite app，并执行 `yarn preview --host=0.0.0.0 --port=3000`，映射到 host port `5173`。

## 更多文档

- [CONTRIBUTING.md](CONTRIBUTING.md) 说明 local development、CI、project layout 和 PR conventions。
- [CLAUDE.md](CLAUDE.md) 提供 AI coding agents 使用的精简 project-specific notes。

## 授权

依据 [MIT license](LICENSE) 授权。
