<div align="center" markdown="1">

# 個人履歷

[![React](https://img.shields.io/badge/-React_18-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/-TypeScript_5.6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![license](https://img.shields.io/badge/License-MIT-green.svg?labelColor=gray)](https://github.com/Mai0313/resume/tree/master?tab=License-1-ov-file)
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/Mai0313/resume/pulls)
[![contributors](https://img.shields.io/github/contributors/Mai0313/resume.svg)](https://github.com/Mai0313/resume/graphs/contributors)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FMai0313%2Fresume&env=VITE_WEBSITE_TITLE,VITE_RESUME_FILE,VITE_RESUME_PDF_PATH,VITE_ROOT_PATH&project-name=resume-web&repository-name=resume-web&skippable-integrations=1)

</div>

這是一個使用 Vite 與 HeroUI 框架建立的個人網站，適合部署到 GitHub Pages。

## 功能特色

### 🎨 視覺效果

- **動態首頁**：使用 WebGL `Threads` 背景（OGL）搭配 `DecryptedText` 字元揭示動畫呈現網站標題
- **現代化 UI**：HeroUI 元件、Tailwind CSS v4 design token，搭配 Framer Motion 處理頁面與區塊轉場
- **響應式設計**：內建深色/淺色主題切換（透過 `@heroui/use-theme` 在導覽列切換），版面完全響應式

### 📄 履歷系統

- **彈性資料來源**：支援本機 YAML 檔案、GitHub Gist 或任何可存取的 Raw URL
- **模組化區塊**：7 個 entry-type renderer（Experience / Education / Publication / Normal / OneLine / Bullet / Text）涵蓋所有常見履歷區塊
- **PDF 透過 rendercv 產生**：同一份 YAML 透過 [rendercv](https://github.com/rendercv/rendercv)（Typst-based）排版成專業 PDF，commit 到 repo 裡，部署時也會自動重新生成
- **rendercv Schema**：採用 [rendercv YAML schema](https://docs.rendercv.com/user_guide/yaml_input_structure)，同一份檔案就是網站與 PDF 的唯一來源

### ⚙️ 智慧配置

- **條件顯示**：根據環境變數自動顯示或隱藏頁面
  - 履歷頁需設定 `VITE_RESUME_FILE`
- **自動導覽更新**：導覽列動態更新，只顯示已啟用的頁面
- **子路徑支援**：支援部署到子路徑（如 GitHub Pages）

## 技術堆疊

- [Vite 6.3.5](https://vitejs.dev/guide/) - 快速的前端建置工具
- [React 18](https://react.dev/) - UI 函式庫
- [TypeScript 5.6.3](https://www.typescriptlang.org) - 型別安全的 JavaScript
- [React Router 7.12.0](https://reactrouter.com/) - 前端路由
- [HeroUI](https://heroui.com) - React UI primitives（`@heroui/button`、`@heroui/card`、`@heroui/system`、`@heroui/theme`、`@heroui/use-theme`）
- [Tailwind CSS 4.1.18](https://tailwindcss.com) - CSS 框架（透過 `@tailwindcss/vite` 載入）
- [Framer Motion 12.15](https://www.framer.com/motion) - React 動畫庫
- [OGL 1.0](https://oframe.github.io/ogl/) - WebGL renderer，用在首頁 `Threads` 背景
- [js-yaml 4.1](https://github.com/nodeca/js-yaml) - YAML 解析器（在 `resumeLoader.ts` 內做 lazy load）
- [tailwind-merge](https://github.com/dcastil/tailwind-merge) + [clsx](https://github.com/lukeed/clsx) - 透過 `src/lib/utils.ts` 的 `cn()` helper 包出來用
- [rendercv](https://github.com/rendercv/rendercv) - Typst-based CV 排版工具,從同一份 YAML 產生可下載的 PDF

## 環境設定

### 環境變數

建立一個 `.env` 檔案並設定下列變數：

```bash
# 必填：網站標題
VITE_WEBSITE_TITLE=Mai

# 選填：履歷檔 - 若未設定，履歷頁面會被隱藏
# 支援本機檔案與 URL
# 本機檔案範例：
VITE_RESUME_FILE=resume.yaml
# GitHub Gist 範例：
# VITE_RESUME_FILE=https://gist.github.com/username/gist_id
# Raw URL 範例：
# VITE_RESUME_FILE=https://raw.githubusercontent.com/user/repo/main/resume.yaml

# 選填：履歷 PDF 下載路徑
# 預設值：/resume.pdf (對應 public/resume.pdf)
VITE_RESUME_PDF_PATH=/resume.pdf
```

可選：自訂部署根路徑（適用於 GitHub Pages 子路徑）。若部署於 `https://<user>.github.io/<repo>`，請在 `.env` 設定：

```bash
VITE_ROOT_PATH=/resume
```

**重要說明：**

- **智慧頁面顯示**：頁面僅在對應環境變數正確設定時才會出現在導覽選單與路由中
  - 履歷頁（`/resume`）需設定 `VITE_RESUME_FILE`

- **路徑設定**：
  - 部署到根目錄（如 `https://yourdomain.com`）：無需設定 `VITE_ROOT_PATH`
  - 部署到子路徑（如 `https://username.github.io/resume`）：設定 `VITE_ROOT_PATH=/resume`

### 安裝依賴套件

建議使用 `yarn`：

```bash
yarn install
```

或使用 `npm`：

```bash
npm install
```

### 啟動開發伺服器

```bash
yarn dev
```

或：

```bash
npm run dev
```

## 頁面功能

### 首頁（`/`）

- WebGL `Threads` 動態背景（lazy load,不擋首屏渲染）
- 以 `DecryptedText` 字元揭示動畫顯示網站標題（`VITE_WEBSITE_TITLE`）
- 「View Resume」按鈕僅在設定 `VITE_RESUME_FILE` 時顯示；GitHub 連結固定顯示
- 響應式版面,主題切換功能整合在浮動導覽列

### 履歷頁（`/resume`）

- 條件式顯示：僅在設定 `VITE_RESUME_FILE` 後才會出現
- 彈性的履歷載入方式：
  - 本機 YAML 檔案：`resume.yaml`、`my-resume.yaml`（自 `public/` 目錄載入）
  - GitHub Gist：Gist 連結會自動轉為原始檔格式
  - Raw URL：任何可存取的 YAML 檔案網址
- 以 YAML 駆動的履歷資料管理
- 結構化顯示個人資訊、學歷、工作經歷等內容
- PDF 下載：提供按鈕下載履歷 PDF（使用 `public/resume.pdf`）
- 響應式設計與動畫效果

## 自訂設定

### 設定頁面顯示

網站會依據環境變數自動顯示/隱藏頁面：

- 履歷頁：僅在設定 `VITE_RESUME_FILE` 後顯示
- 導覽列：動態更新，只顯示可用的頁面

### 編輯履歷內容

你有多種方式設定履歷：

#### 選項一：本機 YAML 檔

編輯 `public/resume.yaml`，或在 `public/` 目錄建立自己的 YAML 檔：

```bash
# 在 .env 檔中
VITE_RESUME_FILE=my-resume.yaml
```

#### 選項二：GitHub Gist（推薦）

建立一個包含履歷 YAML 的 GitHub Gist，並使用該 Gist 連結：

```bash
# 在 .env 檔中
VITE_RESUME_FILE=https://gist.github.com/your-username/your-gist-id
```

使用 GitHub Gist 的好處：

- 不需重新部署即可更新履歷
- 履歷版本控管
- 可選擇公開或私密

#### 選項三：Raw URL

使用任何可存取的 YAML 檔案網址：

```bash
# 在 .env 檔中
VITE_RESUME_FILE=https://raw.githubusercontent.com/user/repo/main/resume.yaml
```

### 履歷 YAML 格式

履歷採用 [rendercv YAML schema](https://docs.rendercv.com/user_guide/yaml_input_structure)。**同一份 YAML 同時驅動網站與可下載的 PDF**。

**Top-level 結構**：

```yaml
cv:
  name: "Your Name"
  headline: "Your Title"
  location: "City, Country"
  email: "you@example.com"
  photo: "https://..." # 網站用 URL，rendercv 也接受本地路徑
  social_networks:
    - network: LinkedIn # rendercv 內建 network 名稱之一
      username: your-handle
    - network: GitHub
      username: your-handle
  sections:
    Experience: # section 名稱任取,entry 型別自動偵測
      - company: Acme
        position: Engineer
        start_date: 2024-01
        highlights: [...]
    Education: [...]
    Publications: [...] # 必填 `title` + `authors`
    Projects: [...]
    Skills: [...]
    Languages: [...]

design: # PDF 外觀設定 — 網站會忽略
  theme: engineeringresumes
  # colors, typography, section_titles, templates 等

settings:
  bold_keywords: [...] # PDF 裡自動把這些關鍵字加粗
```

**Entry 型別**（每個 section 根據第一個 entry 的欄位自動判斷型別）：

| Entry type       | 必填欄位              | 用在                                       |
| ---------------- | --------------------- | ------------------------------------------ |
| ExperienceEntry  | `company`, `position` | 工作經驗、志工經驗                         |
| EducationEntry   | `institution`, `area` | 教育背景                                   |
| PublicationEntry | `title`, `authors`    | 發表著作                                   |
| NormalEntry      | `name`                | Projects, Awards, Certificates, References |
| OneLineEntry     | `label`, `details`    | Skills, Languages, Interests               |
| BulletEntry      | `bullet`              | 單純 bullet list                           |
| TextEntry        | 純字串                | 段落型 section（例如 Summary）             |

**網站專用自訂欄位**（網站會讀但 rendercv 在 PDF 裡會忽略）：ExperienceEntry 的 `url` / `description`；EducationEntry 的 `url` / `courses`；NormalEntry 的 `url` / `keywords` / `roles` / `entity` / `issuer`；OneLineEntry 的 `keywords`。

**重要注意事項**：

- **List 型自訂欄位必須寫成 comma-separated 字串**（例如 `keywords: "Python, TypeScript, Rust"`）。loader 會在 runtime 自動轉回 array。這是 rendercv template engine 的限制 — 若寫成 YAML list 則 `rendercv render` 會 crash。
- **Section 顯示順序 = YAML key 順序**。Parser 用 `Object.keys(cv.sections)`，你寫什麼順序就渲染什麼順序。
- **`Languages` 是 magic section name**。任何 key 叫 `Languages`(大小寫不敏感)的 `OneLineEntry` section 會被搬到 header 的 chip 區顯示,不再出現在主 section 列表裡。這個 match 寫死在 `ResumeContent.tsx`,如果改名成 `Spoken Languages` 之類就會被當作普通 section 渲染。
- 完整範例請見 `public/resume.yaml`。

### 履歷 PDF

PDF 由 [rendercv](https://github.com/rendercv/rendercv) 從同一份 `public/resume.yaml` 產生，commit 到 `public/resume.pdf`。

**前置需求**：本機安裝 [uv](https://docs.astral.sh/uv/)。

**更新 PDF**（編輯 YAML 之後跑一次）：

```bash
make pdf                 # 透過 uvx 執行 rendercv（isolated env，不需要全域安裝）
git add public/resume.yaml public/resume.pdf
git commit -m "docs: update resume content"
```

第一次 `make pdf` 要等一分鐘左右（uvx 下載 rendercv + Typst），之後只要 1–2 秒。

**客製 PDF 外觀**：編輯 `public/resume.yaml` 裡的 `design:` 區塊。完整的 theme、配色、字型、template 選項見 [rendercv design options](https://docs.rendercv.com/user_guide/yaml_input_structure/design/)。

## 部署

### 部署到 GitHub Pages

#### 方式一：自動部署（推薦）

專案已配置 GitHub Actions 自動部署工作流程（`.github/workflows/deploy.yml`）：

1. 推送程式碼到 `main` 或 `master` 分支
2. GitHub Actions 會自動：

- 安裝 uv 並用 `make pdf` 從 `public/resume.yaml` 重新產生 `public/resume.pdf`（保險機制,以防你忘記 commit 最新 PDF）
- 執行建置（`yarn build`）
- 部署到 GitHub Pages

無需手動執行任何指令！

**注意事項**：

- 確保在 GitHub 倉庫設定中啟用 GitHub Pages
- 設定 Pages 的部署來源為「GitHub Actions」
- GitHub Actions 會自動使用 `VITE_ROOT_PATH=/<倉庫名稱>` 進行建置
- PDF 重新生成使用 [astral-sh/setup-uv@v7](https://github.com/astral-sh/setup-uv)；rendercv 失敗時 deploy 會直接中斷,避免上線壞內容

#### 方式二：手動部署

```bash
yarn build
yarn deploy
```

手動部署注意事項：

- 將 `.env` 中的 `VITE_ROOT_PATH` 設為你的倉庫名稱（例如 `/resume`）
- `package.json` 已設定 `homepage`，而 Vite 的 `base` 亦由 `VITE_ROOT_PATH` 控制
- `yarn deploy` 會使用 `gh-pages` 套件將 `dist` 目錄推送到 `gh-pages` 分支

### 部署到 Vercel

此專案已包含 `vercel.json`，可直接在 Vercel 上部署：

1. 在 Vercel 上匯入你的 GitHub 倉庫
2. 設定環境變數（參考 `.env` 範例）
3. Vercel 會自動偵測 Vite 專案並完成部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FMai0313%2Fresume)

**Vercel 上的 PDF 行為**：Vercel 只跑 `yarn install && yarn build`，**不會** 重新產生 PDF，上線的就是 git 裡 committed 的 `public/resume.pdf`。所以改完 YAML 之後務必先在本地跑 `make pdf` 再 commit、再 push，否則 Vercel 會供應舊的 PDF。

**`vercel.json` rewrite 說明**：SPA 的 rewrite 只套用在沒有副檔名的路徑（`/((?!.*\\.).*)`）,確保 `/resume.pdf`、`/resume.yaml`、`/favicon.ico` 等靜態檔案會直接被 serve，不會被 `index.html` 蓋掉（檔案不存在時也會正確回 404 而不是偽裝的 HTML）。

### 使用 Docker 部署

專案包含 Docker 支援，方便本機開發或伺服器部署：

#### 使用 Docker Compose（推薦）

```bash
# 使用 Docker Compose 建置並啟動
docker compose up -d

# 查看日誌
docker compose logs -f

# 停止服務
docker compose down
```

Docker Compose 配置：

- **建置階段**：使用多階段建置優化映像大小
- **執行模式**：使用 `yarn preview` 執行預覽伺服器
- **Port 映射**：容器內 Port 3000 映射到主機 Port 5173
- **環境變數**：自動載入 `.env` 檔案
- **存取位址**：`http://localhost:5173`

#### 手動建置 Docker 映像

```bash
# 建置映像
docker build -f docker/Dockerfile -t resume:latest .

# 執行容器
docker run -d -p 5173:3000 --env-file .env resume:latest
```

**Docker 注意事項**：

- 確保在專案根目錄存在 `.env` 檔案
- Docker 映像使用 Node.js 20 與 Python 3.10
- 建置會自動執行 `yarn install` 和 `yarn build`

## 專案結構

```
.
├── .devcontainer/                    # Dev Container 配置
├── docker/                           # Docker 配置（Dockerfile）
├── .github/workflows/                # GitHub Actions
├── public/                           # 靜態資源,直接 serve
│   ├── resume.yaml                   # 單一來源（同時驅動網站與 PDF）
│   ├── resume.pdf                    # 預先 render 好的 PDF（commit 到 git,由 `make pdf` 重新生成）
│   ├── favicon.ico
│   ├── robots.txt
│   └── vite.svg
├── src/                              # 原始碼
│   ├── components/                   # 可重用元件
│   │   ├── ErrorBoundary.tsx         # 頂層 error boundary
│   │   ├── navbar.tsx                # 浮動玻璃風導覽列 + 主題切換（用 @heroui/use-theme）
│   │   ├── ResumeContent.tsx         # 標頭、Languages 上提、section dispatch
│   │   ├── DecryptedText/            # 字元 scramble 揭示動畫（首頁標題用）
│   │   │   └── DecryptedText.tsx
│   │   ├── Threads/                  # WebGL 背景 shader（OGL）；首頁 lazy load
│   │   │   └── Threads.tsx
│   │   ├── AIChat/                   # 預留給後續的 AI 聊天功能（目前是空的）
│   │   ├── ResumeSections/           # 每一個 rendercv entry type 對應一支 renderer
│   │   │   ├── BulletSection.tsx     # BulletEntry renderer
│   │   │   ├── EducationSection.tsx  # EducationEntry renderer
│   │   │   ├── ExperienceSection.tsx # ExperienceEntry renderer（Work、Volunteer 等）
│   │   │   ├── NormalSection.tsx     # NormalEntry renderer（Projects、Awards、Certificates、References）
│   │   │   ├── OneLineSection.tsx    # OneLineEntry renderer（Skills、Interests 等）
│   │   │   ├── PublicationSection.tsx # PublicationEntry renderer
│   │   │   ├── SectionCard.tsx       # 共享卡片 + section name → icon/顏色 的對應
│   │   │   ├── TextSection.tsx       # TextEntry（段落型）renderer
│   │   │   └── index.ts
│   │   └── shared/                   # 共享的可重用子元件
│   │       ├── BulletList.tsx
│   │       ├── DateRange.tsx
│   │       ├── ExternalLink.tsx
│   │       ├── ItemCard.tsx
│   │       └── index.ts
│   ├── pages/
│   │   ├── index.tsx                 # 首頁
│   │   └── resume.tsx                # 履歷頁（載入 YAML 後丟給 ResumeContent）
│   ├── layouts/
│   │   └── default.tsx               # 預設版面（Navbar + main slot）
│   ├── utils/
│   │   ├── animations.ts             # Framer Motion stagger variants
│   │   ├── env.ts                    # 集中管理 VITE_* env，模組載入時就 validate
│   │   ├── pathUtils.ts              # VITE_ROOT_PATH helpers（buildPath / getBasename）
│   │   └── resumeLoader.ts           # rendercv schema types、entry-type dispatch、YAML loader
│   ├── lib/
│   │   └── utils.ts                  # `cn()`：clsx + tailwind-merge
│   ├── config/
│   │   └── site.ts                   # 依 env 動態產生 nav items、外部連結
│   ├── types/
│   │   └── ogl.d.ts                  # OGL module shim
│   ├── styles/
│   │   ├── globals.css               # Tailwind layers + design tokens（bg/fg/border/elevated/signal）
│   │   └── plugins.ts                # HeroUI Tailwind plugin 入口
│   ├── App.tsx                       # 路由（`/` 永遠在；`/resume` 僅在 VITE_RESUME_FILE 已設時掛載）
│   ├── main.tsx                      # React render 進入點、BrowserRouter 串接
│   ├── provider.tsx                  # HeroUIProvider
│   └── vite-env.d.ts
├── docker-compose.yaml               # Docker Compose 配置
├── eslint.config.js                  # ESLint 配置
├── index.html                        # 進入點 HTML（用 %VITE_WEBSITE_TITLE%）
├── Makefile                          # `make pdf`、`make build`、`make fmt`、`make clean`、`make run`
├── package.json
├── tsconfig.json
├── vercel.json                       # Vercel framework 設定 + 副檔名 scoped 的 SPA rewrite
└── vite.config.ts                    # `base` 由 VITE_ROOT_PATH 控制、客製 404.html plugin
```

## 開發指引

### 開發工具

專案使用以下開發工具確保程式碼品質：

- **ESLint**：程式碼風格檢查與錯誤偵測
- **Prettier**：自動格式化程式碼
- **TypeScript**：型別檢查
- **Makefile**：提供簡化的開發指令

#### Yarn/NPM 指令

```bash
# 開發模式
yarn dev

# 型別檢查
yarn type-check

# 程式碼格式化
yarn format

# 程式碼檢查（不自動修正）
yarn format:nofix

# 程式碼檢查與修正
yarn lint

# Lint 檢查（不自動修正）
yarn lint:nofix

# 完整檢查（型別 + 格式化 + Lint）
yarn check

# 建置專案
yarn build

# 預覽建置結果
yarn preview

# 部署到 GitHub Pages
yarn deploy
```

#### Makefile 指令

專案提供 Makefile 簡化常用操作：

```bash
# 顯示所有可用指令
make help

# 建置專案（預設目標 — 執行 `yarn build`）
make
# 或
make build

# 從 public/resume.yaml 透過 rendercv 重新產生 public/resume.pdf。
# 編輯 YAML 之後跑這個,然後 commit 更新的 PDF。
# 需要本機安裝 `uv`。
make pdf

# 清理產生的檔案與 Git 快取
#（保留 public/resume.pdf,因為那是 committed 到 git 的）
make clean

# 執行完整檢查（等同於 yarn check：型別檢查 + 格式化 + Lint）
make fmt

# 執行專案
make run
```

### 持續整合 / 持續部署（CI/CD）

專案配置了多個 GitHub Actions 工作流程：

- **自動部署**（`deploy.yml`）：推送到 main/master 分支時,先用 `make pdf` 重新產生 `public/resume.pdf`,再跑 `yarn build` 並部署到 GitHub Pages
- **程式碼掃描**（`code_scan.yml`）：使用 CodeQL 進行安全性分析
- **程式碼品質檢查**（`code-quality-check.yml`）：對 Pull Request 執行 TypeScript、Prettier 與 ESLint 檢查
- **Dependabot 自動合併**（`auto_review_merge.yml`）：對 Pull Request 做 dependency review,通過的 Dependabot PR 自動 merge
- **語意化 PR**（`semantic-pull-request.yml`）：確保 Pull Request 標題符合 Conventional Commits 規範
- **自動標籤**（`auto_labeler.yml`）：根據變更路徑自動加上標籤
- **Release 草稿**（`release_drafter.yml`）：從已合併的 PR 生成 Release Notes 草稿
- **Docker 映像建置**（`build_image.yml`）：建置並推送 Docker 映像

### 新增頁面

如需新增頁面到網站：

1. **建立頁面元件**：在 `src/pages/` 目錄新增頁面元件（例如 `new-page.tsx`）
2. **新增路由**：在 `src/App.tsx` 中添加新的路由配置
3. **更新導覽選單**：在 `src/config/site.ts` 中更新 `siteConfig.navItems` 配置
4. **條件式顯示（選用）**：
   - 如需根據環境變數顯示/隱藏頁面，在 `src/utils/env.ts` 添加環境變數檢查函式
   - 在 `src/config/site.ts` 中使用該檢查函式來決定是否顯示導覽項目
   - 在 `src/App.tsx` 中使用相同的檢查來決定是否註冊路由

**範例**：參考 Resume 頁面（`/resume`）的實作方式

### 修改主題

Design token（`bg`、`fg`、`fg-muted`、`fg-subtle`、`border`、`surface`、`elevated`、`signal`）寫在 `src/styles/globals.css`；HeroUI 的 Tailwind plugin 接在 `src/styles/plugins.ts`。主題切換沒有獨立元件,導覽列（`src/components/navbar.tsx`）直接用 `@heroui/use-theme` 的 `useTheme()` 在 `dark` / `light` 之間切換。

### 自訂履歷區塊

履歷是依 **rendercv entry type** 而非 section 名稱來分派的。`src/utils/resumeLoader.ts` 裡的 `detectEntryType` 會看每個 YAML section 的第一個 entry,自動挑對應的 renderer,所以你在 YAML 裡新增任何 section 都會自動 route 到正確的 component。

如何調整呈現方式：

1. 修改 `src/components/ResumeSections/` 底下對應的 `*Section.tsx` 來改變某一類 entry 的外觀（例如 `ExperienceSection.tsx` 同時處理 Work 與 Volunteer,因為兩者都用 `company` + `position`）。
2. 調整 `SectionCard.tsx` 可以改動共享卡片樣式,或透過 `getSectionConfig` 修改 section 名稱 → icon / `ColorScheme` 對應。
3. 如果要在 YAML 加新的自訂欄位,請到 `src/utils/resumeLoader.ts` 擴充對應的 interface（注意:list 型自訂欄位在 YAML 裡必須寫成 comma-separated 字串,請看上面的說明）。

### 頁面顯示問題

**履歷頁未出現在導覽列**

- 確認 `.env` 中是否已設定 `VITE_RESUME_FILE`
- 檢查環境變數值是否正確（本機檔案名稱或完整 URL）
- 重新啟動開發伺服器

**導覽列完全為空**

- 至少需要設定一個頁面的環境變數（`VITE_RESUME_FILE`）
- 首頁（`/`）永遠可用，不需要特別設定

### 履歷載入問題

**無法載入履歷 YAML**

- 檢查檔案路徑是否正確
- 如使用 URL，確認 URL 可直接存取（在瀏覽器中開啟測試）
- GitHub Gist URL 會自動轉換為 Raw 格式，無需手動處理
- 檢查 YAML 格式是否正確（可使用線上 YAML 驗證工具）

### 建置與開發問題

**建置失敗**

- 確認所有依賴已正確安裝：`yarn install`
- 檢查 Node.js 版本（建議使用 18.x 或更高版本）
- 執行型別檢查：`yarn type-check`
- 清除快取並重新安裝：
  ```bash
  rm -rf node_modules yarn.lock
  yarn install
  ```

**開發伺服器無法啟動**

- 檢查 Port 5173 是否被佔用
- 確認 `.env` 檔案格式正確
- 檢查是否有必要的環境變數（至少需要 `VITE_WEBSITE_TITLE`）

**TypeScript 錯誤**

- 執行 `yarn type-check` 查看詳細錯誤
- 確認所有 `@types/*` 套件已安裝
- 檢查 `tsconfig.json` 設定是否正確

### Docker 相關問題

**容器無法啟動**

- 確認 `.env` 檔案存在且格式正確
- 檢查 Docker 和 Docker Compose 版本
- 查看容器日誌：`docker compose logs -f`

**無法存取服務**

- 確認 Port 5173 未被其他服務佔用
- 檢查防火牆設定
- 在瀏覽器中嘗試存取 `http://localhost:5173`

## 貢獻指南

歡迎貢獻！無論是回報問題、提出功能建議或提交 Pull Request，都十分感謝。

### 如何貢獻

1. Fork 此專案
2. 建立你的功能分支：`git checkout -b feature/AmazingFeature`
3. 提交你的變更：`git commit -m 'Add some AmazingFeature'`
4. 推送到分支：`git push origin feature/AmazingFeature`
5. 開啟 Pull Request

### 開發規範

- 遵循現有的程式碼風格（使用 ESLint 和 Prettier）
- 提交前執行 `yarn check` 確保程式碼品質
- 撰寫清晰的提交訊息
- 更新相關文件

### 回報問題

如果發現 Bug 或有功能建議，請[建立 Issue](https://github.com/Mai0313/resume/issues)。

## 特別感謝

- [HeroUI](https://heroui.com) - 提供優秀的 React UI 元件庫
- [rendercv](https://github.com/rendercv/rendercv) - Typst-based CV 排版工具,從我們的 YAML 產生可下載的 PDF
- [Typst](https://typst.app) - 驅動 rendercv 的現代排版引擎
- [uv](https://docs.astral.sh/uv/) - 快速的 Python 套件/工具管理器,用於安裝 rendercv
- 所有開源專案的貢獻者

## 授權條款

依據 [MIT 授權](LICENSE) 授權。

---

**如果這個專案對你有幫助，請給個 ⭐️！**
