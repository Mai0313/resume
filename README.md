# 個人網站開發專案

這是一個基於 Vite 和 HeroUI 框架構建的個人網站，可用於 GitHub Pages 部署。

## 功能特色

- **動態首頁**: 使用 @react-spring/web 和自定義組件 (Orb, SplitText, GradientText) 創建生動的視覺效果
- **PIN 碼保護的履歷**: 基於 YAML 配置的履歷系統，支援 PIN 碼驗證保護隱私
- **PDF 履歷導出**: 一鍵生成和下載專業格式的 PDF 履歷，支援完整的履歷內容和美觀的排版
- **GitHub Portfolio**: 透過 GitHub API 自動獲取並展示個人專案和貢獻記錄
- **響應式設計**: 支援深色/淺色主題切換，完全響應式佈局
- **現代化 UI**: 使用 HeroUI 組件庫和 Framer Motion 動畫效果

## 技術棧

- [Vite](https://vitejs.dev/guide/) - 快速的前端構建工具
- [HeroUI](https://heroui.com) - React UI 組件庫
- [Tailwind CSS](https://tailwindcss.com) - CSS 框架
- [TypeScript](https://www.typescriptlang.org) - 類型安全的 JavaScript
- [Framer Motion](https://www.framer.com/motion) - React 動畫庫
- [React Spring](https://react-spring.dev/) - 彈簧動畫庫
- [React PDF](https://react-pdf.org/) - PDF 生成和渲染庫
- [GitHub API](https://docs.github.com/en/rest) - 獲取專案數據

## 環境設置

### 環境變數

創建 `.env` 文件並設置以下變數：

```bash
# Resume PIN 碼保護
VITE_PIN_CODE=123456

# GitHub API Token (用於 Portfolio 功能)
VITE_GITHUB_TOKEN=your_github_token_here
```

**重要**: 
- 請將 `your_github_token_here` 替換為你的 GitHub Personal Access Token
- GitHub Token 需要 `public_repo` 權限來讀取公開儲存庫
- 不要將真實的 token 提交到版本控制系統

### 安裝依賴

推薦使用 `yarn`:

```bash
yarn install
```

或使用 `npm`:

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

### Home 頁面 (`/`)
- 動態 Orb 背景效果
- Split Text 動畫顯示 GitHub 用戶名
- Gradient Text 展示聯繫資訊
- 響應式設計和主題切換

### Resume 頁面 (`/resume`)
- PIN 碼驗證保護
- YAML 驅動的履歷數據管理
- 結構化展示個人信息、教育背景、工作經歷等
- **PDF 下載功能**: 一鍵生成專業格式的 PDF 履歷
  - 使用 Inter 字體的現代化排版
  - 藍色主題的專業配色方案
  - 雙欄佈局優化空間使用
  - 自動文件命名 (姓名_Resume.pdf)
- 響應式設計和動畫效果

### Portfolio 頁面 (`/portfolio`)
- 自動獲取 GitHub 儲存庫和貢獻記錄
- 顯示專案詳情：語言、星數、fork 數、主題標籤
- 展示最近的 commit 記錄
- 支援專案 demo 連結和 GitHub 連結

## 自定義配置

### 修改 GitHub 用戶名
在 `src/pages/portfolio.tsx` 中修改:
```typescript
const userContributions = await getUserContributions('your_github_username');
```

### 修改履歷內容
編輯 `public/resume.yaml` 文件來更新履歷內容。

### 修改 PIN 碼
在 `.env` 文件中修改 `VITE_PIN_CODE` 的值。

## 部署

### GitHub Pages 部署

```bash
yarn build
yarn deploy
```

### Vercel 部署

項目已配置 `vercel.json`，可直接部署到 Vercel。

## 專案結構

```
src/
├── components/          # 可重用組件
│   ├── FuzzyText.tsx   # 404 文字效果
│   ├── Orb.tsx         # 動態背景球體
│   ├── SplitText.tsx   # 文字分割動畫
│   ├── PortfolioContent.tsx  # Portfolio 內容組件
│   └── ResumeContent.tsx     # Resume 內容組件
├── pages/              # 頁面組件
│   ├── index.tsx       # 首頁
│   ├── portfolio.tsx   # Portfolio 頁面
│   └── resume.tsx      # Resume 頁面
├── utils/              # 工具函數
│   ├── githubApi.ts    # GitHub API 相關函數
│   └── resumeLoader.ts # Resume YAML 載入器
└── types/              # TypeScript 類型定義
    └── index.ts        # 通用類型定義
```

## 開發指南

### 添加新頁面
1. 在 `src/pages/` 創建新組件
2. 在 `src/App.tsx` 中添加路由
3. 在 `src/components/navbar.tsx` 中添加導航連結

### 修改主題
HeroUI 主題配置位於 `tailwind.config.js`，可根據需要自定義顏色和樣式。

### API 限制
GitHub API 有速率限制，建議：
- 使用 Personal Access Token 獲得更高限額
- 實現適當的緩存機制
- 考慮分頁載入大量數據

## 故障排除

### GitHub API 403 錯誤
- 檢查 token 是否正確設置
- 確認 token 有 `public_repo` 權限
- 檢查是否超出 API 速率限制

### 建構錯誤
- 確保所有依賴都已安裝: `yarn install`
- 檢查 TypeScript 類型錯誤: `yarn lint`
- 清除 node_modules 重新安裝

## 授權

Licensed under the [MIT license](https://github.com/frontio-ai/Mai/blob/main/LICENSE).
