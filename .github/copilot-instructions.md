<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

**每一次代碼修改 請隨時更新此文件 以便後續其他人能快速了解專案狀態**

# 個人網站開發專案
- 透過 HeroUI 提供的框架構建一個可用於 Github Pages 的個人網站
- 使用 `vite` 和 `yarn` 作為前端開發工具
- Navbar 導覽列目前只包含 `Resume` 和 `Portfolio` 兩個頁面，點擊品牌 LOGO 可返回 `Home` 頁面
- 其他自定義頁面已移除，現有三個路由：`Home (/)`、`Resume (/resume)`、`Portfolio (/portfolio)`
- 基礎設施建置完成，內容佔位中，稍後再完成具體功能與樣式
- 你不需要執行安裝套件的命令 你只需要在任務完成後提醒開發者執行 `yarn add` 安裝必要的套件

# 專案需求

## 核心架構組件

### UI 組件系統
- **`components/primitives.ts`**: 提供 TailwindCSS 變體工具函數
  - `title`: 支援多種漸變色彩和尺寸的標題樣式 (violet, yellow, blue, cyan, green, pink, foreground)
  - `subtitle`: 響應式副標題樣式
  - 所有樣式支援 `bg-clip-text text-transparent bg-gradient-to-b` 漸變效果

### 圖標系統
- **`components/icons.tsx`**: 完整的 SVG 圖標組件庫
  - `Logo`: 品牌標誌圖標
  - `GithubIcon`: GitHub 社群媒體圖標  
  - `DiscordIcon`: Discord 社群媒體圖標
  - `SunFilledIcon` / `MoonFilledIcon`: 主題切換圖標
  - 所有圖標支援尺寸自定義和 `IconSvgProps` 類型定義

### 導覽系統
- **`components/navbar.tsx`**: 主導覽列組件
  - 響應式設計，支援手機和桌面佈局
  - 整合主題切換功能
  - 品牌 LOGO 連結到首頁
  - 社群媒體圖標連結 (GitHub, Discord)

### 佈局系統
- **`layouts/default.tsx`**: 預設頁面佈局組件
  - 包含固定的 `Navbar` 導覽列
  - 響應式容器佈局 (`max-w-7xl mx-auto`)
  - 彈性高度設計 (`flex-grow pt-16`)

### 主題系統
- **`components/theme-switch.tsx`**: 深色/淺色主題切換組件
  - 使用 `@heroui/use-theme` hook 管理主題狀態
  - 防止 SSR 水合不匹配問題
  - 支援鍵盤無障礙操作

### 配置系統
- **`config/site.ts`**: 網站核心配置
  - 導覽項目定義 (`Resume`, `Portfolio`)
  - 社群媒體連結配置 (`github`, `discord`)
  - 統一的網站名稱和描述管理

### 特效組件系統
- **`components/SplitText.tsx`**: 分割文字動畫組件，用於首頁標題顯示
- **`components/Orb.tsx`**: 3D 球體背景效果組件，使用 OGL 3D 圖形庫
- **`components/Particles.tsx`**: 背景粒子系統，支援主題切換和互動效果
- **`components/FuzzyText.tsx`**: 模糊文字特效組件，用於 404 錯誤頁面

### 內容組件系統
- **`components/PortfolioContent.tsx`**: Portfolio 頁面內容組件
  - 使用 HeroUI 組件構建現代化卡片式佈局
  - 支援 GitHub API 資料展示和動畫效果
- **`components/ResumeContent.tsx`**: Resume 頁面內容組件
  - 基於 YAML 配置的履歷展示系統
  - 響應式設計和 Framer Motion 動畫

## `Home` 頁面 (`pages/index.tsx`)
- 透過 `@react-spring/web` 提供的元件來做生動的頁面
- 首頁透過 `Orb` 當背景，中間透過 `Split Text` 顯示 Github 名字 `Mai`
- 透過 `Particles` 作為背景粒子系統，支援主題切換和互動效果
- 聯繫資訊透過 `Navbar` 中的圖標連結顯示：Discord、Github
* `Split Text` 可透過 `import SplitText from "./SplitText";` 使用
* `Orb` 可透過 `import Orb from './Orb';` 使用
* `Particles` 可透過 `import Particles from './Particles';` 使用
* 漸變文字效果可透過 `title` utility 從 `@/components/primitives` 實現

## `Resume` 頁面 (`pages/resume.tsx`)
- **智能 PIN 碼保護**: 根據環境變數 `VITE_PIN_CODE` 的設定狀態決定是否需要 PIN 碼驗證
  - 未設定 `VITE_PIN_CODE` 時：直接顯示履歷內容，適合開發和測試環境
  - 設定 `VITE_PIN_CODE` 時：需要輸入正確 PIN 碼才能訪問履歷，保護個人隱私
- 當輸入錯誤的 `pin code` 時，會透過 `FuzzyText` 來顯示 404 NotFound
- **履歷系統已完成實現**:
  - 使用 YAML 配置文件 (`public/resume.yaml`) 管理履歷數據
  - 透過 `ResumeContent` 組件優雅展示履歷內容
  - 支持響應式設計和主題切換
  - 包含完整的個人信息、教育背景、研究經驗、工作經歷、技能、獲獎等欄位

## `Portfolio` 頁面 (`pages/portfolio.tsx`)
- **GitHub API 整合完成**: 透過 GitHub API 自動獲取並展示個人專案和貢獻記錄
- **Pinned 專案優先**: 自動獲取 GitHub Pinned repositories 並優先展示在最上方
- **完整專案資訊**: 顯示專案語言、星星數、fork 數、最新 commit、主題標籤等
- **響應式設計**: 支援深色/淺色主題，具備完整的動畫效果
- **環境變數配置**: 使用 `VITE_GITHUB_TOKEN` 環境變數來存取 GitHub API
- **用戶體驗優化**: homepage 連結顯示為 "🔗 Link"，適用於各種類型的專案連結

## 工具函數系統

### GitHub API 整合
- **`utils/githubApi.ts`**: GitHub API 操作工具函數
  - 支援 REST API 和 GraphQL API 混合使用
  - 實現 Pinned repositories 獲取功能
  - 錯誤處理和速率限制管理

### 資料載入
- **`utils/resumeLoader.ts`**: YAML 履歷資料載入工具
  - 動態載入 `public/resume.yaml` 配置文件
  - 錯誤處理和類型安全

### 路徑工具函數
- **`utils/pathUtils.ts`**: 自定義 ROOT PATH 支援工具函數
  - `getRootPath()`: 從環境變數 `VITE_ROOT_PATH` 獲取根路徑，預設為 '/'
  - `buildPath(path)`: 建構完整路徑，包含根路徑前綴 (例如：`/my-app/resume`)
  - `getBasename()`: 獲取 React Router 的 basename 配置
  - 支援不同部署環境的路徑配置（根目錄、子目錄、GitHub Pages 等）

## 樣式與類型系統

### CSS 工具類
- **`styles/globals.css`**: 全域樣式定義
  - 包含 Tailwind CSS 基礎樣式
  - 自定義 `line-clamp-1`, `line-clamp-2`, `line-clamp-3` 工具類
  - 用於文字截斷和省略號顯示

### 特殊效果樣式
- **`styles/Orb.css`**: Orb 組件專用樣式
- **`styles/Particles.css`**: Particles 組件專用樣式

### TypeScript 類型定義
- **`types/index.ts`**: 核心類型定義
  - `IconSvgProps`: SVG 圖標組件屬性類型
  - `GitHubRepository`: GitHub 倉庫資料結構
  - `GitHubCommit`: GitHub 提交記錄結構
  - `GitHubContribution`: GitHub 貢獻資料結構 (包含 `isPinned` 標記)
- **`types/ogl.d.ts`**: OGL 3D 圖形庫類型聲明

### 應用程式核心
- **`App.tsx`**: 主應用程式組件，包含路由配置
- **`main.tsx`**: 應用程式入口點，渲染根組件
- **`provider.tsx`**: HeroUI 主題提供者配置，支援深色模式

# 最新更新記錄

## 2025-05-30 自定義 ROOT PATH 功能實現
- **多環境部署支援**: 實現了完整的自定義根路徑功能，支援不同部署環境
  - 創建 `src/utils/pathUtils.ts` 提供路徑處理工具函數
  - 支援環境變數 `VITE_ROOT_PATH` 配置根路徑
  - 更新 `vite.config.ts` 支援 Vite base 路徑配置
  - 更新 `main.tsx` 支援 React Router basename 配置
- **路徑工具函數系統**:
  - `getRootPath()`: 從環境變數獲取並正規化根路徑
  - `buildPath(path)`: 自動建構包含根路徑前綴的完整路徑
  - `getBasename()`: 提供 React Router 兼容的 basename
- **配置系統更新**:
  - 更新 `config/site.ts` 使用動態路徑建構
  - 更新 `components/navbar.tsx` 的首頁連結使用 `buildPath`
  - 所有內部導覽連結自動支援根路徑前綴
- **環境變數文檔**:
  - 更新 `.env.example` 添加 `VITE_ROOT_PATH` 說明和使用範例
  - 支援多種部署場景：根目錄、子目錄、GitHub Pages 專案目錄
- **使用場景**:
  - **根目錄部署**: `VITE_ROOT_PATH=/` 或不設定（預設）
  - **子目錄部署**: `VITE_ROOT_PATH=/my-app`
  - **GitHub Pages**: `VITE_ROOT_PATH=/your-repo-name`
- **技術特色**:
  - 自動路徑正規化，處理斜線問題
  - React Router 和 Vite 完全兼容
  - 保持所有現有功能和主題切換
  - 向下相容，不影響現有部署

## 2025-05-30 Portfolio 卡片佈局優化
- **底部連結固定**: 優化 PortfolioContent 組件的卡片佈局
  - 使用 `flex flex-col` 和 `flex-grow` 確保卡片內容正確分佈
  - 添加 `mt-auto` 類別確保底部區域（homepage 連結）始終固定在卡片底部
  - 改善卡片高度一致性，提升視覺整齊度
  - 添加註釋說明底部固定區域的用途
- **用戶體驗提升**:
  - 無論卡片內容多少，🔗 Link 連結都會保持在底部相同位置
  - 保持響應式設計和現有的動畫效果
  - 維持深色/淺色主題兼容性

## 2025-05-30 Portfolio 功能優化與文檔完善
- **用戶體驗優化**: 用戶手動調整 PortfolioContent 組件
  - 將 homepage 連結文字從 "🔗 Demo" 改為 "🔗 Link"
  - 提升用戶體驗，因為 homepage 可能是專案主頁、文檔或其他類型連結
- **文檔架構完善**: 完整記錄所有專案組件和功能
  - 新增特效組件系統說明 (SplitText, Orb, Particles, FuzzyText)
  - 新增內容組件系統說明 (PortfolioContent, ResumeContent)
  - 新增工具函數系統說明 (githubApi, resumeLoader)
  - 添加導覽系統記錄 (navbar.tsx)
  - 確保所有 `src` 目錄中的組件都被正確記錄
- **專案架構透明化**: 
  - 所有頁面組件 (`pages/`) 都已被詳細記錄
  - 所有核心組件 (`components/`) 都已被分類說明
  - 所有工具函數 (`utils/`) 都已被記錄
  - 確保文檔與實際程式碼完全一致

## 2025-05-30 專案架構文檔完善
- **文檔錯誤修正**: 修正了不存在的 `GradientText` 組件引用
  - 移除錯誤的 `import GradientText from './GradientText';` 說明
  - 更新為使用 `title` utility 從 `@/components/primitives` 實現漸變文字效果
  - 修正 Home 頁面描述，反映實際的實現狀態
- **核心架構組件文檔化**:
  - 新增完整的 UI 組件系統說明 (`primitives.ts`)
  - 記錄圖標系統的所有組件 (`icons.tsx`)
  - 文檔化佈局系統 (`default.tsx`) 和主題系統 (`theme-switch.tsx`)
  - 添加配置系統說明 (`site.ts`)
- **樣式與類型系統記錄**:
  - 文檔化 CSS 工具類和特殊效果樣式
  - 記錄完整的 TypeScript 類型定義
  - 添加應用程式核心組件說明 (`App.tsx`, `main.tsx`, `provider.tsx`)
- **確保文檔完整性**:
  - 檢查 `src` 目錄中所有組件都已被正確記錄
  - 移除不實或過時的組件引用
  - 所有功能描述符合實際實現狀態

## 2025-05-30 Resume PIN 碼條件邏輯優化
- **條件性 PIN 碼驗證**: 實現了智能的 PIN 碼驗證機制
  - 當 `VITE_PIN_CODE` 環境變數未設定或為空時，直接顯示履歷內容，無需 PIN 碼驗證
  - 當設定了 `VITE_PIN_CODE` 時，保持原有的 PIN 碼驗證保護機制
  - 使用 `IS_PIN_ENABLED` 常數控制整個驗證流程
- **自動初始化邏輯**:
  - 組件載入時自動檢查 PIN 碼啟用狀態
  - 未啟用時自動設定 `authenticated = true` 並載入履歷資料
  - 啟用時維持原有的 Modal 驗證流程
- **使用場景優化**:
  - **開發環境**: 不設定或清空 `VITE_PIN_CODE`，直接訪問履歷內容，便於開發測試
  - **生產環境**: 設定 `VITE_PIN_CODE`，需要正確 PIN 碼才能查看履歷，保護隱私
- **保持向下相容**:
  - 所有原有功能完全保留：主題切換、FuzzyText 404 效果、動畫效果
  - 錯誤處理機制僅在啟用 PIN 碼時觸發
  - Modal 組件條件性渲染，避免不必要的 UI 元素

## 2025-05-30 Portfolio 功能完整實現
- **GitHub API 整合系統**: 實現了完整的 GitHub API 整合，支援動態載入個人專案
  - 創建 `src/utils/githubApi.ts` 提供完整的 GitHub API 操作函數
  - 支援 REST API 和 GraphQL API 混合使用，優化資料獲取效率
  - 實現 API 錯誤處理和速率限制管理
- **Pinned 專案優先顯示**:
  - 使用 GitHub GraphQL API 獲取使用者的 Pinned repositories
  - Pinned 專案自動排序到最上方，並標示 "📌 Pinned" 徽章
  - 支援顯示在其他人 repo 中的貢獻專案
- **PortfolioContent 組件設計**:
  - 使用 HeroUI 組件構建現代化卡片式佈局
  - 動態顯示專案語言、星星數、fork 數、最新 commit 記錄
  - 支援專案主題標籤展示和 demo 連結
  - 實現響應式網格佈局 (手機 1 列、平板 2 列、桌面 3 列)
- **視覺設計優化**:
  - repo 名稱靠左對齊，pinned 標誌、統計資訊靠右對齊
  - 支援程式語言顏色標示，提升視覺識別度
  - 添加 Framer Motion 動畫效果，提供流暢的載入體驗
- **技術架構特色**:
  - TypeScript 類型定義完整，包含 GitHubRepository, GitHubCommit, GitHubContribution
  - 環境變數管理：`VITE_GITHUB_TOKEN` 用於 GitHub API 認證
  - 錯誤處理機制：載入狀態、錯誤提示、空狀態處理
  - 符合 ESLint 規範，無任何警告或錯誤

## 2025-05-30 履歷系統完整實現
- **YAML 驅動的履歷系統**: 實現了基於 YAML 配置的完整履歷管理系統
  - 創建 `public/resume.yaml` 作為履歷數據源，支持結構化配置
  - 實現 `src/utils/resumeLoader.ts` 用於動態加載 YAML 數據
- **Resume 頁面功能完善**:
  - 保持原有的 PIN 碼驗證機制 (環境變數 `VITE_PIN_CODE`)
  - 整合新的 `ResumeContent` 組件，實現美觀的履歷展示
  - 添加載入狀態和錯誤處理機制
  - 維持 404 FuzzyText 效果與主題切換的兼容性
- **ResumeContent 組件設計**:
  - 使用 HeroUI 組件 (Card, Chip, Divider, Link) 構建現代化 UI
  - 實現響應式佈局，支持深色/淺色主題
  - 添加 Framer Motion 動畫效果，提升用戶體驗
  - 結構化展示：個人信息、教育背景、研究經驗、工作經歷、技能、獲獎、社區貢獻、研究興趣
- **依賴套件更新**:
  - 新增 `js-yaml` 和 `@types/js-yaml` 用於 YAML 解析
  - 安裝缺失的 HeroUI 組件：`@heroui/card`, `@heroui/chip`, `@heroui/divider`, `@heroui/spinner`
  - 確保 `framer-motion` 已正確安裝用於動畫效果
- **技術架構優化**:
  - YAML 配置文件位於 `public/` 目錄，確保正確的網路訪問
  - TypeScript 類型定義完整，提供良好的開發體驗
  - 組件化設計，便於維護和擴展
  - 遵循 Vite 最佳實踐，優化打包和部署

## 2025-05-30 主題切換功能完善
- **問題修復**: 修復了 Particles 組件和 404 FuzzyText 效果在深色/淺色主題切換時的適應問題
- **Particles 組件優化**:
  - 添加 `useTheme` hook 實現主題感知
  - 實現動態顏色選擇：深色模式使用白色/灰色粒子，淺色模式使用深灰色粒子
  - 移除硬編碼的 particleColors，改為自動主題檢測
- **404 FuzzyText 效果修復**:
  - 實現雙重主題檢測：useTheme hook + DOM MutationObserver
  - 添加組件重新渲染機制，使用 renderKey 和 forceRender 狀態
  - 增強 FuzzyText 組件的 canvas 處理和主題變化響應
  - 添加完整的 canvas 清理和重置機制
- **代碼品質改善**:
  - 移除了所有 console.log 語句以符合 ESLint 規範
  - 清理了不必要的調試輸出，保持代碼整潔
  - ESLint 檢查現在完全通過，無任何警告或錯誤
- **技術改進**:
  - 主題切換現在能夠正確響應所有視覺效果
  - 粒子系統和文字特效都能即時適應主題變化
  - 增強了組件的穩定性和用戶體驗

## 2025-05-30 ESLint 代碼品質修正
- **修正內容**: 移除了所有剩餘的 console 語句以完全符合 ESLint 規範
- **修正檔案**:
  - `src/pages/resume.tsx`: 移除錯誤處理中的 `console.log` 語句，同時移除未使用的錯誤參數
  - `src/utils/resumeLoader.ts`: 移除 `console.error` 語句，保持錯誤傳播機制
- **結果**: ESLint 檢查現在完全通過，無任何警告或錯誤，達到 100% 代碼品質標準
- **影響**: 保持了原有的錯誤處理功能，僅移除了調試輸出，符合生產環境代碼要求