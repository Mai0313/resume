<center>

# Personal Resume

[![React](https://img.shields.io/badge/-React_18-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/-TypeScript_5.6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![license](https://img.shields.io/badge/License-MIT-green.svg?labelColor=gray)](https://github.com/Mai0313/resume/tree/master?tab=License-1-ov-file)
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/Mai0313/resume/pulls)
[![contributors](https://img.shields.io/github/contributors/Mai0313/resume.svg)](https://github.com/Mai0313/resume/graphs/contributors)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FMai0313%2Fresume&env=VITE_WEBSITE_TITLE,VITE_GITHUB_TOKEN,VITE_RESUME_FILE,VITE_PIN_CODE,VITE_ROOT_PATH,VITE_OPENAI_BASE_URL,VITE_OPENAI_API_KEY,VITE_OPENAI_MODEL&project-name=resume-web&repository-name=resume-web&skippable-integrations=1)

</center>

This is a personal website built with Vite and the HeroUI framework, suitable for deployment on GitHub Pages.

## Features

- **Dynamic Home Page**: Uses custom components (Particles, Orb, SplitText) to create vivid visual effects
- **Smart Page Rendering**: Pages only appear when properly configured - Resume requires `VITE_RESUME_FILE`, Portfolio requires `VITE_GITHUB_TOKEN`
- **PIN-Protected Resume**: Resume system based on YAML configuration, supports PIN code verification for privacy protection
- **GitHub Portfolio**: Automatically fetches and displays personal projects and contributions via the GitHub API
- **Responsive Design**: Supports dark/light theme switching and fully responsive layouts
- **Modern UI**: Built with the HeroUI component library and Framer Motion animations
- **AI Assistant with Reasoning Preview**: When using reasoning-capable models (e.g., GPT-5), the assistant streams a subtle, muted reasoning summary above the answer so you can see its thought process without distraction.

## Tech Stack

- [Vite](https://vitejs.dev/guide/) - Fast frontend build tool
- [HeroUI](https://heroui.com) - React UI component library
- [Tailwind CSS](https://tailwindcss.com) - CSS framework
- [TypeScript](https://www.typescriptlang.org) - Type-safe JavaScript
- [Framer Motion](https://www.framer.com/motion) - React animation library
- [React Spring](https://react-spring.dev/) - Spring animation library
- [GitHub API](https://docs.github.com/en/rest) - Fetch project data
- [React Router](https://reactrouter.com/) - Client-side routing

## Environment Setup

### Environment Variables

Create a `.env` file and set the following variables:

```bash
# Required: Website title
VITE_WEBSITE_TITLE=Mai

# Optional: Resume file - when not set, Resume page will be hidden
# Supports both local files and URLs
# Local file example:
VITE_RESUME_FILE=example.yaml
# GitHub Gist example:
# VITE_RESUME_FILE=https://gist.github.com/username/gist_id
# Raw URL example:
# VITE_RESUME_FILE=https://raw.githubusercontent.com/user/repo/main/resume.yaml

# Optional: Resume PIN code protection
VITE_PIN_CODE=123456

# Optional: GitHub API Token - when not set, Portfolio page will be hidden
VITE_GITHUB_TOKEN=your_github_token_here

# Optional: OpenAI Chatbot (enables in-site AI assistant)
# These must be set together for the chat assistant to show up
VITE_OPENAI_BASE_URL=https://api.openai.com/v1
VITE_OPENAI_API_KEY=sk-xxxx
VITE_OPENAI_MODEL=gpt-5

# Optional: Custom root path for subdirectory deployments (e.g., GitHub Pages)
# When deploying under a subpath like https://<user>.github.io/<repo>, set:
# VITE_ROOT_PATH=/resume
```

**Important**:

- **Smart Page Display**: Pages only appear in navigation and routing when their environment variables are properly configured
  - Resume page (`/resume`) only appears when `VITE_RESUME_FILE` is set
  - Portfolio page (`/portfolio`) only appears when `VITE_GITHUB_TOKEN` is set
- Replace `your_github_token_here` with your GitHub Personal Access Token
- The GitHub Token requires `public_repo` permission to read public repositories
- Do not commit your real token to version control
- If deploying to a subpath (e.g., GitHub Pages), set `VITE_ROOT_PATH` to the subpath (e.g., `/resume`).

### Install Dependencies

It is recommended to use `yarn`:

```bash
yarn install
```

Or use `npm`:

```bash
npm install
```

### Run Development Server

```bash
yarn dev
```

Or

```bash
npm run dev
```

## Page Features

### Home Page (`/`)

- Interactive background effects (Particles + Orb)
- SplitText animation displays your website title (`VITE_WEBSITE_TITLE`)
- Quick link to your GitHub profile
- Responsive design and theme switching

### Resume Page (`/resume`)

- **Conditional Display**: Only appears when `VITE_RESUME_FILE` is configured
- PIN code verification protection (optional)
- **Flexible Resume Loading**: Supports multiple resume sources:
  - **Local YAML files**: `example.yaml`, `resume.yaml` (loaded from `public/` directory)
  - **GitHub Gist**: Direct Gist URLs automatically converted to raw format
  - **Raw URLs**: Any accessible YAML file URL
- YAML-driven resume data management
- Structured display of personal info, education, work experience, etc.
- **PDF Download**: Download button to save resume as PDF (uses `public/example.pdf`)
- Responsive design and animation effects
- Tip: If PIN is enabled, you can unlock via URL like `/resume?pin=123456`. The PIN is removed from the URL after verification.

### Portfolio Page (`/portfolio`)

- Appears only when `VITE_GITHUB_TOKEN` is configured
- Automatically fetches your repositories and contributions
- Displays: language, stars, forks, topics, last updated time
- Shows recent commit messages with links
- Supports demo link and GitHub link per repo

### AI Assistant (Floating Chat)

- Appears when `VITE_OPENAI_BASE_URL`, `VITE_OPENAI_API_KEY`, and `VITE_OPENAI_MODEL` are configured
- Streams answers; if the model supports reasoning (e.g., GPT-5), a muted reasoning summary appears above answers
- Includes a Clear Chat button and loading/stream indicators

## Custom Configuration

### Configure Pages Display

The website automatically shows/hides pages based on environment variable configuration:

- **Resume Page**: Only appears when `VITE_RESUME_FILE` is set
- **Portfolio Page**: Only appears when `VITE_GITHUB_TOKEN` is set
- **Navigation Menu**: Dynamically updates to show only available pages

### Change GitHub Username

No manual configuration needed! The GitHub username is automatically fetched using your `VITE_GITHUB_TOKEN`.

### Edit Resume Content

You have multiple options to set up your resume:

#### Option 1: Local YAML File

Edit the `public/example.yaml` file or create your own YAML file in the `public/` directory:

```bash
# In .env file
VITE_RESUME_FILE=my-resume.yaml
```

#### Option 2: GitHub Gist (Recommended)

Create a GitHub Gist with your resume YAML file and use the Gist URL:

```bash
# In .env file
VITE_RESUME_FILE=https://gist.github.com/your-username/your-gist-id
```

Benefits of using GitHub Gist:

- Easy to update without redeploying your website
- Version control for your resume
- Privacy control (private/public gists)

#### Option 3: Raw URL

Use any accessible YAML file URL:

```bash
# In .env file
VITE_RESUME_FILE=https://raw.githubusercontent.com/user/repo/main/resume.yaml
```

### Change PIN Code

Edit the value of `VITE_PIN_CODE` in the `.env` file.

## Deployment

### Deploy to GitHub Pages

```bash
yarn build
yarn deploy
```

Notes for GitHub Pages:

- Set `VITE_ROOT_PATH` to your repository name (e.g., `/resume`).
- `package.json` has `homepage` configured; the `vite` base is also driven by `VITE_ROOT_PATH`.

### Deploy to Vercel

The project is pre-configured with `vercel.json` and can be deployed directly to Vercel.

## Project Structure

```
src/
├── components/                  # Reusable components
│   ├── Particles/Particles.tsx  # Particle background
│   ├── Orb/Orb.tsx              # Dynamic background orb
│   ├── FuzzyText/FuzzyText.tsx  # 404 text effect
│   ├── SplitText/SplitText.tsx  # Split text animation
│   ├── ChatBot/ChatBot.tsx      # Floating AI assistant
│   ├── SpotlightCard/...        # Spotlight hover card
│   ├── PortfolioContent.tsx     # Portfolio content component
│   └── ResumeContent.tsx        # Resume content component
├── pages/              # Page components
│   ├── index.tsx       # Home page
│   ├── portfolio.tsx   # Portfolio page
│   └── resume.tsx      # Resume page
├── utils/              # Utility functions
│   ├── githubApi.ts    # GitHub API related functions
│   ├── resumeLoader.ts # Resume YAML loader
│   ├── pathUtils.ts    # Root path helpers (VITE_ROOT_PATH)
│   └── openai-client.ts# OpenAI client (streaming)
└── types/              # TypeScript type definitions
    └── index.ts        # Common type definitions
```

## Development Guide

### Add a New Page

1. Create a new component in `src/pages/`
2. Add a route in `src/App.tsx`
3. Add a navigation link in `src/components/navbar.tsx`

### Modify Theme

HeroUI theme configuration is in `tailwind.config.js`, where you can customize colors and styles as needed.

### API Limitations

GitHub API has rate limits. Recommendations:

- Use a Personal Access Token for higher limits
- Implement proper caching
- Consider paginated loading for large data sets

## Troubleshooting

### GitHub API 403 Error

- Check if the token is set correctly
- Ensure the token has `public_repo` permission
- Check if you have exceeded the API rate limit

### Pages Not Showing

- **Resume page missing**: Check if `VITE_RESUME_FILE` is set in your `.env` file
- **Portfolio page missing**: Check if `VITE_GITHUB_TOKEN` is set in your `.env` file
- **Navigation empty**: Make sure at least one page environment variable is configured

### Build Errors

- Make sure all dependencies are installed: `yarn install`
- Check TypeScript type errors: `yarn type-check`
- Clear node_modules and reinstall if needed

## License

Licensed under the [MIT license](LICENSE).
