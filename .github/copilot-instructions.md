<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->
---
applyTo: "**"
---

# 個人網站開發專案
- 透過 HeroUI 提供的框架構建一個可用於 Github Pages 的個人網站
- 使用 `vite` 和 `npm` 作為前端開發工具
- 上方需要透過 `HeroUI` 提供的 `Navbar` 元件來做導覽列
    - 導航頁面目前只需要 `Resume`, `Portfolio` 和 `Blog` 三個頁面
    - 其他不需要的頁面請幫我全部刪除

# `Home` 頁面
- 透過 `reactbits` 提供的元件來做生動的頁面
    - 首頁透過 `Orb` 當背景 中間則透過 `Split Text` 來顯示我的 `Github` 名字 `Mai0313`
    - 透過 `Gradient Text` 或其他套件 幫我設計一個位置擺放我的聯繫資訊
        - Discord是 `mai9999`
        - Github是 `Mai0313`
        - Email是 `mai@mai0313.com`

# `Resume` 頁面
- 該頁面需要透過輸入 `pin code` 解鎖我的個人履歷 因為我不希望每個人都能訪問到我的履歷
- 當輸入正確的 `pin code` 時，會顯示我的個人履歷
- 當輸入錯誤的 `pin code` 時，會顯示錯誤訊息
    - 透過 `FuzzyText` 來顯示錯誤訊息
- `pin code` 可以利用 `npx heroui-cli@latest add input-otp` 當作元件使用
- `pin code` 可以透過環境變數 `VITE_PIN_CODE` 來設定
- 履歷內容稍後會補上 現在先不用做

# `Portfolio` 頁面
- 該頁面需要顯示我的作品集
- 作品集需要包含每個專案的標題、描述和連結
- 希望可以透過 Github API 來動態載入我的專案

# `Blog` 頁面
- 該頁面需要顯示我的部落格文章
- 文章需要包含標題、日期和內容
- 這頁面目前可以先不做 後續有需要再補上
