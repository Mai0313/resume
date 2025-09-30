<center>

# 个人简历

[![React](https://img.shields.io/badge/-React_19.1-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/-TypeScript_5.8-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![license](https://img.shields.io/badge/License-MIT-green.svg?labelColor=gray)](https://github.com/Mai0313/resume/tree/master?tab=License-1-ov-file)
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/Mai0313/resume/pulls)
[![contributors](https://img.shields.io/github/contributors/Mai0313/resume.svg)](https://github.com/Mai0313/resume/graphs/contributors)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FMai0313%2Fresume&env=VITE_WEBSITE_TITLE,VITE_GITHUB_TOKEN,VITE_RESUME_FILE,VITE_PIN_CODE,VITE_ROOT_PATH&project-name=resume-web&repository-name=resume-web&skippable-integrations=1)

</center>

这是一个使用 Vite 与 HeroUI 框架构建的个人网站，适合部署到 GitHub Pages。

## 功能特性

- 动态首页：使用 @react-spring/web 和自定义组件（Orb、SplitText、GradientText）打造生动的视觉效果
- 智能页面显示：仅在环境变量正确配置时显示页面——简历需配置 `VITE_RESUME_FILE`，作品集需配置 `VITE_GITHUB_TOKEN`
- 简历 PIN 保护：基于 YAML 配置的简历系统，支持 PIN 码验证保护隐私
- GitHub 作品集：通过 GitHub API 自动获取并展示个人项目与贡献
- 响应式设计：支持深色/浅色主题切换与全响应式布局
- 现代 UI：采用 HeroUI 组件库与 Framer Motion 动画
- 带推理预览的 AI 助手：当使用具备推理能力的模型（如 GPT-5）时，助手会在答案上方以低调方式流式显示精简推理摘要，帮助你了解思路而不受干扰。

## 技术栈

- [Vite](https://vitejs.dev/guide/) - 快速的前端构建工具
- [HeroUI](https://heroui.com) - React UI 组件库
- [Tailwind CSS](https://tailwindcss.com) - CSS 框架
- [TypeScript](https://www.typescriptlang.org) - 类型安全的 JavaScript
- [Framer Motion](https://www.framer.com/motion) - React 动画库
- [React Spring](https://react-spring.dev/) - 弹簧动画库
- [GitHub API](https://docs.github.com/en/rest) - 获取项目数据

## 环境配置

### 环境变量

创建一个 `.env` 文件并设置以下变量：

```bash
# 必填：网站标题
VITE_WEBSITE_TITLE=Mai

# 可选：简历文件 - 未设置时，简历页面将被隐藏
# 支持本地文件与 URL
# 本地文件示例：
VITE_RESUME_FILE=example.yaml
# GitHub Gist 示例：
# VITE_RESUME_FILE=https://gist.github.com/username/gist_id
# Raw URL 示例：
# VITE_RESUME_FILE=https://raw.githubusercontent.com/user/repo/main/resume.yaml

# 可选：简历 PIN 码保护
VITE_PIN_CODE=123456

# 可选：GitHub API Token - 未设置时，作品集页面将被隐藏
VITE_GITHUB_TOKEN=your_github_token_here

# 可选：OpenAI 聊天助手（启用站内 AI 助手）
# 必须同时设置以下变量，聊天助手才会显示
VITE_OPENAI_BASE_URL=https://api.openai.com/v1
VITE_OPENAI_API_KEY=sk-xxxx
VITE_OPENAI_MODEL=gpt-5
```

重要说明：

- 智能页面显示：仅当对应环境变量配置完成后，页面才会出现在导航与路由中
  - 简历页（`/resume`）仅在设置 `VITE_RESUME_FILE` 后显示
  - 作品集页（`/portfolio`）仅在设置 `VITE_GITHUB_TOKEN` 后显示
- 将 `your_github_token_here` 替换为你的 GitHub 个人访问令牌（PAT）
- GitHub Token 需要 `public_repo` 权限以读取公共仓库
- 请勿将真实 Token 提交到版本控制

### 安装依赖

推荐使用 `yarn`：

```bash
yarn install
```

或使用 `npm`：

```bash
npm install
```

### 启动开发服务器

```bash
yarn dev
```

或：

```bash
npm run dev
```

## 页面功能

### 首页（`/`）

- 动态 Orb 背景效果
- 使用 Split Text 动画显示 GitHub 用户名
- 渐变文字显示联系信息
- 响应式设计与主题切换

### 简历页（`/resume`）

- 条件式显示：仅在配置 `VITE_RESUME_FILE` 后出现
- 支持 PIN 码验证保护（可选）
- 灵活的简历加载方式：
  - 本地 YAML 文件：`example.yaml`、`resume.yaml`（从 `public/` 目录加载）
  - GitHub Gist：Gist 链接会自动转换为原始文件格式
  - Raw URL：任意可访问的 YAML 文件链接
- 基于 YAML 的简历数据管理
- 结构化展示个人信息、教育经历、工作经验等
- PDF 下载：提供按钮保存 PDF（使用 `public/example.pdf`）
- 响应式设计与动画效果

### 作品集页（`/portfolio`）

### AI 助手（浮动聊天）

- 当 `VITE_OPENAI_BASE_URL`、`VITE_OPENAI_API_KEY` 与 `VITE_OPENAI_MODEL` 配置完成后显示
- 实时流式输出答案；如果所选模型支持推理，会在答案上方以小型、低调区域显示推理摘要
- 可通过“清除对话”按钮清空会话

- 条件式显示：仅在配置 `VITE_GITHUB_TOKEN` 后出现
- 自动获取 GitHub 仓库与贡献
- 展示项目信息：语言、Star、Fork、主题标签
- 显示近期提交记录
- 支持项目 Demo 与 GitHub 链接

## 自定义配置

### 配置页面显示

网站会根据环境变量自动显示/隐藏页面：

- 简历页：仅在设置 `VITE_RESUME_FILE` 后显示
- 作品集页：仅在设置 `VITE_GITHUB_TOKEN` 后显示
- 导航菜单：动态更新，仅显示可用页面

### 修改 GitHub 用户名

无需手动配置！GitHub 用户名会根据你的 `VITE_GITHUB_TOKEN` 自动获取。

### 编辑简历内容

你可以通过以下方式配置简历：

#### 选项一：本地 YAML 文件

编辑 `public/example.yaml`，或在 `public/` 目录创建你自己的 YAML 文件：

```bash
# 在 .env 文件中
VITE_RESUME_FILE=my-resume.yaml
```

#### 选项二：GitHub Gist（推荐）

创建一个包含简历 YAML 的 GitHub Gist，并使用该 Gist 链接：

```bash
# 在 .env 文件中
VITE_RESUME_FILE=https://gist.github.com/your-username/your-gist-id
```

使用 GitHub Gist 的好处：

- 无需重新部署即可更新简历
- 简历版本控制
- 可选择公开或私密

#### 选项三：Raw URL

使用任意可访问的 YAML 文件链接：

```bash
# 在 .env 文件中
VITE_RESUME_FILE=https://raw.githubusercontent.com/user/repo/main/resume.yaml
```

### 修改 PIN 码

在 `.env` 文件中调整 `VITE_PIN_CODE` 的值。

## 部署

### 部署到 GitHub Pages

```bash
yarn build
yarn deploy
```

### 部署到 Vercel

项目已包含 `vercel.json`，可直接在 Vercel 上部署。

## 项目结构

```
src/
├── components/          # 可复用组件
│   ├── FuzzyText.tsx   # 404 文字效果
│   ├── Orb.tsx         # 动态背景球
│   ├── SplitText.tsx   # 文字拆分动画
│   ├── PortfolioContent.tsx  # 作品集内容组件
│   └── ResumeContent.tsx     # 简历内容组件
├── pages/              # 页面组件
│   ├── index.tsx       # 首页
│   ├── portfolio.tsx   # 作品集页
│   └── resume.tsx      # 简历页
├── utils/              # 工具函数
│   ├── githubApi.ts    # GitHub API 相关函数
│   └── resumeLoader.ts # 简历 YAML 加载器
└── types/              # TypeScript 类型定义
    └── index.ts        # 通用类型定义
```

## 开发指南

### 新增页面

1. 在 `src/pages/` 新增页面组件
2. 在 `src/App.tsx` 新增路由
3. 在 `src/components/navbar.tsx` 新增导航链接

### 修改主题

HeroUI 的主题配置位于 `tailwind.config.js`，可按需自定义颜色与样式。

### API 限制

GitHub API 存在速率限制，建议：

- 使用个人访问令牌（PAT）以提高额度
- 设计合适的缓存策略
- 面对大量数据时使用分页加载

## 问题排查

### GitHub API 403 错误

- 检查是否正确设置 Token
- 确认 Token 拥有 `public_repo` 权限
- 检查是否已超出 API 速率限制

### 页面未显示

- 简历页未出现：确认 `.env` 中是否已设置 `VITE_RESUME_FILE`
- 作品集页未出现：确认 `.env` 中是否已设置 `VITE_GITHUB_TOKEN`
- 导航为空：请至少配置一个页面相关的环境变量

### 构建错误

- 确认依赖均已安装：`yarn install`
- 检查 TypeScript 类型错误：`yarn lint`
- 如有需要，删除 node_modules 后重新安装

## 许可证

遵循 [MIT 许可证](https://github.com/frontio-ai/Mai/blob/main/LICENSE) 授权。

