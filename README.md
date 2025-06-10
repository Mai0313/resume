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
- **PIN-Protected Resume**: Resume system based on YAML configuration, supports PIN code verification for privacy protection
- **GitHub Portfolio**: Automatically fetches and displays personal projects and contributions via the GitHub API
- **Responsive Design**: Supports dark/light theme switching and fully responsive layouts
- **Modern UI**: Built with the HeroUI component library and Framer Motion animations

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
# Resume PIN code protection
VITE_PIN_CODE=123456

# GitHub API Token (for Portfolio feature)
VITE_GITHUB_TOKEN=your_github_token_here
```

**Important**:

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

- PIN code verification protection
- YAML-driven resume data management
- Structured display of personal info, education, work experience, etc.
- Responsive design and animation effects

### Portfolio Page (`/portfolio`)

- Automatically fetches GitHub repositories and contributions
- Displays project details: language, stars, forks, topic tags
- Shows recent commit records
- Supports project demo links and GitHub links

## Custom Configuration

### Change GitHub Username

Edit in `src/pages/portfolio.tsx`:

```typescript
const userContributions = await getUserContributions("your_github_username");
```

### Edit Resume Content

Edit the `public/resume.yaml` file to update your resume content.

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
│   ├── PortfolioContent.tsx  # Portfolio content component
│   └── ResumeContent.tsx     # Resume content component
├── pages/              # Page components
│   ├── index.tsx       # Home page
│   ├── portfolio.tsx   # Portfolio page
│   └── resume.tsx      # Resume page
├── utils/              # Utility functions
│   ├── githubApi.ts    # GitHub API related functions
│   └── resumeLoader.ts # Resume YAML loader
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

### Build Errors

- Make sure all dependencies are installed: `yarn install`
- Check TypeScript type errors: `yarn lint`
- Clear node_modules and reinstall if needed

## License

Licensed under the [MIT license](https://github.com/frontio-ai/Mai/blob/main/LICENSE).
