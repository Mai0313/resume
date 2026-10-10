<div align="center" markdown="1">

# 個人履歷

[![React](https://img.shields.io/badge/-React_19-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/-TypeScript_5.6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![license](https://img.shields.io/badge/License-MIT-green.svg?labelColor=gray)](https://github.com/Mai0313/resume/blob/main/LICENSE)
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/Mai0313/resume/pulls)
[![contributors](https://img.shields.io/github/contributors/Mai0313/resume.svg)](https://github.com/Mai0313/resume/graphs/contributors)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FMai0313%2Fresume&env=VITE_WEBSITE_TITLE,VITE_RESUME_FILE,VITE_RESUME_PDF_PATH,VITE_ROOT_PATH&project-name=resume-web&repository-name=resume-web&skippable-integrations=1)

</div>

這是一個用 Vite、React 19、Tailwind CSS v4 和 [HeroUI v3](https://heroui.com) 建立的個人履歷網站。網頁履歷和可下載的 PDF 共用同一份 rendercv 相容 YAML，因此履歷內容只需要維護一份，同時可以部署到 GitHub Pages、Vercel 或 Docker。

## 功能特色

- 以 YAML 驅動履歷內容，來源可以是 `public/resume.yaml`、GitHub Gist 或任何 raw YAML URL。
- 提供七種 rendercv entry renderer，涵蓋 experience、education、publications、projects、skills、bullets 和 text sections。
- 可下載的 `public/resume.pdf` 由同一份 YAML 透過 [rendercv](https://github.com/rendercv/rendercv) 產生。
- 響應式的首頁和履歷頁，包含 WebGL 動態背景、動態標題，以及淺色／深色主題切換。
- 透過 `VITE_ROOT_PATH` 支援 subpath-aware routing 和 asset paths，適合 GitHub Pages。

## 快速開始

前置需求：

- Node.js 20.19+ 或 22.13+。
- npm，與 repo 內 committed `package-lock.json` 一致。
- 只有在使用 `make pdf` 重新產生 PDF 時才需要 [uv](https://docs.astral.sh/uv/)。

```bash
npm install
cp .env.example .env
npm run dev
```

Dev server 會跑在 Vite 預設 port，通常是 `http://localhost:5173`。

## 設定

在 `.env` 設定變數；每個變數的說明都在 `.env.example`。

`VITE_WEBSITE_TITLE` 必填。`VITE_RESUME_FILE` 是選填，空值時 `/resume` route 和 nav item 會被隱藏。本機 resume files 會從 `public/` serve，GitHub Gist URLs 和 raw YAML URLs 則會直接 fetch。`VITE_RESUME_PDF_PATH` 預設為 `/resume.pdf`；local paths 會依 `VITE_ROOT_PATH` 加上 prefix，以支援 subpath deployments。

部署到 `https://<user>.github.io/resume/` 這類 GitHub Pages subpath 時，設定 `VITE_ROOT_PATH=/resume`。如果部署在 root domain，維持未設定即可。

## 履歷內容

編輯 `public/resume.yaml` 來更新履歷。這份檔案採用 [rendercv YAML schema](https://docs.rendercv.com/user_guide/yaml_input_structure)，`cv` block 放內容，`design` block 放 PDF styling，另外可選擇加入 `settings`。

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

Entry type 會依每個 section 的第一個 entry 自動偵測，不依 section name：

| Entry type       | Required fields       | Typical sections                           |
| ---------------- | --------------------- | ------------------------------------------ |
| ExperienceEntry  | `company`, `position` | Work experience, volunteer work            |
| EducationEntry   | `institution`, `area` | Education                                  |
| PublicationEntry | `title`, `authors`    | Publications                               |
| NormalEntry      | `name`                | Projects, awards, certificates, references |
| OneLineEntry     | `label`, `details`    | Skills, languages, interests               |
| BulletEntry      | `bullet`              | Simple bullet lists                        |
| TextEntry        | plain string          | Summary or paragraph sections              |

重要 YAML 行為：

- Section order 會跟 YAML key order 一致。
- `Languages` OneLine section 會被 hoist 到 resume header，並從 main section list 跳過。
- Web-only list fields 像 `keywords`、`roles` 和 `courses` 必須在 YAML 寫成 comma-separated strings，例如 `keywords: "TypeScript, React, Vite"`。rendercv 可能會在 list-valued custom fields 上失敗，而網站會在 runtime 把這些字串 normalize 成 arrays。

## 履歷 PDF

`public/resume.pdf` 由 `public/resume.yaml` 產生並 commit，讓 static hosts 可以直接 serve。

```bash
make pdf
git add public/resume.yaml public/resume.pdf
git commit -m "docs: update resume content"
```

`make pdf` 會透過 `uvx` 在 isolated environment 執行 rendercv。第一次會下載 rendercv 和 Typst，後續通常會比較快。

GitHub Actions 在 GitHub Pages deployment 期間會重新產生 PDF，作為 safety net。Vercel 只跑 `npm ci && npm run build`，所以 Vercel 會 serve committed `public/resume.pdf`；更新履歷內容後，push 前要先重新產生並 commit PDF。

## 部署

GitHub Pages：

- `.github/workflows/deploy.yml` 會在 push 到 `main`、`master` 和 `v*` tags 時執行。
- 這個 workflow 會把 `VITE_ROOT_PATH` 設為 `/<repository-name>`，其他 build 變數則寫在它的 `env` 區塊裡。
- Repository settings 裡的 Pages source 要設為 GitHub Actions。

Vercel：

- Import repository。
- 設定 `VITE_WEBSITE_TITLE`、`VITE_RESUME_FILE`、`VITE_RESUME_PDF_PATH`，以及可選的 `VITE_ROOT_PATH`。

Docker：

```bash
docker compose up -d
docker compose logs -f
docker compose down
```

網站會跑在 `http://localhost:5173`。

## 開發

本機開發環境、專案結構、commit 慣例、品質檢查和發布流程都在 [CONTRIBUTING.md](./.github/CONTRIBUTING.md)。

## 授權

依據 [MIT license](LICENSE) 授權。
