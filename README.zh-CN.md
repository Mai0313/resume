<center>

# 个人简历网站

[![React](https://img.shields.io/badge/-React_19.1-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/-TypeScript_5.8-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![license](https://img.shields.io/badge/License-MIT-green.svg?labelColor=gray)](https://github.com/Mai0313/resume/tree/master?tab=License-1-ov-file)
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/Mai0313/resume/pulls)
[![contributors](https://img.shields.io/github/contributors/Mai0313/resume.svg)](https://github.com/Mai0313/resume/graphs/contributors)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FMai0313%2Fresume&env=VITE_WEBSITE_TITLE,VITE_GITHUB_TOKEN,VITE_RESUME_FILE,VITE_PIN_CODE,VITE_ROOT_PATH&project-name=resume-web&repository-name=resume-web&skippable-integrations=1)

</center>

这是一个使用 Vite 和 HeroUI 框架构建的个人网站，适合部署到 GitHub Pages。

## 功能特色

- **动态首页**：使用 @react-spring/web 和自定义组件（Orb、SplitText、GradientText）创建生动的视觉效果
- **智能页面渲染**：页面仅在正确配置时显示 - 简历需要 `VITE_RESUME_FILE`，作品集需要 `VITE_GITHUB_TOKEN`
- **PIN 保护简历**：基于 YAML 配置的简历系统，支持 PIN 码验证以保护隐私
- **PDF 简历下载**：一键生成并下载专业 PDF 简历，具有清洁的排版和结构化布局
- **GitHub 作品集**：通过 GitHub API 自动获取并显示个人项目和贡献
- **响应式设计**：支持深色/浅色主题切换和完全响应式布局
- **现代化 UI**：使用 HeroUI 组件库和 Framer Motion 动画构建
- **AI 助手**：当使用推理能力模型（如 GPT-5）时，助手会在答案上方显示微妙的推理摘要，让您看到其思考过程

## 技术栈

- [Vite](https://vitejs.dev/guide/) - 快速前端构建工具
- [HeroUI](https://heroui.com) - React UI 组件库
- [Tailwind CSS](https://tailwindcss.com) - CSS 框架
- [TypeScript](https://www.typescriptlang.org) - 类型安全的 JavaScript
- [Framer Motion](https://www.framer.com/motion) - React 动画库
- [React Spring](https://react-spring.dev/) - Spring 动画库
- [GitHub API](https://docs.github.com/en/rest) - 获取项目数据
- [jsPDF](https://github.com/parallax/jsPDF) - PDF 生成库

## 环境设置

### 环境变量

创建 `.env` 文件并设置以下变量：

```bash
# 必需：网站标题
VITE_WEBSITE_TITLE=Mai

# 可选：简历文件 - 未设置时，简历页面将被隐藏
# 支持本地文件和 URL
# 本地文件示例：
VITE_RESUME_FILE=example.yaml
# GitHub Gist 示例：
# VITE_RESUME_FILE=https://gist.github.com/username/gist_id
# 原始 URL 示例：
# VITE_RESUME_FILE=https://raw.githubusercontent.com/user/repo/main/resume.yaml

# 可选：简历 PIN 码保护
VITE_PIN_CODE=123456

# 可选：GitHub API Token - 未设置时，作品集页面将被隐藏
VITE_GITHUB_TOKEN=your_github_token_here

# 可选：OpenAI 聊天机器人（启用网站内 AI 助手）
# 这些必须同时设置才能显示聊天助手
VITE_OPENAI_BASE_URL=https://api.openai.com/v1
VITE_OPENAI_API_KEY=sk-xxxx
VITE_OPENAI_MODEL=gpt-5
```

**重要说明**：

- **智能页面显示**：页面仅在正确配置环境变量时出现在导航和路由中
  - 简历页面 (`/resume`) 仅在设置 `VITE_RESUME_FILE` 时出现
  - 作品集页面 (`/portfolio`) 仅在设置 `VITE_GITHUB_TOKEN` 时出现
- 将 `your_github_token_here` 替换为您的 GitHub 个人访问令牌
- GitHub Token 需要 `public_repo` 权限来读取公共仓库
- 不要将真实令牌提交到版本控制

### 安装依赖

建议使用 `yarn`：

```bash
yarn install
```

或使用 `npm`：

```bash
npm install
```

### 运行开发服务器

```bash
yarn dev
```

或

```bash
npm run dev
```

## 页面功能

### 首页 (`/`)

- 动态 Orb 背景效果
- Split Text 动画显示 GitHub 用户名
- Gradient Text 显示联系信息
- 响应式设计和主题切换

### 简历页面 (`/resume`)

- **条件显示**：仅在配置 `VITE_RESUME_FILE` 时出现
- PIN 码验证保护（可选）
- **PDF 下载**：一键生成具有清洁格式和结构化布局的专业 PDF 简历
- **灵活的简历加载**：支持多种简历来源：
  - **本地 YAML 文件**：`example.yaml`、`resume.yaml`（从 `public/` 目录加载）
  - **GitHub Gist**：直接 Gist URL 自动转换为原始格式
  - **原始 URL**：任何可访问的 YAML 文件 URL
- YAML 驱动的简历数据管理
- 结构化显示个人信息、教育、工作经验等
- 响应式设计和动画效果

### 作品集页面 (`/portfolio`)

- **条件显示**：仅在配置 `VITE_GITHUB_TOKEN` 时出现
- 自动获取 GitHub 仓库和贡献
- 显示项目详细信息：语言、星星、分支、主题标签
- 显示最近的提交记录
- 支持项目演示链接和 GitHub 链接

### AI 助手（浮动聊天）

- 在配置 `VITE_OPENAI_BASE_URL`、`VITE_OPENAI_API_KEY` 和 `VITE_OPENAI_MODEL` 时出现
- 实时流答案。如果选择的模型支持推理，会在助手答案上方显示小的静音块显示推理摘要
- 您可以使用"清除聊天"按钮清除对话

## 自定义配置

### 配置页面显示

网站会根据环境变量配置自动显示/隐藏页面：

- **简历页面**：仅在设置 `VITE_RESUME_FILE` 时出现
- **作品集页面**：仅在设置 `VITE_GITHUB_TOKEN` 时出现
- **导航菜单**：动态更新以仅显示可用页面

### 更改 GitHub 用户名

无需手动配置！GitHub 用户名会使用您的 `VITE_GITHUB_TOKEN` 自动获取。

### 编辑简历内容

您有多种选择来设置简历：

#### 选项 1：本地 YAML 文件

编辑 `public/example.yaml` 文件或在 `public/` 目录中创建您自己的 YAML 文件：

```bash
# 在 .env 文件中
VITE_RESUME_FILE=my-resume.yaml
```

#### 选项 2：GitHub Gist（推荐）

使用简历 YAML 文件创建 GitHub Gist 并使用 Gist URL：

```bash
# 在 .env 文件中
VITE_RESUME_FILE=https://gist.github.com/your-username/your-gist-id
```

使用 GitHub Gist 的好处：

- 无需重新部署网站即可轻松更新
- 简历的版本控制
- 隐私控制（私人/公开 gists）

#### 选项 3：原始 URL

使用任何可访问的 YAML 文件 URL：

```bash
# 在 .env 文件中
VITE_RESUME_FILE=https://raw.githubusercontent.com/user/repo/main/resume.yaml
```

### 更改 PIN 码

编辑 `.env` 文件中的 `VITE_PIN_CODE` 值。

## 部署

### 部署到 GitHub Pages

```bash
yarn build
yarn deploy
```

### 部署到 Vercel

项目已预配置 `vercel.json`，可直接部署到 Vercel。

## 项目结构

```
src/
├── components/          # 可重用组件
│   ├── FuzzyText.tsx   # 404 文字效果
│   ├── Orb.tsx         # 动态背景球体
│   ├── SplitText.tsx   # 分割文字动画
│   ├── PortfolioContent.tsx  # 作品集内容组件
│   └── ResumeContent.tsx     # 简历内容组件
├── pages/              # 页面组件
│   ├── index.tsx       # 首页
│   ├── portfolio.tsx   # 作品集页面
│   └── resume.tsx      # 简历页面
├── utils/              # 工具函数
│   ├── githubApi.ts    # GitHub API 相关函数
│   ├── resumeLoader.ts # 简历 YAML 加载器
│   └── pdfGenerator.ts # PDF 简历生成器
└── types/              # TypeScript 类型定义
    └── index.ts        # 通用类型定义
```

## 开发指南

### 添加新页面

1. 在 `src/pages/` 中创建新组件
2. 在 `src/App.tsx` 中添加路由
3. 在 `src/components/navbar.tsx` 中添加导航链接

### 修改主题

HeroUI 主题配置在 `tailwind.config.js` 中，您可以根据需要自定义颜色和样式。

### API 限制

GitHub API 有速率限制。建议：

- 使用个人访问令牌获得更高限制
- 实现适当的缓存
- 考虑对大型数据集进行分页加载

## 疑难排解

### GitHub API 403 错误

- 检查令牌是否正确设置
- 确保令牌具有 `public_repo` 权限
- 检查是否超过了 API 速率限制

### 页面未显示

- **简历页面缺失**：检查 `.env` 文件中是否设置了 `VITE_RESUME_FILE`
- **作品集页面缺失**：检查 `.env` 文件中是否设置了 `VITE_GITHUB_TOKEN`
- **导航为空**：确保至少配置了一个页面环境变量

### 构建错误

- 确保安装所有依赖：`yarn install`
- 检查 TypeScript 类型错误：`yarn lint`
- 如需要，清除 node_modules 并重新安装

## 许可证

根据 [MIT 许可证](https://github.com/frontio-ai/Mai/blob/main/LICENSE) 许可。