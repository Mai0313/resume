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

## `Home` 頁面
- 透過 `@react-spring/web` 提供的元件來做生動的頁面
- 首頁透過 `Orb` 當背景，中間透過 `Split Text` 顯示 Github 名字 `Mai0313`
- 透過 `Gradient Text` 或其他套件設計位置顯示聯繫資訊：Discord `mai9999`、Github `Mai0313`、Email `mai@mai0313.com`
* `Split Text` 可透過 `import SplitText from "./SplitText";` 使用
* `Orb` 可透過 `import Orb from './Orb';` 使用
* `Gradient Text` 可透過 `import GradientText from './GradientText';` 使用

## `Resume` 頁面
- **智能 PIN 碼保護**: 根據環境變數 `VITE_PIN_CODE` 的設定狀態決定是否需要 PIN 碼驗證
  - 未設定 `VITE_PIN_CODE` 時：直接顯示履歷內容，適合開發和測試環境
  - 設定 `VITE_PIN_CODE` 時：需要輸入正確 PIN 碼才能訪問履歷，保護個人隱私
- 當輸入錯誤的 `pin code` 時，會透過 `FuzzyText` 來顯示 404 NotFound
- **履歷系統已完成實現**:
  - 使用 YAML 配置文件 (`public/resume.yaml`) 管理履歷數據
  - 透過 `ResumeContent` 組件優雅展示履歷內容
  - 支持響應式設計和主題切換
  - 包含完整的個人信息、教育背景、研究經驗、工作經歷、技能、獲獎等欄位

## `Portfolio` 頁面
- **GitHub API 整合完成**: 透過 GitHub API 自動獲取並展示個人專案和貢獻記錄
- **Pinned 專案優先**: 自動獲取 GitHub Pinned repositories 並優先展示在最上方
- **完整專案資訊**: 顯示專案語言、星星數、fork 數、最新 commit、主題標籤等
- **響應式設計**: 支援深色/淺色主題，具備完整的動畫效果
- **環境變數配置**: 使用 `VITE_GITHUB_TOKEN` 環境變數來存取 GitHub API

# 最新更新記錄

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