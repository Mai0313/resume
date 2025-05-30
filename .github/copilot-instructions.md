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
- 該頁面需要透過輸入 `pin code` 解鎖我的個人履歷 因為我不希望每個人都能訪問到我的履歷
- 當輸入正確的 `pin code` 時，會顯示我的個人履歷
- 當輸入錯誤的 `pin code` 時，會透過 `FuzzyText` 來 404 NotFound
- **履歷系統已完成實現**:
  - 使用 YAML 配置文件 (`public/resume.yaml`) 管理履歷數據
  - 透過 `ResumeContent` 組件優雅展示履歷內容
  - 支持響應式設計和主題切換
  - 包含完整的個人信息、教育背景、研究經驗、工作經歷、技能、獲獎等欄位

## `Portfolio` 頁面
- 該頁面需要顯示我的作品集
- 作品集需要包含每個專案的標題、描述和連結
- 希望可以透過 Github API 來動態載入我的專案

# 最新更新記錄

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