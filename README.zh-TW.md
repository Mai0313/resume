<center>

# 個人履歷

[![React](https://img.shields.io/badge/-React_19.1-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/-TypeScript_5.8-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![license](https://img.shields.io/badge/License-MIT-green.svg?labelColor=gray)](https://github.com/Mai0313/resume/tree/master?tab=License-1-ov-file)
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/Mai0313/resume/pulls)
[![contributors](https://img.shields.io/github/contributors/Mai0313/resume.svg)](https://github.com/Mai0313/resume/graphs/contributors)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FMai0313%2Fresume&env=VITE_WEBSITE_TITLE,VITE_GITHUB_TOKEN,VITE_RESUME_FILE,VITE_PIN_CODE,VITE_ROOT_PATH&project-name=resume-web&repository-name=resume-web&skippable-integrations=1)

</center>

這是一個使用 Vite 與 HeroUI 框架建立的個人網站，適合部署到 GitHub Pages。

## 功能特色

- 動態首頁：使用 @react-spring/web 與自訂元件（Orb、SplitText、GradientText）打造生動的視覺效果
- 智慧頁面顯示：只有在環境變數正確設定時才會顯示頁面——履歷需設定 `VITE_RESUME_FILE`，作品集需設定 `VITE_GITHUB_TOKEN`
- 履歷 PIN 保護：以 YAML 組態為基礎的履歷系統，支援以 PIN 碼驗證保護隱私
- GitHub 作品集：透過 GitHub API 自動抓取並展示個人專案與貢獻
- 響應式設計：支援深色/淺色主題切換與全響應式版面
- 現代化 UI：採用 HeroUI 元件庫與 Framer Motion 動畫
- 具備推理預覽的 AI 助手：當使用具備推理能力的模型（例如 GPT-5）時，助手會在答案上方以低調的方式即時顯示精簡推理摘要，讓你不被干擾地了解思路。

## 技術堆疊

- [Vite](https://vitejs.dev/guide/) - 快速的前端建置工具
- [HeroUI](https://heroui.com) - React UI 元件庫
- [Tailwind CSS](https://tailwindcss.com) - CSS 框架
- [TypeScript](https://www.typescriptlang.org) - 型別安全的 JavaScript
- [Framer Motion](https://www.framer.com/motion) - React 動畫庫
- [React Spring](https://react-spring.dev/) - 彈簧動畫庫
- [GitHub API](https://docs.github.com/en/rest) - 取得專案資料

## 環境設定

### 環境變數

建立一個 `.env` 檔案並設定下列變數：

```bash
# 必填：網站標題
VITE_WEBSITE_TITLE=Mai

# 選填：履歷檔 - 若未設定，履歷頁面會被隱藏
# 支援本機檔案與 URL
# 本機檔案範例：
VITE_RESUME_FILE=example.yaml
# GitHub Gist 範例：
# VITE_RESUME_FILE=https://gist.github.com/username/gist_id
# Raw URL 範例：
# VITE_RESUME_FILE=https://raw.githubusercontent.com/user/repo/main/resume.yaml

# 選填：履歷 PIN 碼保護
VITE_PIN_CODE=123456

# 選填：GitHub API Token - 若未設定，作品集頁面會被隱藏
VITE_GITHUB_TOKEN=your_github_token_here

# 選填：OpenAI 聊天機器人（啟用站內 AI 助手）
# 需同時設定以下變數，聊天助手才會顯示
VITE_OPENAI_BASE_URL=https://api.openai.com/v1
VITE_OPENAI_API_KEY=sk-xxxx
VITE_OPENAI_MODEL=gpt-5
```

重要說明：

- 智慧頁面顯示：僅在對應環境變數正確設定時，頁面才會出現在導覽選單與路由中
  - 履歷頁（`/resume`）僅在設定 `VITE_RESUME_FILE` 後顯示
  - 作品集頁（`/portfolio`）僅在設定 `VITE_GITHUB_TOKEN` 後顯示
- 請將 `your_github_token_here` 換成你的 GitHub 個人存取權杖（PAT）
- GitHub Token 需要 `public_repo` 權限以讀取公開倉庫
- 請勿將真實 Token 提交至版本控制

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

- 動態 Orb 背景效果
- 以 Split Text 動畫顯示 GitHub 使用者名稱
- 梯度文字顯示聯絡資訊
- 響應式設計與主題切換

### 履歷頁（`/resume`）

- 條件式顯示：僅在設定 `VITE_RESUME_FILE` 後才會出現
- 支援 PIN 碼驗證保護（選用）
- 彈性的履歷載入方式：
  - 本機 YAML 檔案：`example.yaml`、`resume.yaml`（自 `public/` 目錄載入）
  - GitHub Gist：Gist 連結會自動轉為原始檔格式
  - Raw URL：任何可存取的 YAML 檔案網址
- 以 YAML 駆動的履歷資料管理
- 結構化顯示個人資訊、學歷、工作經歷等內容
- PDF 下載：提供按鈕下載履歷 PDF（使用 `public/example.pdf`）
- 響應式設計與動畫效果

### 作品集頁（`/portfolio`）

### AI 助手（浮動聊天）

- 當 `VITE_OPENAI_BASE_URL`、`VITE_OPENAI_API_KEY` 與 `VITE_OPENAI_MODEL` 已設定時顯示
- 即時串流回覆；若選用的模型支援推理，將在答案上方以小型、低調區塊呈現推理摘要
- 可使用「清除對話」按鈕重置會話

- 條件式顯示：僅在設定 `VITE_GITHUB_TOKEN` 後才會出現
- 自動抓取 GitHub 倉庫與貢獻紀錄
- 顯示專案資訊：語言、星標、分叉、主題標籤
- 顯示近期提交紀錄
- 支援專案 Demo 與 GitHub 連結

## 自訂設定

### 設定頁面顯示

網站會依據環境變數自動顯示/隱藏頁面：

- 履歷頁：僅在設定 `VITE_RESUME_FILE` 後顯示
- 作品集頁：僅在設定 `VITE_GITHUB_TOKEN` 後顯示
- 導覽列：動態更新，只顯示可用的頁面

### 變更 GitHub 使用者名稱

無需手動設定！GitHub 使用者名稱會由你的 `VITE_GITHUB_TOKEN` 自動取得。

### 編輯履歷內容

你有多種方式設定履歷：

#### 選項一：本機 YAML 檔

編輯 `public/example.yaml`，或在 `public/` 目錄建立自己的 YAML 檔：

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

### 修改 PIN 碼

在 `.env` 檔中調整 `VITE_PIN_CODE` 的值。

## 部署

### 部署到 GitHub Pages

```bash
yarn build
yarn deploy
```

### 部署到 Vercel

此專案已包含 `vercel.json`，可直接在 Vercel 上部署。

## 專案結構

```
src/
├── components/          # 可重用元件
│   ├── FuzzyText.tsx   # 404 文字效果
│   ├── Orb.tsx         # 動態背景球
│   ├── SplitText.tsx   # 文字分割動畫
│   ├── PortfolioContent.tsx  # 作品集內容元件
│   └── ResumeContent.tsx     # 履歷內容元件
├── pages/              # 頁面元件
│   ├── index.tsx       # 首頁
│   ├── portfolio.tsx   # 作品集頁
│   └── resume.tsx      # 履歷頁
├── utils/              # 工具函式
│   ├── githubApi.ts    # GitHub API 相關函式
│   └── resumeLoader.ts # 履歷 YAML 載入器
└── types/              # TypeScript 型別定義
    └── index.ts        # 通用型別定義
```

## 開發指引

### 新增頁面

1. 在 `src/pages/` 新增頁面元件
2. 在 `src/App.tsx` 新增路由
3. 在 `src/components/navbar.tsx` 新增導覽連結

### 修改主題

HeroUI 的主題設定位於 `tailwind.config.js`，可依需求自訂色彩與樣式。

### API 限制

GitHub API 具有速率限制，建議：

- 使用個人存取權杖（PAT）以提高限制
- 設計適當的快取策略
- 面對大量資料時採用分頁載入

## 疑難排解

### GitHub API 403 錯誤

- 檢查是否正確設定 Token
- 確認 Token 具有 `public_repo` 權限
- 檢查是否已超出 API 速率限制

### 頁面未顯示

- 履歷頁未出現：確認 `.env` 中是否已設定 `VITE_RESUME_FILE`
- 作品集頁未出現：確認 `.env` 中是否已設定 `VITE_GITHUB_TOKEN`
- 導覽列為空：請至少設定其中一個頁面的環境變數

### 建置錯誤

- 確認依賴皆已安裝：`yarn install`
- 檢查 TypeScript 型別錯誤：`yarn lint`
- 如有需要，刪除 node_modules 後重新安裝

## 授權條款

依據 [MIT 授權](https://github.com/frontio-ai/Mai/blob/main/LICENSE) 授權。

