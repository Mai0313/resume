<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# 個人網站開發專案
- 透過 HeroUI 提供的框架構建一個可用於 Github Pages 的個人網站
- 使用 `vite` 和 `yarn` 作為前端開發工具
- Navbar 導覽列目前只包含 `Resume` 和 `Portfolio` 兩個頁面，點擊品牌 LOGO 可返回 `Home` 頁面
- 其他自定義頁面已移除，現有三個路由：`Home (/)`、`Resume (/resume)`、`Portfolio (/portfolio)`
- 基礎設施建置完成，內容佔位中，稍後再完成具體功能與樣式
- 請不要安裝任何套件，任務完成後提醒開發者執行 `yarn add` 安裝必要的套件

# 專案需求

## `Home` 頁面
- 透過 `@react-spring/web` 提供的元件來做生動的頁面
- 首頁透過 `Orb` 當背景，中間透過 `Split Text` 顯示 Github 名字 `Mai0313`
- 透過 `Gradient Text` 或其他套件設計位置顯示聯繫資訊：Discord `mai9999`、Github `Mai0313`、Email `mai@mai0313.com`
* `Split Text` 可透過 `import SplitText from "./SplitText";` 使用
* `Orb` 可透過 `import Orb from './Orb';` 使用
* `Gradient Text` 可透過 `import GradientText from './GradientText';` 使用
