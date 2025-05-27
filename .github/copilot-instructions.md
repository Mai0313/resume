<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->
---
applyTo: "**"
---

# 個人網站開發專案
- 透過 HeroUI 提供的框架構建一個可用於 Github Pages 的個人網站
- 使用 `vite` 和 `yarn` 作為前端開發工具
- 上方需要透過 `HeroUI` 提供的 `Navbar` 元件來做導覽列
    - 導航頁面目前只需要 `Resume` 和 `Portfolio` 兩個頁面
    - 其他不需要的頁面請幫我全部刪除
- 每一次進行代碼修改或新增功能時 請同步更新此文件 以便其他開發者能更快地了解專案需求
- 請不要安裝任何套件 你只需要在任務完成後提醒開發者安裝套件即可

# 專案需求

## `Home` 頁面
- 透過 `@react-spring/web` 提供的元件來做生動的頁面
- 首頁透過 `Orb` 當背景 中間則透過 `Split Text` 來顯示我的 `Github` 名字 `Mai0313`
- 透過 `Gradient Text` 或其他套件 幫我設計一個位置擺放我的聯繫資訊
    - Discord是 `mai9999`
    - Github是 `Mai0313`
    - Email是 `mai@mai0313.com`
* `Split Text` 可以透過 `import SplitText from "./SplitText";` 來使用
* `Orb` 可以透過 `import Orb from './Orb';` 來使用
* `Gradient Text` 可以透過 `import GradientText from './GradientText'` 來使用
