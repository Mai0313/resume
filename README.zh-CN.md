# 个人履历网站

这是一个使用 Vite 与 HeroUI 构建的个人网站，支持部署到 GitHub Pages。

## 功能特色

- 动态首页效果（Orb、SplitText、GradientText）
- 智能页面显示：只有在设置相应环境变量后才会显示页面
  - 设置 `VITE_RESUME_FILE` 才会显示「履历」页面
  - 设置 `VITE_GITHUB_TOKEN` 才会显示「作品集」页面
- 履历 PIN 码保护（可选）
- GitHub 作品集：自动抓取个人项目与贡献
- 响应式设计与明暗主题切换
- 一键下载 PDF 履历：从 YAML 履历数据直接生成 PDF（不依赖页面样式）

## 快速开始

1. 安装依赖
   ```bash
   yarn install
   ```
2. 设置环境变量（创建 `.env`）
   ```bash
   VITE_WEBSITE_TITLE=YourName
   # 履历来源（可用本地 public/ 文件、GitHub Gist、或 Raw URL）
   VITE_RESUME_FILE=example.yaml
   # 可选：履历 PIN 码
   VITE_PIN_CODE=123456
   # 可选：GitHub Token（显示作品集页面）
   VITE_GITHUB_TOKEN=your_github_token_here
   ```
3. 启动开发服务器
   ```bash
   yarn dev
   ```

## 履历页面（/resume）

- 使用 YAML 管理履历内容（基本信息、工作经历、教育、技能、项目等）
- 支持本地文件、GitHub Gist、或 Raw URL 加载
- 页面右上角提供「Download PDF」按钮，一键下载 PDF 履历
- 生成的 PDF 直接使用 YAML (`ResumeData`) 进行排版，内容一致

## 部署

- GitHub Pages：`yarn build && yarn deploy`
- Vercel：已提供 `vercel.json`，可直接部署

## 许可证

本项目使用 MIT 许可证。