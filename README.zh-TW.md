<center>

# 個人履歷網站

[![React](https://img.shields.io/badge/-React_19.1-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/-TypeScript_5.8-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![license](https://img.shields.io/badge/License-MIT-green.svg?labelColor=gray)](https://github.com/Mai0313/resume/tree/master?tab=License-1-ov-file)
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/Mai0313/resume/pulls)
[![contributors](https://img.shields.io/github/contributors/Mai0313/resume.svg)](https://github.com/Mai0313/resume/graphs/contributors)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FMai0313%2Fresume&env=VITE_WEBSITE_TITLE,VITE_GITHUB_TOKEN,VITE_RESUME_FILE,VITE_PIN_CODE,VITE_ROOT_PATH&project-name=resume-web&repository-name=resume-web&skippable-integrations=1)

</center>

這是一個使用 Vite 和 HeroUI 框架建構的個人網站，適合部署到 GitHub Pages。

## 功能特色

- **動態首頁**：使用 @react-spring/web 和自定義組件（Orb、SplitText、GradientText）創建生動的視覺效果
- **智能頁面渲染**：頁面僅在正確配置時顯示 - 履歷需要 `VITE_RESUME_FILE`，作品集需要 `VITE_GITHUB_TOKEN`
- **PIN 保護履歷**：基於 YAML 配置的履歷系統，支援 PIN 碼驗證以保護隱私
- **PDF 履歷下載**：一鍵生成並下載專業 PDF 履歷，具有清潔的排版和結構化佈局
- **GitHub 作品集**：透過 GitHub API 自動獲取並顯示個人項目和貢獻
- **響應式設計**：支援深色/淺色主題切換和完全響應式佈局
- **現代化 UI**：使用 HeroUI 組件庫和 Framer Motion 動畫構建
- **AI 助手**：當使用推理能力模型（如 GPT-5）時，助手會在答案上方顯示微妙的推理摘要，讓您看到其思考過程

## 技術棧

- [Vite](https://vitejs.dev/guide/) - 快速前端構建工具
- [HeroUI](https://heroui.com) - React UI 組件庫
- [Tailwind CSS](https://tailwindcss.com) - CSS 框架
- [TypeScript](https://www.typescriptlang.org) - 類型安全的 JavaScript
- [Framer Motion](https://www.framer.com/motion) - React 動畫庫
- [React Spring](https://react-spring.dev/) - Spring 動畫庫
- [GitHub API](https://docs.github.com/en/rest) - 獲取項目數據
- [jsPDF](https://github.com/parallax/jsPDF) - PDF 生成庫

## 環境設置

### 環境變數

創建 `.env` 檔案並設置以下變數：

```bash
# 必需：網站標題
VITE_WEBSITE_TITLE=Mai

# 可選：履歷檔案 - 未設置時，履歷頁面將被隱藏
# 支援本地檔案和 URL
# 本地檔案範例：
VITE_RESUME_FILE=example.yaml
# GitHub Gist 範例：
# VITE_RESUME_FILE=https://gist.github.com/username/gist_id
# 原始 URL 範例：
# VITE_RESUME_FILE=https://raw.githubusercontent.com/user/repo/main/resume.yaml

# 可選：履歷 PIN 碼保護
VITE_PIN_CODE=123456

# 可選：GitHub API Token - 未設置時，作品集頁面將被隱藏
VITE_GITHUB_TOKEN=your_github_token_here

# 可選：OpenAI 聊天機器人（啟用網站內 AI 助手）
# 這些必須同時設置才能顯示聊天助手
VITE_OPENAI_BASE_URL=https://api.openai.com/v1
VITE_OPENAI_API_KEY=sk-xxxx
VITE_OPENAI_MODEL=gpt-5
```

**重要說明**：

- **智能頁面顯示**：頁面僅在正確配置環境變數時出現在導航和路由中
  - 履歷頁面 (`/resume`) 僅在設置 `VITE_RESUME_FILE` 時出現
  - 作品集頁面 (`/portfolio`) 僅在設置 `VITE_GITHUB_TOKEN` 時出現
- 將 `your_github_token_here` 替換為您的 GitHub 個人訪問令牌
- GitHub Token 需要 `public_repo` 權限來讀取公共倉庫
- 不要將真實令牌提交到版本控制

### 安裝依賴

建議使用 `yarn`：

```bash
yarn install
```

或使用 `npm`：

```bash
npm install
```

### 運行開發服務器

```bash
yarn dev
```

或

```bash
npm run dev
```

## 頁面功能

### 首頁 (`/`)

- 動態 Orb 背景效果
- Split Text 動畫顯示 GitHub 用戶名
- Gradient Text 顯示聯絡資訊
- 響應式設計和主題切換

### 履歷頁面 (`/resume`)

- **條件顯示**：僅在配置 `VITE_RESUME_FILE` 時出現
- PIN 碼驗證保護（可選）
- **PDF 下載**：一鍵生成具有清潔格式和結構化佈局的專業 PDF 履歷
- **靈活的履歷加載**：支援多種履歷來源：
  - **本地 YAML 檔案**：`example.yaml`、`resume.yaml`（從 `public/` 目錄加載）
  - **GitHub Gist**：直接 Gist URL 自動轉換為原始格式
  - **原始 URL**：任何可訪問的 YAML 檔案 URL
- YAML 驅動的履歷數據管理
- 結構化顯示個人資訊、教育、工作經驗等
- 響應式設計和動畫效果

### 作品集頁面 (`/portfolio`)

- **條件顯示**：僅在配置 `VITE_GITHUB_TOKEN` 時出現
- 自動獲取 GitHub 倉庫和貢獻
- 顯示項目詳細資訊：語言、星星、分支、主題標籤
- 顯示最近的提交記錄
- 支援項目演示連結和 GitHub 連結

### AI 助手（浮動聊天）

- 在配置 `VITE_OPENAI_BASE_URL`、`VITE_OPENAI_API_KEY` 和 `VITE_OPENAI_MODEL` 時出現
- 實時串流答案。如果選擇的模型支援推理，會在助手答案上方顯示小的靜音塊顯示推理摘要
- 您可以使用「清除聊天」按鈕清除對話

## 自定義配置

### 配置頁面顯示

網站會根據環境變數配置自動顯示/隱藏頁面：

- **履歷頁面**：僅在設置 `VITE_RESUME_FILE` 時出現
- **作品集頁面**：僅在設置 `VITE_GITHUB_TOKEN` 時出現
- **導航選單**：動態更新以僅顯示可用頁面

### 更改 GitHub 用戶名

無需手動配置！GitHub 用戶名會使用您的 `VITE_GITHUB_TOKEN` 自動獲取。

### 編輯履歷內容

您有多種選擇來設置履歷：

#### 選項 1：本地 YAML 檔案

編輯 `public/example.yaml` 檔案或在 `public/` 目錄中創建您自己的 YAML 檔案：

```bash
# 在 .env 檔案中
VITE_RESUME_FILE=my-resume.yaml
```

#### 選項 2：GitHub Gist（推薦）

使用履歷 YAML 檔案創建 GitHub Gist 並使用 Gist URL：

```bash
# 在 .env 檔案中
VITE_RESUME_FILE=https://gist.github.com/your-username/your-gist-id
```

使用 GitHub Gist 的好處：

- 無需重新部署網站即可輕鬆更新
- 履歷的版本控制
- 隱私控制（私人/公開 gists）

#### 選項 3：原始 URL

使用任何可訪問的 YAML 檔案 URL：

```bash
# 在 .env 檔案中
VITE_RESUME_FILE=https://raw.githubusercontent.com/user/repo/main/resume.yaml
```

### 更改 PIN 碼

編輯 `.env` 檔案中的 `VITE_PIN_CODE` 值。

## 部署

### 部署到 GitHub Pages

```bash
yarn build
yarn deploy
```

### 部署到 Vercel

項目已預配置 `vercel.json`，可直接部署到 Vercel。

## 項目結構

```
src/
├── components/          # 可重用組件
│   ├── FuzzyText.tsx   # 404 文字效果
│   ├── Orb.tsx         # 動態背景球體
│   ├── SplitText.tsx   # 分割文字動畫
│   ├── PortfolioContent.tsx  # 作品集內容組件
│   └── ResumeContent.tsx     # 履歷內容組件
├── pages/              # 頁面組件
│   ├── index.tsx       # 首頁
│   ├── portfolio.tsx   # 作品集頁面
│   └── resume.tsx      # 履歷頁面
├── utils/              # 工具函數
│   ├── githubApi.ts    # GitHub API 相關函數
│   ├── resumeLoader.ts # 履歷 YAML 加載器
│   └── pdfGenerator.ts # PDF 履歷生成器
└── types/              # TypeScript 類型定義
    └── index.ts        # 通用類型定義
```

## 開發指南

### 添加新頁面

1. 在 `src/pages/` 中創建新組件
2. 在 `src/App.tsx` 中添加路由
3. 在 `src/components/navbar.tsx` 中添加導航連結

### 修改主題

HeroUI 主題配置在 `tailwind.config.js` 中，您可以根據需要自定義顏色和樣式。

### API 限制

GitHub API 有速率限制。建議：

- 使用個人訪問令牌獲得更高限制
- 實現適當的緩存
- 考慮對大型數據集進行分頁加載

## 疑難排解

### GitHub API 403 錯誤

- 檢查令牌是否正確設置
- 確保令牌具有 `public_repo` 權限
- 檢查是否超過了 API 速率限制

### 頁面未顯示

- **履歷頁面缺失**：檢查 `.env` 檔案中是否設置了 `VITE_RESUME_FILE`
- **作品集頁面缺失**：檢查 `.env` 檔案中是否設置了 `VITE_GITHUB_TOKEN`
- **導航為空**：確保至少配置了一個頁面環境變數

### 構建錯誤

- 確保安裝所有依賴：`yarn install`
- 檢查 TypeScript 類型錯誤：`yarn lint`
- 如需要，清除 node_modules 並重新安裝

## 許可證

根據 [MIT 許可證](https://github.com/frontio-ai/Mai/blob/main/LICENSE) 許可。