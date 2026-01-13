<center>

# Personal Resume

[![React](https://img.shields.io/badge/-React_18-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/-TypeScript_5.6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![license](https://img.shields.io/badge/License-MIT-green.svg?labelColor=gray)](https://github.com/Mai0313/resume/tree/master?tab=License-1-ov-file)
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/Mai0313/resume/pulls)
[![contributors](https://img.shields.io/github/contributors/Mai0313/resume.svg)](https://github.com/Mai0313/resume/graphs/contributors)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FMai0313%2Fresume&env=VITE_WEBSITE_TITLE,VITE_GITHUB_TOKEN,VITE_RESUME_FILE,VITE_PIN_CODE,VITE_ROOT_PATH&project-name=resume-web&repository-name=resume-web&skippable-integrations=1)

</center>

This is a personal website built with Vite and the HeroUI framework, suitable for deployment on GitHub Pages.

## Features

### 🎨 Visual Effects

- **Dynamic Home Page**: Integrates Particles particle background, Orb dynamic sphere, and SplitText text animation to create an engaging visual experience
- **Modern UI**: Utilizes HeroUI component library with animation libraries including Framer Motion, React Spring, and GSAP
- **Responsive Design**: Supports dark/light theme switching and fully responsive layouts, displaying perfectly on all devices

### 📄 Resume System

- **Flexible Data Sources**: Supports local YAML files, GitHub Gist, or any accessible Raw URL
- **PIN Code Protection**: Optional PIN code verification feature to protect private information
- **Modular Sections**: 10 types of resume section components (work experience, education, skills, projects, publications, etc.)
- **PDF Download**: Provides resume PDF download functionality
- **JSON Resume Standard**: Follows JSON Resume Schema specification for standardized data format

### ⚙️ Smart Configuration

- **Conditional Display**: Pages automatically show or hide based on environment variables
  - Resume page requires `VITE_RESUME_FILE`
- **Automatic Navigation Updates**: Navigation bar dynamically updates to show only enabled pages
- **Subpath Support**: Supports deployment to subpaths (e.g., GitHub Pages)

## Tech Stack

- [Vite 6.3.5](https://vitejs.dev/guide/) - Fast frontend build tool
- [React 18](https://react.dev/) - UI library
- [TypeScript 5.6.3](https://www.typescriptlang.org) - Type-safe JavaScript
- [React Router 7.6.2](https://reactrouter.com/) - Frontend routing
- [HeroUI](https://heroui.com) - React UI component library
- [Tailwind CSS 3.4.16](https://tailwindcss.com) - CSS framework
- [Framer Motion 12.15](https://www.framer.com/motion) - React animation library
- [React Spring 10.0](https://react-spring.dev/) - Spring animation library
- [GSAP 3.13](https://gsap.com/) - Professional-grade animation library
- [OGL 1.0](https://oframe.github.io/ogl/) - WebGL library
- [js-yaml 4.1](https://github.com/nodeca/js-yaml) - YAML parser
- [GitHub API](https://docs.github.com/en/rest) - Fetch project data

## Environment Setup

### Environment Variables

Create a `.env` file and configure the following variables:

```bash
# Required: Website title
VITE_WEBSITE_TITLE=Mai

# Optional: Resume file - if not set, resume page will be hidden
# Supports local files and URLs
# Local file example:
VITE_RESUME_FILE=example.yaml
# GitHub Gist example:
# VITE_RESUME_FILE=https://gist.github.com/username/gist_id
# Raw URL example:
# VITE_RESUME_FILE=https://raw.githubusercontent.com/user/repo/main/resume.yaml

# Optional: Resume PIN code protection
VITE_PIN_CODE=123456
```

Optional: Custom deployment root path (for GitHub Pages subpaths). If deploying to `https://<user>.github.io/<repo>`, set in `.env`:

```bash
VITE_ROOT_PATH=/resume
```

**Important Notes:**

- **Smart Page Display**: Pages only appear in navigation menu and routing when corresponding environment variables are properly configured
  - Resume page (`/resume`) requires `VITE_RESUME_FILE`

- **Path Configuration**:
  - Deploying to root directory (e.g., `https://yourdomain.com`): No need to set `VITE_ROOT_PATH`
  - Deploying to subdirectory (e.g., `https://username.github.io/resume`): Set `VITE_ROOT_PATH=/resume`

### Install Dependencies

Using `yarn` is recommended:

```bash
yarn install
```

Or use `npm`:

```bash
npm install
```

### Start Development Server

```bash
yarn dev
```

Or:

```bash
npm run dev
```

## Page Features

### Home Page (`/`)

- Interactive background effects (Particles + Orb)
- Website title displayed with SplitText animation (`VITE_WEBSITE_TITLE`)
- Quick link to your GitHub profile
- Responsive design with theme switching

### Resume Page (`/resume`)

- Conditional display: Only appears when `VITE_RESUME_FILE` is set
- Supports PIN code verification protection (optional)
- Flexible resume loading methods:
  - Local YAML files: `example.yaml`, `resume.yaml` (loaded from `public/` directory)
  - GitHub Gist: Gist URLs automatically converted to raw format
  - Raw URL: Any accessible YAML file URL
- YAML-driven resume data management
- Structured display of personal information, education, work experience, etc.
- PDF Download: Provides button to download resume PDF (uses `public/example.pdf`)
- Responsive design with animation effects
- Tip: If PIN is enabled, you can unlock directly via `/resume?pin=your_PIN`; the PIN will be automatically removed from the URL after verification.

## Custom Configuration

### Configure Page Display

The website automatically shows/hides pages based on environment variables:

- Resume page: Only appears when `VITE_RESUME_FILE` is set
- Navigation bar: Dynamically updates to show only available pages

### Edit Resume Content

You have multiple options to set up your resume:

#### Option 1: Local YAML File

Edit `public/example.yaml` or create your own YAML file in the `public/` directory:

```bash
# In .env file
VITE_RESUME_FILE=my-resume.yaml
```

#### Option 2: GitHub Gist (Recommended)

Create a GitHub Gist containing your resume YAML and use the Gist URL:

```bash
# In .env file
VITE_RESUME_FILE=https://gist.github.com/your-username/your-gist-id
```

Benefits of using GitHub Gist:

- Update resume without redeploying
- Resume version control
- Option to make public or private

#### Option 3: Raw URL

Use any accessible YAML file URL:

```bash
# In .env file
VITE_RESUME_FILE=https://raw.githubusercontent.com/user/repo/main/resume.yaml
```

### Resume YAML Format

The resume follows the [JSON Resume Schema](https://jsonresume.org/schema/) standard and supports the following sections:

- `basics`: Basic information (name, job title, contact info, summary, profile photo, etc.)
- `work`: Work experience
- `education`: Educational background
- `skills`: Skills
- `projects`: Project experience
- `publications`: Publications
- `certificates`: Certifications
- `awards`: Awards
- `volunteer`: Volunteer experience
- `interests`: Interests
- `references`: References
- `languages`: Language proficiency (displayed in header section)

**Special Notes**:

- Section display order is determined by the `sectionOrder` field in the YAML file
- `languages` is displayed in the personal information block at the top of the page (header)
- Sections without data will not be displayed
- Example YAML file located at `public/example.yaml` can be used as a starting template

### Change PIN Code

Adjust the value of `VITE_PIN_CODE` in the `.env` file.

## Deployment

### Deploy to GitHub Pages

#### Method 1: Automatic Deployment (Recommended)

The project is configured with GitHub Actions automatic deployment workflow (`.github/workflows/deploy.yml`):

1. Push code to `main` or `master` branch
2. GitHub Actions will automatically:
   - Execute build (`yarn build`)
   - Deploy to GitHub Pages

No manual commands needed!

**Notes**:

- Ensure GitHub Pages is enabled in repository settings
- Set Pages deployment source to "GitHub Actions"
- GitHub Actions automatically uses `VITE_ROOT_PATH=/<repository_name>` for building

#### Method 2: Manual Deployment

```bash
yarn build
yarn deploy
```

Manual deployment notes:

- Set `VITE_ROOT_PATH` in `.env` to your repository name (e.g., `/resume`)
- `package.json` has `homepage` configured, and Vite's `base` is controlled by `VITE_ROOT_PATH`
- `yarn deploy` uses the `gh-pages` package to push the `dist` directory to the `gh-pages` branch

### Deploy to Vercel

This project includes `vercel.json` and can be deployed directly on Vercel:

1. Import your GitHub repository on Vercel
2. Configure environment variables (refer to `.env` example)
3. Vercel will automatically detect the Vite project and complete deployment

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FMai0313%2Fresume)

### Deploy Using Docker

The project includes Docker support for convenient local development or server deployment:

#### Using Docker Compose (Recommended)

```bash
# Build and start using Docker Compose
docker compose up -d

# View logs
docker compose logs -f

# Stop service
docker compose down
```

Docker Compose configuration:

- **Build Stage**: Uses multi-stage build to optimize image size
- **Runtime Mode**: Runs preview server using `yarn preview`
- **Port Mapping**: Container port 3000 mapped to host port 5173
- **Environment Variables**: Automatically loads `.env` file
- **Access URL**: `http://localhost:5173`

#### Manual Docker Image Build

```bash
# Build image
docker build -f docker/Dockerfile -t resume:latest .

# Run container
docker run -d -p 5173:3000 --env-file .env resume:latest
```

**Docker Notes**:

- Ensure `.env` file exists in project root directory
- Docker image uses Node.js 20 and Python 3.10
- Build automatically executes `yarn install` and `yarn build`

## Project Structure

```
src/
├── components/                      # Reusable components
│   ├── Particles/                   # Particle background effects
│   │   └── Particles.tsx
│   ├── Orb/                         # Dynamic background orb (WebGL)
│   │   ├── Orb.tsx
│   │   └── Orb.css
│   ├── FuzzyText/                   # 404 page text blur effect
│   │   └── FuzzyText.tsx
│   ├── SplitText/                   # Home page text split animation
│   │   └── SplitText.tsx
│   ├── SpotlightCard/               # Spotlight card hover effect
│   │   ├── SpotlightCard.tsx
│   │   └── SpotlightCard.css
│   ├── ResumeSections/              # Resume section components
│   │   ├── AwardsSection.tsx        # Awards section
│   │   ├── CertificatesSection.tsx  # Certifications section
│   │   ├── EducationSection.tsx     # Education section
│   │   ├── InterestsSection.tsx     # Interests section
│   │   ├── ProjectsSection.tsx      # Projects section
│   │   ├── PublicationsSection.tsx  # Publications section
│   │   ├── ReferencesSection.tsx    # References section
│   │   ├── SkillsSection.tsx        # Skills section
│   │   ├── VolunteerSection.tsx     # Volunteer experience section
│   │   ├── WorkSection.tsx          # Work experience section
│   │   └── index.ts                 # Section components export
│   ├── ResumeContent.tsx            # Resume content component
│   ├── navbar.tsx                   # Navigation bar component
│   ├── theme-switch.tsx             # Theme switch component
│   ├── icons.tsx                    # Icon components
│   └── primitives.ts                # Base component styles
├── pages/                           # Page components
│   ├── index.tsx                    # Home page
│   └── resume.tsx                   # Resume page
├── layouts/                         # Layout templates
│   └── default.tsx                  # Default layout (with navigation and theme)
├── utils/                           # Utility functions
│   ├── resumeLoader.ts              # YAML resume loader
│   ├── pathUtils.ts                 # Path utility functions
│   └── env.ts                       # Environment variable management and validation
├── config/                          # Configuration files
│   └── site.ts                      # Site configuration and navigation setup
├── types/                           # TypeScript type definitions
│   ├── index.ts                     # Common types (Resume, GitHub API, etc.)
│   └── ogl.d.ts                     # OGL WebGL library type declarations
├── styles/                          # Global styles
│   └── globals.css                  # Global CSS styles
├── App.tsx                          # Application routing entry point
├── main.tsx                         # React render entry point
├── provider.tsx                     # Context Providers (theme, etc.)
└── vite-env.d.ts                    # Vite environment type definitions
```

## Development Guide

### Development Tools

The project uses the following development tools to ensure code quality:

- **ESLint**: Code style checking and error detection
- **Prettier**: Automatic code formatting
- **TypeScript**: Type checking
- **Makefile**: Provides simplified development commands

#### Yarn/NPM Commands

```bash
# Development mode
yarn dev

# Type checking
yarn type-check

# Code formatting
yarn format

# Code checking (no auto-fix)
yarn format:nofix

# Code checking and fixing
yarn lint

# Lint checking (no auto-fix)
yarn lint:nofix

# Complete check (type + format + lint)
yarn check

# Build project
yarn build

# Preview build results
yarn preview

# Deploy to GitHub Pages
yarn deploy
```

#### Makefile Commands

The project provides a Makefile to simplify common operations:

```bash
# Show all available commands
make help

# Build project (default target)
make
# Or
make build

# Clean generated files and Git cache
make clean

# Run format and lint (equivalent to yarn format + yarn lint)
make fmt

# Run project (requires build first)
make run
```

### Continuous Integration / Continuous Deployment (CI/CD)

The project is configured with multiple GitHub Actions workflows:

- **Automatic Deployment** (`deploy.yml`): Automatically builds and deploys to GitHub Pages when pushing to main/master branch
- **Code Scanning** (`code_scan.yml`): Security analysis using CodeQL
- **Code Quality Check** (`code-quality-check.yml`): Automatically runs TypeScript, Prettier, and ESLint checks
- **Secret Scanning** (`secret_scan.yml`): Prevents sensitive information leaks
- **Dependency Review** (`dependency-review.yml`): Checks dependency changes in Pull Requests
- **Semantic PR** (`semantic-pull-request.yml`): Ensures Pull Request titles follow Conventional Commits specification
- **Auto Labeler** (`auto_labeler.yml`): Automatically adds labels based on changes
- **Release Drafter** (`release_drafter.yml`): Automatically generates Release Notes drafts
- **Docker Image Build** (`build_image.yml`): Builds and pushes Docker images

### Adding a New Page

To add a page to the website:

1. **Create Page Component**: Add page component in `src/pages/` directory (e.g., `new-page.tsx`)
2. **Add Route**: Add new route configuration in `src/App.tsx`
3. **Update Navigation Menu**: Update `siteConfig.navItems` configuration in `src/config/site.ts`
4. **Conditional Display (Optional)**:
   - To show/hide page based on environment variables, add environment variable check function in `src/utils/env.ts`
   - Use that check function in `src/config/site.ts` to determine whether to show navigation item
   - Use the same check in `src/App.tsx` to determine whether to register route

**Example**: Refer to the implementation of Resume page (`/resume`)

### Modify Theme

HeroUI theme configuration is located in `tailwind.config.js`, which can be customized for colors and styles as needed. Theme switching functionality is integrated in the navigation bar, supporting dark/light mode.

### Customize Resume Sections

The resume system uses a modular design where each section is an independent component:

1. Add or modify section components in `src/components/ResumeSections/`
2. Import and use new components in `src/components/ResumeContent.tsx`
3. Ensure YAML data structure matches the format expected by components

### API Limitations

GitHub API has rate limits, recommendations:

- Use Personal Access Token (PAT) to increase limits (5,000 requests per hour)
- Unauthenticated requests are limited to 60 per hour
- Design appropriate caching strategies to reduce API calls
- Use paginated loading for large amounts of data

### Page Display Issues

**Resume Page Not Appearing in Navigation**

- Verify `VITE_RESUME_FILE` is set in `.env`
- Check environment variable value is correct (local filename or full URL)
- Restart development server

**Navigation Bar Completely Empty**

- At least one page's environment variable must be set (`VITE_RESUME_FILE`)
- Home page (`/`) is always available, no configuration needed

### Resume Loading Issues

**Unable to Load Resume YAML**

- Check if file path is correct
- If using URL, verify URL is directly accessible (test by opening in browser)
- GitHub Gist URLs are automatically converted to Raw format, no manual processing needed
- Check YAML format is correct (use online YAML validation tools)

**PIN Code Verification Fails**

- Verify `VITE_PIN_CODE` value in `.env` matches input
- Note that PIN code is case-sensitive
- Can pass PIN via URL parameter: `/resume?pin=your_PIN`

### Build and Development Issues

**Build Fails**

- Verify all dependencies are correctly installed: `yarn install`
- Check Node.js version (recommended 18.x or higher)
- Run type checking: `yarn type-check`
- Clear cache and reinstall:
  ```bash
  rm -rf node_modules yarn.lock
  yarn install
  ```

**Development Server Fails to Start**

- Check if port 5173 is already in use
- Verify `.env` file format is correct
- Check for required environment variables (at least `VITE_WEBSITE_TITLE` is needed)

**TypeScript Errors**

- Run `yarn type-check` to see detailed errors
- Verify all `@types/*` packages are installed
- Check `tsconfig.json` configuration is correct

### Docker Related Issues

**Container Fails to Start**

- Verify `.env` file exists and format is correct
- Check Docker and Docker Compose versions
- View container logs: `docker compose logs -f`

**Unable to Access Service**

- Verify port 5173 is not occupied by other services
- Check firewall settings
- Try accessing `http://localhost:5173` in browser

## Contributing

Contributions are welcome! Whether reporting issues, suggesting features, or submitting Pull Requests, all are greatly appreciated.

### How to Contribute

1. Fork this project
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

### Development Standards

- Follow existing code style (using ESLint and Prettier)
- Run `yarn check` before committing to ensure code quality
- Write clear commit messages
- Update relevant documentation

### Report Issues

If you find bugs or have feature suggestions, please [create an Issue](https://github.com/Mai0313/resume/issues).

## Acknowledgments

- [HeroUI](https://heroui.com) - Provides excellent React UI component library
- [JSON Resume](https://jsonresume.org) - Resume data standard
- All open source project contributors

## License

Licensed under the [MIT license](LICENSE).

---

**If this project helps you, please give it a ⭐️!**
