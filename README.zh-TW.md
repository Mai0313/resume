# 個人履歷網站

這是一個使用 Vite 與 HeroUI 打造的個人網站，支援部署到 GitHub Pages。

## 功能特色

- 動態首頁效果（Orb、SplitText、GradientText）
- 智慧頁面顯示：只有在設定對應環境變數時才會顯示頁面
  - 設定 `VITE_RESUME_FILE` 才會顯示「履歷」頁
  - 設定 `VITE_GITHUB_TOKEN` 才會顯示「作品集」頁
- 履歷 PIN 碼保護（選用）
- GitHub 作品集：自動抓取個人專案與貢獻
- 響應式設計與深淺色主題切換
- 一鍵下載 PDF 履歷：從 YAML 履歷資料直接生成 PDF（不依賴畫面樣式）

## 快速開始

1. 安裝依賴
   ```bash
   yarn install
   ```
2. 設定環境變數（建立 `.env`）
   ```bash
   VITE_WEBSITE_TITLE=YourName
   # 履歷來源（可用本機 public/ 檔案、GitHub Gist、或 Raw URL）
   VITE_RESUME_FILE=example.yaml
   # 可選：履歷 PIN 碼
   VITE_PIN_CODE=123456
   # 可選：GitHub Token（顯示作品集頁面）
   VITE_GITHUB_TOKEN=your_github_token_here
   ```
3. 啟動開發伺服器
   ```bash
   yarn dev
   ```

## 履歷頁（/resume）

- 以 YAML 管理履歷內容（基本資訊、工作經歷、學歷、技能、專案等）
- 支援本機檔案、GitHub Gist、或 Raw URL 載入
- 頁面右上角提供「Download PDF」按鈕，一鍵下載 PDF 履歷
- 生成的 PDF 會直接使用 YAML (`ResumeData`) 來排版，內容一致

## 部署

- GitHub Pages：`yarn build && yarn deploy`
- Vercel：已提供 `vercel.json`，可直接部署

## 授權

本專案採用 MIT 授權。