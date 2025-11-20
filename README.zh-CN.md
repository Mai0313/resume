<center>

# 个人简历

[![React](https://img.shields.io/badge/-React_18-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/-TypeScript_5.6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![license](https://img.shields.io/badge/License-MIT-green.svg?labelColor=gray)](https://github.com/Mai0313/resume/tree/master?tab=License-1-ov-file)
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/Mai0313/resume/pulls)
[![contributors](https://img.shields.io/github/contributors/Mai0313/resume.svg)](https://github.com/Mai0313/resume/graphs/contributors)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FMai0313%2Fresume&env=VITE_WEBSITE_TITLE,VITE_GITHUB_TOKEN,VITE_RESUME_FILE,VITE_PIN_CODE,VITE_ROOT_PATH,VITE_OPENAI_BASE_URL,VITE_OPENAI_API_KEY,VITE_OPENAI_MODEL&project-name=resume-web&repository-name=resume-web&skippable-integrations=1)

</center>

这是一个使用 Vite 与 HeroUI 框架构建的个人网站，适合部署到 GitHub Pages。

## 功能特性

### 🎨 视觉效果

- **动态首页**：整合 Particles 粒子背景、Orb 动态球体和 SplitText 文字动画，打造引人入胜的视觉体验
- **现代化 UI**：采用 HeroUI 组件库与 Framer Motion、React Spring、GSAP 等动画库
- **响应式设计**：支持深色/浅色主题切换与全响应式布局，在各种设备上都能完美显示

### 📄 简历系统

- **弹性数据来源**：支持本地 YAML 文件、GitHub Gist 或任何可访问的 Raw URL
- **PIN 码保护**：可选的 PIN 码验证功能，保护隐私信息
- **模块化区块**：10 种简历区块组件（工作经验、教育背景、技能、项目、发表著作等）
- **PDF 下载**：提供简历 PDF 下载功能
- **JSON Resume 标准**：遵循 JSON Resume Schema 规范，数据格式标准化

### 🤖 AI 助手

- **OpenAI 集成**：支持 OpenAI 和 Azure OpenAI API
- **流式回复**：实时流式显示 AI 响应
- **推理预览**：使用具备推理能力的模型时，实时显示推理过程摘要
- **浮动界面**：不干扰浏览体验的浮动聊天窗口

### ⚙️ 智能配置

- **条件显示**：根据环境变量自动显示或隐藏页面
  - 简历页需设置 `VITE_RESUME_FILE`
  - AI 助手需设置 `VITE_OPENAI_*` 相关变量
- **自动导航更新**：导航栏动态更新，只显示已启用的页面
- **子路径支持**：支持部署到子路径（如 GitHub Pages）

## 技术栈

- [Vite 6.3.5](https://vitejs.dev/guide/) - 快速的前端构建工具
- [React 18](https://react.dev/) - UI 库
- [TypeScript 5.6.3](https://www.typescriptlang.org) - 类型安全的 JavaScript
- [React Router 7.6.2](https://reactrouter.com/) - 前端路由
- [HeroUI](https://heroui.com) - React UI 组件库
- [Tailwind CSS 3.4.16](https://tailwindcss.com) - CSS 框架
- [Framer Motion 12.15](https://www.framer.com/motion) - React 动画库
- [React Spring 10.0](https://react-spring.dev/) - 弹簧动画库
- [GSAP 3.13](https://gsap.com/) - 专业级动画库
- [OGL 1.0](https://oframe.github.io/ogl/) - WebGL 库
- [OpenAI API 5.3](https://platform.openai.com/docs/api-reference) - AI 聊天机器人整合
- [Azure OpenAI 2.0](https://learn.microsoft.com/azure/ai-services/openai/) - Azure OpenAI 服务整合
- [js-yaml 4.1](https://github.com/nodeca/js-yaml) - YAML 解析器
- [GitHub API](https://docs.github.com/en/rest) - 获取项目数据

## 环境配置

### 环境变量

创建一个 `.env` 文件并设置以下变量：

```bash
# 必填：网站标题
VITE_WEBSITE_TITLE=Mai

# 可选：简历文件 - 若未设置，简历页面会被隐藏
# 支持本地文件与 URL
# 本地文件示例：
VITE_RESUME_FILE=example.yaml
# GitHub Gist 示例：
# VITE_RESUME_FILE=https://gist.github.com/username/gist_id
# Raw URL 示例：
# VITE_RESUME_FILE=https://raw.githubusercontent.com/user/repo/main/resume.yaml

# 可选：简历 PIN 码保护
VITE_PIN_CODE=123456

# 可选：OpenAI 聊天机器人（启用站内 AI 助手）
# 需同时设置以下变量，聊天助手才会显示
VITE_OPENAI_BASE_URL=https://api.openai.com/v1
VITE_OPENAI_API_KEY=sk-xxxx
VITE_OPENAI_MODEL=gpt-5-mini
# 其他模型选项：gpt-3.5-turbo, gpt-4, gpt-4-turbo, gpt-5 等
```

可选：自定义部署根路径（适用于 GitHub Pages 子路径）。若部署于 `https://<user>.github.io/<repo>`，请在 `.env` 设置：

```bash
VITE_ROOT_PATH=/resume
```

**重要说明：**

- **智能页面显示**：页面仅在对应环境变量正确设置时才会出现在导航菜单与路由中
  - 简历页（`/resume`）需设置 `VITE_RESUME_FILE`
  - AI 助手需同时设置 `VITE_OPENAI_BASE_URL`、`VITE_OPENAI_API_KEY` 和 `VITE_OPENAI_MODEL`

- **OpenAI API 设置**：
  - 支持 OpenAI 官方 API 和 Azure OpenAI
  - `VITE_OPENAI_BASE_URL` 示例：
    - OpenAI：`https://api.openai.com/v1`
    - Azure：`https://your-resource.openai.azure.com/openai/deployments/your-deployment`
  - 推理模型（如 GPT-5）会自动显示推理过程

- **路径设置**：
  - 部署到根目录（如 `https://yourdomain.com`）：无需设置 `VITE_ROOT_PATH`
  - 部署到子路径（如 `https://username.github.io/resume`）：设置 `VITE_ROOT_PATH=/resume`

### 安装依赖包

建议使用 `yarn`：

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

- 交互式背景效果（Particles + Orb）
- 以 SplitText 动画显示网站标题（`VITE_WEBSITE_TITLE`）
- 快速链接到你的 GitHub 个人页
- 响应式设计与主题切换

### 简历页（`/resume`）

- 条件式显示：仅在设置 `VITE_RESUME_FILE` 后才会出现
- 支持 PIN 码验证保护（可选）
- 弹性的简历加载方式：
  - 本地 YAML 文件：`example.yaml`、`resume.yaml`（自 `public/` 目录加载）
  - GitHub Gist：Gist 链接会自动转为原始文件格式
  - Raw URL：任何可访问的 YAML 文件网址
- 以 YAML 驱动的简历数据管理
- 结构化显示个人信息、学历、工作经历等内容
- PDF 下载：提供按钮下载简历 PDF（使用 `public/example.pdf`）
- 响应式设计与动画效果
- 小技巧：若启用 PIN，可通过 `/resume?pin=你的PIN` 直接解锁；验证后网址会自动移除 PIN。

### AI 助手（浮动聊天）

- 当 `VITE_OPENAI_BASE_URL`、`VITE_OPENAI_API_KEY` 与 `VITE_OPENAI_MODEL` 已设置时显示
- 实时流式回复；若选用的模型支持推理，将在答案上方以小型、低调区块呈现推理摘要
- 可使用「清除对话」按钮重置会话

## 自定义配置

### 配置页面显示

网站会依据环境变量自动显示/隐藏页面：

- 简历页：仅在设置 `VITE_RESUME_FILE` 后显示
- 导航栏：动态更新，只显示可用的页面

### 编辑简历内容

你有多种方式设置简历：

#### 选项一：本地 YAML 文件

编辑 `public/example.yaml`，或在 `public/` 目录创建自己的 YAML 文件：

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

- 不需重新部署即可更新简历
- 简历版本控制
- 可选择公开或私密

#### 选项三：Raw URL

使用任何可访问的 YAML 文件网址：

```bash
# 在 .env 文件中
VITE_RESUME_FILE=https://raw.githubusercontent.com/user/repo/main/resume.yaml
```

### 简历 YAML 格式

简历采用 [JSON Resume Schema](https://jsonresume.org/schema/) 标准，支持以下区块：

- `basics`：基本信息（姓名、职称、联系方式、个人简介、头像等）
- `work`：工作经验
- `education`：教育背景
- `skills`：技能
- `projects`：项目经验
- `publications`：发表著作
- `certificates`：证书
- `awards`：奖项
- `volunteer`：志愿者经验
- `interests`：兴趣
- `references`：推荐人
- `languages`：语言能力（显示在 header 区块）

**特别说明**：

- 区块显示顺序由 YAML 文件中的 `sectionOrder` 字段决定
- `languages` 会显示在页面顶部的个人信息区块（header）中
- 未包含数据的区块不会显示
- 示例 YAML 文件位于 `public/example.yaml`，可作为起始模板

### 修改 PIN 码

在 `.env` 文件中调整 `VITE_PIN_CODE` 的值。

## 部署

### 部署到 GitHub Pages

#### 方式一：自动部署（推荐）

项目已配置 GitHub Actions 自动部署工作流程（`.github/workflows/deploy.yml`）：

1. 推送代码到 `main` 或 `master` 分支
2. GitHub Actions 会自动：
   - 执行构建（`yarn build`）
   - 部署到 GitHub Pages

无需手动执行任何命令！

**注意事项**：

- 确保在 GitHub 仓库设置中启用 GitHub Pages
- 设置 Pages 的部署来源为「GitHub Actions」
- GitHub Actions 会自动使用 `VITE_ROOT_PATH=/<仓库名称>` 进行构建

#### 方式二：手动部署

```bash
yarn build
yarn deploy
```

手动部署注意事项：

- 将 `.env` 中的 `VITE_ROOT_PATH` 设为你的仓库名称（例如 `/resume`）
- `package.json` 已设置 `homepage`，而 Vite 的 `base` 亦由 `VITE_ROOT_PATH` 控制
- `yarn deploy` 会使用 `gh-pages` 包将 `dist` 目录推送到 `gh-pages` 分支

### 部署到 Vercel

此项目已包含 `vercel.json`，可直接在 Vercel 上部署：

1. 在 Vercel 上导入你的 GitHub 仓库
2. 设置环境变量（参考 `.env` 示例）
3. Vercel 会自动检测 Vite 项目并完成部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FMai0313%2Fresume)

### 使用 Docker 部署

项目包含 Docker 支持，方便本地开发或服务器部署：

#### 使用 Docker Compose（推荐）

```bash
# 使用 Docker Compose 构建并启动
docker compose up -d

# 查看日志
docker compose logs -f

# 停止服务
docker compose down
```

Docker Compose 配置：

- **构建阶段**：使用多阶段构建优化镜像大小
- **运行模式**：使用 `yarn preview` 运行预览服务器
- **Port 映射**：容器内 Port 3000 映射到主机 Port 5173
- **环境变量**：自动加载 `.env` 文件
- **访问地址**：`http://localhost:5173`

#### 手动构建 Docker 镜像

```bash
# 构建镜像
docker build -f docker/Dockerfile -t resume:latest .

# 运行容器
docker run -d -p 5173:3000 --env-file .env resume:latest
```

**Docker 注意事项**：

- 确保在项目根目录存在 `.env` 文件
- Docker 镜像使用 Node.js 20 与 Python 3.10
- 构建会自动执行 `yarn install` 和 `yarn build`

## 项目结构

```
src/
├── components/                      # 可重用组件
│   ├── Particles/                   # 粒子背景特效
│   │   └── Particles.tsx
│   ├── Orb/                         # 动态背景球体（WebGL）
│   │   ├── Orb.tsx
│   │   └── Orb.css
│   ├── FuzzyText/                   # 404 页面文字模糊效果
│   │   └── FuzzyText.tsx
│   ├── SplitText/                   # 首页文字分割动画
│   │   └── SplitText.tsx
│   ├── ChatBot/                     # 浮动 AI 助手
│   │   ├── ChatBot.tsx
│   │   └── index.ts
│   ├── SpotlightCard/               # 聚光卡片悬停效果
│   │   ├── SpotlightCard.tsx
│   │   └── SpotlightCard.css
│   ├── ResumeSections/              # 简历区块组件
│   │   ├── AwardsSection.tsx        # 奖项区块
│   │   ├── CertificatesSection.tsx  # 证书区块
│   │   ├── EducationSection.tsx     # 教育背景区块
│   │   ├── InterestsSection.tsx     # 兴趣区块
│   │   ├── ProjectsSection.tsx      # 项目经验区块
│   │   ├── PublicationsSection.tsx  # 发表著作区块
│   │   ├── ReferencesSection.tsx    # 推荐人区块
│   │   ├── SkillsSection.tsx        # 技能区块
│   │   ├── VolunteerSection.tsx     # 志愿者经验区块
│   │   ├── WorkSection.tsx          # 工作经验区块
│   │   └── index.ts                 # 区块组件导出
│   ├── ResumeContent.tsx            # 简历内容组件
│   ├── navbar.tsx                   # 导航栏组件
│   ├── theme-switch.tsx             # 主题切换组件
│   ├── icons.tsx                    # 图标组件
│   └── primitives.ts                # 基础组件样式
├── pages/                           # 页面组件
│   ├── index.tsx                    # 首页
│   └── resume.tsx                   # 简历页
├── layouts/                         # 布局
│   └── default.tsx                  # 默认布局（含导航与主题）
├── utils/                           # 工具函数
│   ├── resumeLoader.ts              # YAML 简历加载器
│   ├── pathUtils.ts                 # 路径工具函数
│   ├── openai-client.ts             # OpenAI 流式客户端
│   └── env.ts                       # 环境变量管理与验证
├── config/                          # 配置文件
│   └── site.ts                      # 网站配置与导航配置
├── types/                           # TypeScript 类型定义
│   ├── index.ts                     # 通用类型（Resume、GitHub API 等）
│   └── ogl.d.ts                     # OGL WebGL 库类型声明
├── styles/                          # 全局样式
│   └── globals.css                  # 全局 CSS 样式
├── App.tsx                          # 应用程序路由入口
├── main.tsx                         # React 渲染入口
├── provider.tsx                     # Context Providers（主题等）
└── vite-env.d.ts                    # Vite 环境类型定义
```

## 开发指南

### 开发工具

项目使用以下开发工具确保代码质量：

- **ESLint**：代码风格检查与错误检测
- **Prettier**：自动格式化代码
- **TypeScript**：类型检查
- **Makefile**：提供简化的开发命令

#### Yarn/NPM 命令

```bash
# 开发模式
yarn dev

# 类型检查
yarn type-check

# 代码格式化
yarn format

# 代码检查（不自动修复）
yarn format:nofix

# 代码检查与修复
yarn lint

# Lint 检查（不自动修复）
yarn lint:nofix

# 完整检查（类型 + 格式化 + Lint）
yarn check

# 构建项目
yarn build

# 预览构建结果
yarn preview

# 部署到 GitHub Pages
yarn deploy
```

#### Makefile 命令

项目提供 Makefile 简化常用操作：

```bash
# 显示所有可用命令
make help

# 构建项目（默认目标）
make
# 或
make build

# 清理生成的文件与 Git 缓存
make clean

# 执行格式化与 Lint（等同于 yarn format + yarn lint）
make fmt

# 运行项目（需要先 build）
make run
```

### 持续集成 / 持续部署（CI/CD）

项目配置了多个 GitHub Actions 工作流程：

- **自动部署**（`deploy.yml`）：推送到 main/master 分支时，自动构建并部署到 GitHub Pages
- **代码扫描**（`code_scan.yml`）：使用 CodeQL 进行安全性分析
- **代码质量检查**（`code-quality-check.yml`）：自动执行 TypeScript、Prettier 与 ESLint 检查
- **密钥扫描**（`secret_scan.yml`）：防止敏感信息泄露
- **依赖项审查**（`dependency-review.yml`）：检查 Pull Request 中的依赖项变更
- **语义化 PR**（`semantic-pull-request.yml`）：确保 Pull Request 标题符合 Conventional Commits 规范
- **自动标签**（`auto_labeler.yml`）：根据变更内容自动添加标签
- **Release 草稿**（`release_drafter.yml`）：自动生成 Release Notes 草稿
- **Docker 镜像构建**（`build_image.yml`）：构建并推送 Docker 镜像

### 新增页面

如需新增页面到网站：

1. **创建页面组件**：在 `src/pages/` 目录新增页面组件（例如 `new-page.tsx`）
2. **新增路由**：在 `src/App.tsx` 中添加新的路由配置
3. **更新导航菜单**：在 `src/config/site.ts` 中更新 `siteConfig.navItems` 配置
4. **条件式显示（可选）**：
   - 如需根据环境变量显示/隐藏页面，在 `src/utils/env.ts` 添加环境变量检查函数
   - 在 `src/config/site.ts` 中使用该检查函数来决定是否显示导航项目
   - 在 `src/App.tsx` 中使用相同的检查来决定是否注册路由

**示例**：参考 Resume 页面（`/resume`）的实现方式

### 修改主题

HeroUI 的主题设置位于 `tailwind.config.js`，可依需求自定义颜色与样式。主题切换功能已整合在导航栏中，支持深色/浅色模式。

### 自定义简历区块

简历系统采用模块化设计，每个区块都是独立组件：

1. 在 `src/components/ResumeSections/` 新增或修改区块组件
2. 在 `src/components/ResumeContent.tsx` 中引入并使用新组件
3. 确保 YAML 数据结构与组件预期的格式相符

### API 限制

GitHub API 具有速率限制，建议：

- 使用个人访问令牌（PAT）以提高限制（每小时 5,000 次请求）
- 未认证请求限制为每小时 60 次
- 设计适当的缓存策略以减少 API 调用
- 面对大量数据时采用分页加载

### API 限制

### 页面显示问题

**简历页未出现在导航栏**

- 确认 `.env` 中是否已设置 `VITE_RESUME_FILE`
- 检查环境变量值是否正确（本地文件名称或完整 URL）
- 重新启动开发服务器

**AI 助手未显示**

- 确认已设置以下三个环境变量：
  - `VITE_OPENAI_BASE_URL`
  - `VITE_OPENAI_API_KEY`
  - `VITE_OPENAI_MODEL`
- 检查 API Key 是否有效
- 确认 Base URL 格式正确（应包含完整的 API endpoint）

**导航栏完全为空**

- 至少需要设置一个页面的环境变量（`VITE_RESUME_FILE`）
- 首页（`/`）永远可用，不需要特别设置

### 简历加载问题

**无法加载简历 YAML**

- 检查文件路径是否正确
- 如使用 URL，确认 URL 可直接访问（在浏览器中打开测试）
- GitHub Gist URL 会自动转换为 Raw 格式，无需手动处理
- 检查 YAML 格式是否正确（可使用在线 YAML 验证工具）

**PIN 码验证无法通过**

- 确认 `.env` 中的 `VITE_PIN_CODE` 值与输入相符
- 注意 PIN 码有大小写区分
- 可通过 URL 参数传递 PIN：`/resume?pin=你的PIN`

### 构建与开发问题

**构建失败**

- 确认所有依赖已正确安装：`yarn install`
- 检查 Node.js 版本（建议使用 18.x 或更高版本）
- 执行类型检查：`yarn type-check`
- 清除缓存并重新安装：
  ```bash
  rm -rf node_modules yarn.lock
  yarn install
  ```

**开发服务器无法启动**

- 检查 Port 5173 是否被占用
- 确认 `.env` 文件格式正确
- 检查是否有必要的环境变量（至少需要 `VITE_WEBSITE_TITLE`）

**TypeScript 错误**

- 执行 `yarn type-check` 查看详细错误
- 确认所有 `@types/*` 包已安装
- 检查 `tsconfig.json` 设置是否正确

### Docker 相关问题

**容器无法启动**

- 确认 `.env` 文件存在且格式正确
- 检查 Docker 和 Docker Compose 版本
- 查看容器日志：`docker compose logs -f`

**无法访问服务**

- 确认 Port 5173 未被其他服务占用
- 检查防火墙设置
- 在浏览器中尝试访问 `http://localhost:5173`

## 贡献指南

欢迎贡献！无论是报告问题、提出功能建议或提交 Pull Request，都十分感谢。

### 如何贡献

1. Fork 此项目
2. 创建你的功能分支：`git checkout -b feature/AmazingFeature`
3. 提交你的变更：`git commit -m 'Add some AmazingFeature'`
4. 推送到分支：`git push origin feature/AmazingFeature`
5. 打开 Pull Request

### 开发规范

- 遵循现有的代码风格（使用 ESLint 和 Prettier）
- 提交前执行 `yarn check` 确保代码质量
- 撰写清晰的提交消息
- 更新相关文档

### 报告问题

如果发现 Bug 或有功能建议，请[创建 Issue](https://github.com/Mai0313/resume/issues)。

## 特别感谢

- [HeroUI](https://heroui.com) - 提供优秀的 React UI 组件库
- [JSON Resume](https://jsonresume.org) - 简历数据标准
- 所有开源项目的贡献者

## 许可证

依据 [MIT 许可证](LICENSE) 授权。

---

**如果这个项目对你有帮助，请给个 ⭐️！**
