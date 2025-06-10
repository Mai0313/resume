<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

**Please update `.github/copilot-instructions.md` whenever code is modified so that others can quickly understand the project status**

# Personal Website Development Project

- Build a personal website using HeroUI framework that can be deployed to Github Pages
- Use `vite` and `yarn` as frontend development tools
- Navbar currently contains only `Resume` and `Portfolio` pages, clicking the brand LOGO returns to `Home` page
- Other custom pages have been removed, current three routes: `Home (/)`, `Resume (/resume)`, `Portfolio (/portfolio)`
- Infrastructure setup completed, content placeholders in place, detailed features and styles to be completed later
- You don't need to execute package installation commands, just remind developers to run `yarn add` to install necessary packages after task completion

# Project Requirements

## Core Architecture Components

### UI Component System

- **`components/primitives.ts`**: Provides TailwindCSS variant utility functions
  - `title`: Supports multiple gradient colors and sizes for title styles (violet, yellow, blue, cyan, green, pink, foreground)
  - `subtitle`: Responsive subtitle styles
  - All styles support `bg-clip-text text-transparent bg-gradient-to-b` gradient effects

### Icon System

- **`components/icons.tsx`**: Complete SVG icon component library
  - `Logo`: Brand logo icon
  - `GithubIcon`: GitHub social media icon
  - `DiscordIcon`: Discord social media icon
  - `SunFilledIcon` / `MoonFilledIcon`: Theme toggle icons
  - All icons support size customization and `IconSvgProps` type definitions

### Navigation System

- **`components/navbar.tsx`**: Main navigation bar component
  - Responsive design supporting mobile and desktop layouts
  - Integrated theme toggle functionality
  - Brand LOGO links to homepage using `buildPath()` for multi-environment deployment support
  - Social media icon links (GitHub, Discord)
  - All internal navigation links automatically support root path prefix

### Layout System

- **`layouts/default.tsx`**: Default page layout component
  - Contains fixed `Navbar` navigation bar
  - Responsive container layout (`max-w-7xl mx-auto`)
  - Flexible height design (`flex-grow pt-16`)

### Theme System

- **`components/theme-switch.tsx`**: Dark/light theme toggle component
  - Uses `@heroui/use-theme` hook to manage theme state
  - Prevents SSR hydration mismatch issues
  - Supports keyboard accessibility
  - **Enhanced Theme Integration**: All visual effects (Particles, FuzzyText) now correctly respond to theme changes
  - **Automatic Color Adaptation**: Components automatically adapt colors based on current theme
  - **Improved Stability**: Enhanced component cleanup and reset mechanisms for theme transitions

### Configuration System

- **`config/site.ts`**: Website core configuration
  - Navigation item definitions (`Resume`, `Portfolio`)
  - Social media link configuration (`github`, `discord`)
  - Unified website name and description management
  - Updated to use dynamic path construction with `buildPath()` function

### Effects Component System

- **`components/SplitText.tsx`**: Split text animation component for homepage title display
- **`components/Orb.tsx`**: 3D sphere background effects component using OGL 3D graphics library
- **`components/Particles.tsx`**: Background particle system with enhanced theme switching support
  - Uses `useTheme` hook for theme awareness and automatic color adaptation
  - Dynamic color selection: dark mode uses white/gray particles, light mode uses dark gray particles
  - Removed hardcoded colors in favor of automatic theme detection
  - Supports interactive effects and seamless theme transitions
- **`components/FuzzyText.tsx`**: Enhanced fuzzy text effects component for 404 error pages
  - Dual theme detection system: useTheme hook + DOM MutationObserver
  - Component re-rendering mechanism using renderKey and forceRender state
  - Enhanced canvas handling and theme change response
  - Complete canvas cleanup and reset mechanism for improved stability

### Content Component System

- **`components/PortfolioContent.tsx`**: Portfolio page content component with enhanced user experience
  - Uses HeroUI components to build modern card-based layouts
  - Supports GitHub API data display and animation effects
  - **Error Handling Beautification**: Shows detailed error information and retry buttons when GitHub API errors occur
  - **GitHub Token Missing Guide**: Beautiful Token setup guide card with step-by-step instructions when `VITE_GITHUB_TOKEN` is missing
  - **Card Layout Optimization**: Fixed bottom link positioning using `flex flex-col`, `flex-grow`, and `mt-auto` classes
  - **User Experience Enhancement**: Homepage links display as "🔗 Link" with consistent bottom positioning
  - Conditional rendering for different states: Token missing, API errors, loading, and normal content
  - Maintains responsive design and dark/light theme compatibility
- **`components/ResumeContent.tsx`**: Resume page content component with advanced error handling
  - YAML configuration-based resume display system with dynamic section ordering
  - **Defensive Check Upgrade**: Shows professional error cards when data structure is incomplete
  - **YAML Examples**: Provides expected data structure examples to help users understand configuration requirements
  - Uses HeroUI design system for consistent error display style
  - Responsive design and Framer Motion animations
  - Complete JSON Resume standard support including dynamic section order rendering

## `Home` Page (`pages/index.tsx`)

- Uses components from `@react-spring/web` for animated page elements
- Homepage uses `Orb` as background, displays GitHub name `Mai` in the center through `Split Text`
- Uses `Particles` as background particle system, supporting theme switching and interactive effects
- Contact information displayed through icon links in `Navbar`: Discord, Github

* `Split Text` can be used via `import SplitText from "./SplitText";`
* `Orb` can be used via `import Orb from './Orb';`
* `Particles` can be used via `import Particles from './Particles';`
* Gradient text effects can be achieved using the `title` utility from `@/components/primitives`

## `Resume` Page (`pages/resume.tsx`)

- **Smart PIN Code Protection**: Determines whether PIN code verification is needed based on the `VITE_PIN_CODE` environment variable setting
  - When `VITE_PIN_CODE` is not set: Directly displays resume content, suitable for development and testing environments
  - When `VITE_PIN_CODE` is set: Requires correct PIN code input to access resume, protecting personal privacy
  - **Conditional PIN Code Verification**: Uses `IS_PIN_ENABLED` constant to control entire verification process
  - **Automatic Initialization Logic**: Automatically sets `authenticated = true` when PIN is not enabled
- **URL PIN Code Support**: Supports directly passing PIN code through URL parameters to unlock resume page
  - Usage: `/resume?pin=your_pin_code`
  - Automatically verifies PIN code in URL, unlocks and loads resume content when correct
  - For privacy protection, automatically removes PIN parameter from URL after successful verification using `window.history.replaceState()`
  - Supports coexistence with traditional Modal input method, providing more flexible access
  - **Smart Conditional Judgment**: Only checks URL PIN code when PIN code protection is enabled
- **Dynamic Resume File Loading**: Specifies which resume file to load through `VITE_RESUME_FILE` environment variable
  - When `VITE_RESUME_FILE` is not set: Automatically loads `public/example.yaml` as default resume
  - When `VITE_RESUME_FILE` is set: Loads specified YAML file (e.g., `resume.yaml`)
  - Supports flexible filename configuration for multi-environment deployment and personalization
  - **Multi-version Management**: Supports loading different resume files (e.g., `resume-en.yaml`, `resume-zh.yaml`)
- **Error Handling Optimization**: Enhanced error display with beautiful and user-friendly interface
  - Shows gradient icons and detailed descriptions when loading fails, replacing simple text prompts
  - Added environment variable configuration prompts to guide users in correctly setting `VITE_RESUME_FILE`
  - Used Framer Motion animations to enhance error page interactivity
  - Maintains professional visual design that reduces user frustration when facing errors
- When incorrect `pin code` is entered, displays 404 NotFound through enhanced `FuzzyText` with theme switching support
- **Resume System Implementation Complete**:
  - Uses YAML configuration files for dynamic resume data loading with automatic section ordering
  - Elegantly displays resume content through enhanced `ResumeContent` component
  - Supports complete JSON Resume standard fields: `certificates`, `references`, `projects`, etc.
  - Dynamic section order extraction and rendering without hardcoded order requirements
  - Supports responsive design and seamless theme switching
  - **PDF Function Removed**: Completely removed PDF output functionality, focusing on web-only resume display
  - Includes complete personal information, education background, research experience, work experience, skills, awards, and other fields

## `Portfolio` Page (`pages/portfolio.tsx`)

- **GitHub API Integration Complete**: Automatically fetches and displays personal projects and contribution records through GitHub API
- **Pinned Projects Priority**: Automatically fetches GitHub Pinned repositories and displays them at the top with priority
- **Complete Project Information**: Displays project language, star count, fork count, latest commits, topic tags, etc.
- **Responsive Design**: Supports dark/light themes with complete animation effects
- **Environment Variable Configuration**: Uses `VITE_GITHUB_TOKEN` environment variable to access GitHub API
- **Smart Token Detection**: Implements complete GitHub Token missing detection and user guidance system
  - Uses `isGitHubTokenAvailable()` function to check Token availability
  - Shows beautiful Token setup guide directly when Token is missing
  - Provides step-by-step instructions and direct links to GitHub Personal Access Tokens
  - Conditional rendering: shows setup guide when Token is missing, shows Portfolio content when normal
- **Error Handling Beautification**: Enhanced error display with professional visual design
  - Shows detailed error information and retry buttons when GitHub API errors occur
  - Optimized empty state display using icons and animations to enhance visual effects
  - Layered error handling: Token missing, API errors, loading states are handled independently
  - All error messages adopt consistent design language and visual style
- **User Experience Optimization**: Homepage links display as "🔗 Link", suitable for various types of project links
- **Card Layout Optimization**: Fixed bottom link positioning for consistent visual appearance across all project cards

## Utility Functions System

### GitHub API Integration

- **`utils/githubApi.ts`**: GitHub API operation utility functions
  - Supports mixed use of REST API and GraphQL API
  - Implements Pinned repositories fetch functionality
  - Error handling and rate limit management
  - **Smart Token Detection**: Added `isGitHubTokenAvailable()` function to check Token availability
  - **Dedicated Error Handling**: Throws `GITHUB_TOKEN_MISSING` error when Token is missing
  - **On-demand Token Check**: Removed mandatory Token check at initialization to avoid blocking application startup

### Data Loading

- **`utils/resumeLoader.ts`**: YAML resume data loading utility
  - Dynamically loads YAML configuration files specified by environment variables
  - Supports `VITE_RESUME_FILE` environment variable for custom file paths
  - Defaults to loading `public/example.yaml` as fallback when environment variable is not set
  - Error handling and type safety
  - HTTP response status checking and detailed error information
  - **Dynamic Section Order**: Added `extractSectionOrder()` function to automatically extract top-level section order from YAML/JSON
  - **Complete JSON Resume Support**: Supports all JSON Resume standard fields including `certificates`, `references`, `projects`
  - **Enhanced Error Handling**: Provides detailed error messages and debugging information
  - **File Path Logic**: Added `getResumeFilePath()` function to handle flexible configuration of relative and absolute paths

### Path Utility Functions

- **`utils/pathUtils.ts`**: Custom ROOT PATH support utility functions
  - `getRootPath()`: Gets root path from `VITE_ROOT_PATH` environment variable, defaults to '/'
  - `buildPath(path)`: Constructs complete path including root path prefix (e.g., `/my-app/resume`)
  - `getBasename()`: Gets React Router's basename configuration
  - Supports path configuration for different deployment environments (root directory, subdirectory, GitHub Pages, etc.)

## Styles and Type System

### CSS Utility Classes

- **`styles/globals.css`**: Global style definitions
  - Contains Tailwind CSS base styles
  - Custom `line-clamp-1`, `line-clamp-2`, `line-clamp-3` utility classes
  - Used for text truncation and ellipsis display

### Special Effects Styles

- **`styles/Orb.css`**: Orb component specific styles
- **`styles/Particles.css`**: Particles component specific styles

### TypeScript Type Definitions

- **`types/index.ts`**: Core type definitions
  - `IconSvgProps`: SVG icon component property types
  - `GitHubRepository`: GitHub repository data structure
  - `GitHubCommit`: GitHub commit record structure
  - `GitHubContribution`: GitHub contribution data structure (includes `isPinned` flag)
- **`types/ogl.d.ts`**: OGL 3D graphics library type declarations
- **`vite-env.d.ts`**: Vite environment variable type definitions
  - Contains TypeScript type definitions for all project environment variables
  - `VITE_GITHUB_TOKEN`, `VITE_PIN_CODE`, `VITE_ROOT_PATH`, `VITE_RESUME_FILE`, etc.
  - **Complete Environment Variable Support**: Enhanced with comprehensive type definitions for multi-environment deployment

### Application Core

- **`App.tsx`**: Main application component, contains routing configuration
- **`main.tsx`**: Application entry point, renders root component
- **`provider.tsx`**: HeroUI theme provider configuration, supports dark mode

# Current Status (Updated June 10, 2025)

The personal website development project is **feature-complete** with the following major implementations:

## Core Features Implemented

- ✅ **Complete GitHub API Integration**: Portfolio page with pinned repositories, smart token detection, and beautiful error handling
- ✅ **Advanced Resume System**: YAML-driven with PIN code protection, URL unlocking, dynamic file loading, and JSON Resume standard support
- ✅ **Enhanced Theme System**: Seamless dark/light mode switching across all visual effects including Particles and FuzzyText
- ✅ **Multi-Environment Deployment**: Custom ROOT PATH support for various deployment scenarios (GitHub Pages, subdirectories)
- ✅ **Professional Error Handling**: Beautiful error displays with gradient icons, animations, and user-friendly guidance
- ✅ **Responsive Design**: Modern UI using HeroUI components with complete mobile/desktop compatibility
- ✅ **Type Safety**: Complete TypeScript coverage with comprehensive environment variable definitions

## Technical Quality

- ✅ **ESLint Compliance**: 100% code quality standard with no warnings or errors
- ✅ **Component Architecture**: Well-structured, maintainable codebase with clear separation of concerns
- ✅ **Performance Optimized**: Efficient API usage, proper error boundaries, and optimized rendering
- ✅ **Documentation**: Comprehensive inline documentation matching actual implementation

## User Experience Features

- ✅ **Smart Configuration**: Environment variable-driven setup for easy customization
- ✅ **Accessibility**: Keyboard navigation, screen reader support, and proper ARIA labels
- ✅ **Visual Polish**: Smooth animations, consistent design language, and professional appearance
- ✅ **Error Recovery**: Graceful fallbacks, retry mechanisms, and clear user guidance

The project is ready for production deployment with all major features implemented and tested.
