<div align="center" markdown="1">

# 個人履歷

[![React](https://img.shields.io/badge/-React_18-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/-TypeScript_5.6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![license](https://img.shields.io/badge/License-MIT-green.svg?labelColor=gray)](https://github.com/Mai0313/resume/tree/master?tab=License-1-ov-file)
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/Mai0313/resume/pulls)
[![contributors](https://img.shields.io/github/contributors/Mai0313/resume.svg)](https://github.com/Mai0313/resume/graphs/contributors)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FMai0313%2Fresume&env=VITE_WEBSITE_TITLE,VITE_RESUME_FILE,VITE_PIN_CODE,VITE_RESUME_PDF_PATH,VITE_ROOT_PATH&project-name=resume-web&repository-name=resume-web&skippable-integrations=1)

</div>

這是一個使用 Vite 與 HeroUI 框架建立的個人網站，適合部署到 GitHub Pages。

## 功能特色

### 🎨 視覺效果

- **動態首頁**：整合 Particles 粒子背景、Orb 動態球體和 SplitText 文字動畫，打造引人入勝的視覺體驗
- **現代化 UI**：採用 HeroUI 元件庫與 Framer Motion、React Spring、GSAP 等動畫庫
- **響應式設計**：支援深色/淺色主題切換與全響應式版面，在各種裝置上都能完美顯示

### 📄 履歷系統

- **彈性資料來源**：支援本機 YAML 檔案、GitHub Gist 或任何可存取的 Raw URL
- **PIN 碼保護**：可選的 PIN 碼驗證功能，保護隱私資訊
- **模組化區塊**：10 種履歷區塊元件（工作經驗、教育背景、技能、專案、發表著作等）
- **PDF 下載**：提供履歷 PDF 下載功能
- **JSON Resume 標準**：遵循 JSON Resume Schema 規範，資料格式標準化

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
- [HeroUI](https://heroui.com) - React UI 元件庫
- [Tailwind CSS 4.1.18](https://tailwindcss.com) - CSS 框架
- [Framer Motion 12.15](https://www.framer.com/motion) - React 動畫庫
- [React Spring 10.0](https://react-spring.dev/) - 彈簧動畫庫
- [GSAP 3.13](https://gsap.com/) - 專業級動畫庫
- [OGL 1.0](https://oframe.github.io/ogl/) - WebGL 函式庫
- [js-yaml 4.1](https://github.com/nodeca/js-yaml) - YAML 解析器
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

# 選填：履歷 PDF 下載路徑
# 預設值：/example.pdf (對應 public/example.pdf)
VITE_RESUME_PDF_PATH=/example.pdf
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

- 互動式背景效果（Particles + Orb）
- 以 SplitText 動畫顯示網站標題（`VITE_WEBSITE_TITLE`）
- 快速連結到你的 GitHub 個人頁
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
- 小技巧：若啟用 PIN，可透過 `/resume?pin=你的PIN` 直接解鎖；驗證後網址會自動移除 PIN。

## 自訂設定

### 設定頁面顯示

網站會依據環境變數自動顯示/隱藏頁面：

- 履歷頁：僅在設定 `VITE_RESUME_FILE` 後顯示
- 導覽列：動態更新，只顯示可用的頁面

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

### 履歷 YAML 格式

履歷採用 [JSON Resume Schema](https://jsonresume.org/schema/) 標準，支援以下區塊：

- `basics`：基本資訊（姓名、職稱、聯絡方式、個人簡介、大頭照等）
- `work`：工作經驗
- `education`：教育背景
- `skills`：技能
- `projects`：專案經驗
- `publications`：發表著作
- `certificates`：證照
- `awards`：獎項
- `volunteer`：志工經驗
- `interests`：興趣
- `references`：推薦人
- `languages`：語言能力（顯示在 header 區塊）

**特別說明**：

- 區塊顯示順序由 YAML 檔案中的 `sectionOrder` 欄位決定
- `languages` 會顯示在頁面頂部的個人資訊區塊（header）中
- 未包含資料的區塊不會顯示
- 範例 YAML 檔案位於 `public/example.yaml`，可作為起始模板

### 修改 PIN 碼

在 `.env` 檔中調整 `VITE_PIN_CODE` 的值。

## 部署

### 部署到 GitHub Pages

#### 方式一：自動部署（推薦）

專案已配置 GitHub Actions 自動部署工作流程（`.github/workflows/deploy.yml`）：

1. 推送程式碼到 `main` 或 `master` 分支
2. GitHub Actions 會自動：
   - 執行建置（`yarn build`）
   - 部署到 GitHub Pages

無需手動執行任何指令！

**注意事項**：

- 確保在 GitHub 倉庫設定中啟用 GitHub Pages
- 設定 Pages 的部署來源為「GitHub Actions」
- GitHub Actions 會自動使用 `VITE_ROOT_PATH=/<倉庫名稱>` 進行建置

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
src/
├── components/                      # 可重用元件
│   ├── ErrorBoundary.tsx            # 錯誤邊界元件
│   ├── HeroSection.tsx              # 首頁 Hero 區塊
│   ├── Particles/                   # 粒子背景特效
│   │   └── Particles.tsx
│   ├── Orb/                         # 動態背景球體（WebGL）
│   │   ├── Orb.tsx
│   │   └── Orb.css
│   ├── FuzzyText/                   # 404 頁面文字模糊效果
│   │   └── FuzzyText.tsx
│   ├── SplitText/                   # 首頁文字分割動畫
│   │   └── SplitText.tsx
│   ├── SpotlightCard/               # 光斑卡片懸停效果
│   │   ├── SpotlightCard.tsx
│   │   └── SpotlightCard.css
│   ├── ResumeSections/              # 履歷區塊元件
│   │   ├── AwardsSection.tsx        # 獎項區塊
│   │   ├── CertificatesSection.tsx  # 證照區塊
│   │   ├── EducationSection.tsx     # 教育背景區塊
│   │   ├── InterestsSection.tsx     # 興趣區塊
│   │   ├── ProjectsSection.tsx      # 專案經驗區塊
│   │   ├── PublicationsSection.tsx  # 發表著作區塊
│   │   ├── ReferencesSection.tsx    # 推薦人區塊
│   │   ├── SkillsSection.tsx        # 技能區塊
│   │   ├── VolunteerSection.tsx     # 志工經驗區塊
│   │   ├── WorkSection.tsx          # 工作經驗區塊
│   │   └── index.ts                 # 區塊元件匯出
│   ├── shared/                      # 共享的可重用元件
│   │   ├── BulletList.tsx           # 項目列表元件
│   │   ├── DateRange.tsx            # 日期範圍格式化
│   │   ├── ItemCard.tsx             # 通用項目卡片
│   │   └── ...                      # 其他共享元件
│   ├── ResumeContent.tsx            # 履歷內容元件
│   ├── navbar.tsx                   # 導覽列元件
│   ├── theme-switch.tsx             # 主題切換元件
│   ├── icons.tsx                    # 圖示元件
│   └── primitives.ts                # 基礎元件樣式
├── pages/                           # 頁面元件
│   ├── index.tsx                    # 首頁
│   └── resume.tsx                   # 履歷頁
├── layouts/                         # 版面配置
│   └── default.tsx                  # 預設版面（含導覽與主題）
├── utils/                           # 工具函式
│   ├── animations.ts                # 動畫輔助函式
│   ├── env.ts                       # 環境變數管理
│   ├── formatters.ts                # 資料格式化工具
│   ├── localStorage.ts              # 本地儲存輔助
│   ├── pathUtils.ts                 # 路徑工具函式
│   └── resumeLoader.ts              # YAML 履歷載入器
├── config/                          # 設定檔
│   └── site.ts                      # 網站設定與導覽配置
├── constants/                       # 常數
│   └── index.ts                     # 全域常數
├── types/                           # TypeScript 型別定義
│   ├── errors.ts                    # 錯誤型別
│   ├── index.ts                     # 通用型別（Resume、GitHub API 等）
│   └── ogl.d.ts                     # OGL WebGL 函式庫型別宣告
├── styles/                          # 全域樣式
│   ├── globals.css                  # 全局 CSS 樣式
│   └── plugins.ts                   # Tailwind 外掛
├── App.tsx                          # 應用程式路由進入點
├── main.tsx                         # React 渲染進入點
├── provider.tsx                     # Context Providers（主題等）
└── vite-env.d.ts                    # Vite 環境型別定義
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

# 建置專案（預設目標）
make
# 或
make build

# 清理產生的檔案與 Git 快取
make clean

# 執行格式化與 Lint（等同於 yarn format + yarn lint）
make fmt

# 執行專案（需要先 build）
make run
```

### 持續整合 / 持續部署（CI/CD）

專案配置了多個 GitHub Actions 工作流程：

- **自動部署**（`deploy.yml`）：推送到 main/master 分支時，自動建置並部署到 GitHub Pages
- **程式碼掃描**（`code_scan.yml`）：使用 CodeQL 進行安全性分析
- **程式碼品質檢查**（`code-quality-check.yml`）：自動執行 TypeScript、Prettier 與 ESLint 檢查
- **相依性審查**（`dependency-review.yml`）：檢查 Pull Request 中的相依性變更
- **語意化 PR**（`semantic-pull-request.yml`）：確保 Pull Request 標題符合 Conventional Commits 規範
- **自動標籤**（`auto_labeler.yml`）：根據變更內容自動添加標籤
- **Release 草稿**（`release_drafter.yml`）：自動生成 Release Notes 草稿
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

HeroUI 的主題設定位於 `tailwind.config.js`，可依需求自訂色彩與樣式。主題切換功能已整合在導覽列中，支援深色/淺色模式。

### 自訂履歷區塊

履歷系統採用模組化設計，每個區塊都是獨立元件：

1. 在 `src/components/ResumeSections/` 新增或修改區塊元件
2. 在 `src/components/ResumeContent.tsx` 中引入並使用新元件
3. 確保 YAML 資料結構與元件預期的格式相符

### API 限制

GitHub API 具有速率限制，建議：

- 使用個人存取權杖（PAT）以提高限制（每小時 5,000 次請求）
- 未認證請求限制為每小時 60 次
- 設計適當的快取策略以減少 API 呼叫
- 面對大量資料時採用分頁載入

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

**PIN 碼驗證無法通過**

- 確認 `.env` 中的 `VITE_PIN_CODE` 值與輸入相符
- 注意 PIN 碼有大小寫區分
- 可透過 URL 參數傳遞 PIN：`/resume?pin=你的PIN`

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
- [JSON Resume](https://jsonresume.org) - 履歷資料標準
- 所有開源專案的貢獻者

## 授權條款

依據 [MIT 授權](LICENSE) 授權。

---

**如果這個專案對你有幫助，請給個 ⭐️！**
