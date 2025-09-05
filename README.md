<center>

# Personal Resume

[![React](https://img.shields.io/badge/-React_19.1-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/-TypeScript_5.8-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![license](https://img.shields.io/badge/License-MIT-green.svg?labelColor=gray)](https://github.com/Mai0313/resume/tree/master?tab=License-1-ov-file)
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/Mai0313/resume/pulls)
[![contributors](https://img.shields.io/github/contributors/Mai0313/resume.svg)](https://github.com/Mai0313/resume/graphs/contributors)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FMai0313%2Fresume&env=VITE_WEBSITE_TITLE,VITE_GITHUB_TOKEN,VITE_RESUME_FILE,VITE_PIN_CODE,VITE_ROOT_PATH&project-name=resume-web&repository-name=resume-web&skippable-integrations=1)

</center>

This is a personal website built with Vite and the HeroUI framework, suitable for deployment on GitHub Pages.

## Features

- **Dynamic Home Page**: Uses @react-spring/web and custom components (Orb, SplitText, GradientText) to create vivid visual effects
- **Smart Page Rendering**: Pages only appear when properly configured - Resume requires `VITE_RESUME_FILE`, Portfolio requires `VITE_GITHUB_TOKEN`
- **PIN-Protected Resume**: Resume system based on YAML configuration, supports PIN code verification for privacy protection
- **GitHub Portfolio**: Automatically fetches and displays personal projects and contributions via the GitHub API
- **Responsive Design**: Supports dark/light theme switching and fully responsive layouts
- **Modern UI**: Built with the HeroUI component library and Framer Motion animations
 - **Download Resume PDF**: One-click to export a clean PDF generated from your YAML resume

## Tech Stack

- [Vite](https://vitejs.dev/guide/) - Fast frontend build tool
- [HeroUI](https://heroui.com) - React UI component library
- [Tailwind CSS](https://tailwindcss.com) - CSS framework
- [TypeScript](https://www.typescriptlang.org) - Type-safe JavaScript
- [Framer Motion](https://www.framer.com/motion) - React animation library
- [React Spring](https://react-spring.dev/) - Spring animation library
- [GitHub API](https://docs.github.com/en/rest) - Fetch project data

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
```

**Important**:

- **Smart Page Display**: Pages only appear in navigation and routing when their environment variables are properly configured
  - Resume page (`/resume`) only appears when `VITE_RESUME_FILE` is set
  - Portfolio page (`/portfolio`) only appears when `VITE_GITHUB_TOKEN` is set
- Replace `your_github_token_here` with your GitHub Personal Access Token
- The GitHub Token requires `public_repo` permission to read public repositories
- Do not commit your real token to version control

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

- Dynamic Orb background effect
- Split Text animation displays GitHub username
- Gradient Text shows contact information
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
- Responsive design and animation effects
 - Download as PDF directly on the page

#### Download Resume as PDF

- After the resume loads, click the "Download PDF" button at the top-right of the page.
- The PDF is generated from your YAML (`ResumeData`) using `@react-pdf/renderer`, so it doesn't rely on the on-screen layout.
- If you host your YAML on GitHub Gist or a raw URL, the latest content is used for the PDF.

### Portfolio Page (`/portfolio`)

- **Conditional Display**: Only appears when `VITE_GITHUB_TOKEN` is configured
- Automatically fetches GitHub repositories and contributions
- Displays project details: language, stars, forks, topic tags
- Shows recent commit records
- Supports project demo links and GitHub links

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

### Deploy to Vercel

The project is pre-configured with `vercel.json` and can be deployed directly to Vercel.

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── FuzzyText.tsx   # 404 text effect
│   ├── Orb.tsx         # Dynamic background orb
│   ├── SplitText.tsx   # Split text animation
│   ├── DownloadResumePdfButton.tsx  # PDF download button
│   ├── PortfolioContent.tsx  # Portfolio content component
│   └── ResumeContent.tsx     # Resume content component
├── pages/              # Page components
│   ├── index.tsx       # Home page
│   ├── portfolio.tsx   # Portfolio page
│   └── resume.tsx      # Resume page
├── utils/              # Utility functions
│   ├── githubApi.ts    # GitHub API related functions
│   ├── resumeLoader.ts # Resume YAML loader
│   └── resumePdf.tsx   # Resume PDF generator (React PDF)
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
- Check TypeScript type errors: `yarn lint`
- Clear node_modules and reinstall if needed

## License

Licensed under the [MIT license](https://github.com/frontio-ai/Mai/blob/main/LICENSE).
