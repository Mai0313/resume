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
  - Brand LOGO links to homepage
  - Social media icon links (GitHub, Discord)

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

### Configuration System

- **`config/site.ts`**: Website core configuration
  - Navigation item definitions (`Resume`, `Portfolio`)
  - Social media link configuration (`github`, `discord`)
  - Unified website name and description management

### Effects Component System

- **`components/SplitText.tsx`**: Split text animation component for homepage title display
- **`components/Orb.tsx`**: 3D sphere background effects component using OGL 3D graphics library
- **`components/Particles.tsx`**: Background particle system supporting theme switching and interactive effects
- **`components/FuzzyText.tsx`**: Fuzzy text effects component for 404 error pages

### Content Component System

- **`components/PortfolioContent.tsx`**: Portfolio page content component
  - Uses HeroUI components to build modern card-based layouts
  - Supports GitHub API data display and animation effects
- **`components/ResumeContent.tsx`**: Resume page content component
  - YAML configuration-based resume display system
  - Responsive design and Framer Motion animations

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
- **URL PIN Code Support**: Supports directly passing PIN code through URL parameters to unlock resume page
  - Usage: `/resume?pin=your_pin_code`
  - Automatically verifies PIN code in URL, unlocks and loads resume content when correct
  - For privacy protection, automatically removes PIN parameter from URL after successful verification
  - Supports coexistence with traditional Modal input method, providing more flexible access
- **Dynamic Resume File Loading**: Specifies which resume file to load through `VITE_RESUME_FILE` environment variable
  - When `VITE_RESUME_FILE` is not set: Automatically loads `public/example.yaml` as default resume
  - When `VITE_RESUME_FILE` is set: Loads specified YAML file (e.g., `resume.yaml`)
  - Supports flexible filename configuration for multi-environment deployment and personalization
- When incorrect `pin code` is entered, displays 404 NotFound through `FuzzyText`
- **Resume System Implementation Complete**:
  - Uses YAML configuration files for dynamic resume data loading
  - Elegantly displays resume content through `ResumeContent` component
  - Supports responsive design and theme switching
  - Includes complete personal information, education background, research experience, work experience, skills, awards, and other fields

## `Portfolio` Page (`pages/portfolio.tsx`)

- **GitHub API Integration Complete**: Automatically fetches and displays personal projects and contribution records through GitHub API
- **Pinned Projects Priority**: Automatically fetches GitHub Pinned repositories and displays them at the top with priority
- **Complete Project Information**: Displays project language, star count, fork count, latest commits, topic tags, etc.
- **Responsive Design**: Supports dark/light themes with complete animation effects
- **Environment Variable Configuration**: Uses `VITE_GITHUB_TOKEN` environment variable to access GitHub API
- **User Experience Optimization**: Homepage links display as "🔗 Link", suitable for various types of project links

## Utility Functions System

### GitHub API Integration

- **`utils/githubApi.ts`**: GitHub API operation utility functions
  - Supports mixed use of REST API and GraphQL API
  - Implements Pinned repositories fetch functionality
  - Error handling and rate limit management

### Data Loading

- **`utils/resumeLoader.ts`**: YAML resume data loading utility
  - Dynamically loads YAML configuration files specified by environment variables
  - Supports `VITE_RESUME_FILE` environment variable for custom file paths
  - Defaults to loading `public/example.yaml` as fallback when environment variable is not set
  - Error handling and type safety
  - HTTP response status checking and detailed error information

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

### Application Core

- **`App.tsx`**: Main application component, contains routing configuration
- **`main.tsx`**: Application entry point, renders root component
- **`provider.tsx`**: HeroUI theme provider configuration, supports dark mode

# Changs

## 2025-06-04 Error Message Beautification and User Experience Optimization

- **Error Message Visual Upgrade**: Implemented beautiful and user-friendly error display interface
  - **Resume Page Error Handling Optimization**:
    - Shows gradient icons and detailed descriptions when loading fails, replacing original simple text prompts
    - Added environment variable configuration prompts to guide users in correctly setting `VITE_RESUME_FILE`
    - Used Framer Motion animations to enhance error page interactivity
  - **ResumeContent Component Defensive Check Upgrade**:
    - Shows professional error cards when data structure is incomplete
    - Provides YAML examples of expected data structure to help users understand configuration requirements
    - Uses HeroUI design system to build consistent error display style
  - **Portfolio Page Error Handling Beautification**:
    - Shows detailed error information and retry buttons when GitHub API errors occur
    - Optimized empty state display using icons and animations to enhance visual effects
    - Removed duplicate error handling code, simplified component structure
- **Technical Improvements**:
  - All error messages adopt consistent design language and visual style
  - Used gradient backgrounds and SVG icons to enhance visual identification
  - Responsive design ensures good display of error pages on all devices
  - Maintains dark/light theme compatibility
  - Code quality improvement: removed unused imports, fixed ESLint warnings
- **User Experience Enhancement**:
  - Error information is clearer, providing specific solutions
  - Animation effects make error handling process smoother and more natural
  - Professional visual design reduces user frustration when facing errors

## 2025-06-04 Complete Removal of Resume Page PDF Output Function

- **PDF Function Cleanup**: Completely removed PDF output related functions from the resume page
  - Removed `@react-pdf/renderer` and `PDFDownloadLink` related imports from `src/pages/resume.tsx`
  - Deleted PDF download button and related UI components
  - Removed `src/components/ResumePDF.tsx` component file
  - Deleted `src/types/react-pdf.d.ts` TypeScript type definition file
  - Removed `@react-pdf/renderer` dependency from `package.json`
- **Documentation Update**: Updated `.github/copilot-instructions.md`
  - Removed all descriptions and explanations related to PDF functionality
  - Cleaned up outdated feature records, keeping documentation consistent with actual code state
- **Code Simplification**:
  - Resume page now focuses only on web version resume display
  - Maintains all existing features: PIN code verification, theme switching, YAML dynamic loading, etc.
  - Resume page layout is more concise, removing PDF download area
- **Backward Compatibility**: All other functions are completely retained, not affecting existing user experience

## 2025-06-03 Resume URL PIN Code Support Function Implementation

- **URL PIN Code Unlock Function**: Implemented function to directly pass PIN code through URL parameters to unlock resume page
  - Supports `/resume?pin=your_pin_code` format URL for direct unlocking
  - Automatically checks `pin` value in URL parameters and verifies when component loads
  - Automatically unlocks resume and loads content after successful verification, no manual PIN code input needed
  - For privacy protection, uses `window.history.replaceState()` to automatically remove PIN parameter from URL after successful verification
- **Flexible Access Methods**:
  - **URL Direct Unlock**: Suitable for sharing through links, recipients can access directly by clicking
  - **Traditional Modal Input**: Retains original Modal PIN code input method, both methods coexist
  - **Smart Conditional Judgment**: Only checks URL PIN code when PIN code protection is enabled
- **Security Considerations**:
  - PIN code is immediately removed from browser URL after successful verification, avoiding PIN code remaining in history
  - Maintains original error handling mechanism, incorrect URL PIN code does not affect traditional input method
  - Complies with existing security logic, all verification processes remain consistent
- **Backward Compatibility**: Completely retains existing PIN code functionality, does not affect any existing usage methods

## 2025-05-30 Portfolio GitHub Token Missing Handling Function Implementation

- **Smart Token Detection Mechanism**: Implemented complete GitHub Token missing detection and user guidance system
  - Modified `src/utils/githubApi.ts` to add `isGitHubTokenAvailable()` function to check Token availability
  - All GitHub API functions throw dedicated `GITHUB_TOKEN_MISSING` error when Token is missing
  - Removed mandatory Token check at initialization, changed to on-demand check to avoid blocking application startup
- **Portfolio Page Optimization**:
  - Updated `src/pages/portfolio.tsx` to add `isTokenMissing` state management
  - Used `isGitHubTokenAvailable()` to check Token status when component loads
  - Shows setup guide directly when Token is missing, no need to attempt API requests
  - Maintains original error handling mechanism for other types of API errors
- **User-Friendly Setup Guide**:
  - Updated `src/components/PortfolioContent.tsx` to add `isTokenMissing` property support
  - Implemented beautiful Token setup guide card with complete step-by-step instructions
  - Provides direct link to GitHub Personal Access Tokens
  - Detailed setup steps: complete process from creating Token to configuring environment variables
  - Uses HeroUI components to build modern prompt interface
- **Technical Features**:
  - Conditional rendering: shows setup guide when Token is missing, shows Portfolio content when Token is normal
  - Maintains responsive design and dark/light theme compatibility
  - Layered error handling: Token missing, API errors, loading states are handled independently
  - Backward compatible: original Portfolio functionality is completely retained, only added Token check logic
- **User Experience Enhancement**:
  - New users don't need to guess why Portfolio page cannot load, see setup guide directly
  - Clear operation steps lower setup threshold
  - Professional visual design enhances user experience during setup process

## 2025-05-30 Resume File Dynamic Loading Function Implementation

- **Environment Variable Driven File Loading**: Implemented Resume file dynamic loading system based on environment variables
  - Added `VITE_RESUME_FILE` environment variable, supports custom resume file path
  - Automatically uses `public/example.yaml` as default resume when environment variable is not set
  - Loads specified YAML file when environment variable is set (e.g., `resume.yaml`)
- **resumeLoader.ts Utility Function Enhancement**:
  - Added `getResumeFilePath()` function to handle file path logic
  - Improved error handling mechanism, added HTTP response status check
  - Supports flexible configuration of relative and absolute paths
  - Provides detailed error messages for easy debugging
- **Environment Variable Configuration System Extension**:
  - Updated `.env.example` to add `VITE_RESUME_FILE` description and usage examples
  - Updated `vite-env.d.ts` to add complete environment variable TypeScript type definitions
  - Includes all environment variables: `VITE_GITHUB_TOKEN`, `VITE_PIN_CODE`, `VITE_ROOT_PATH`, `VITE_RESUME_FILE`, etc.
- **Usage Scenario Optimization**:
  - **Development Environment**: Don't set `VITE_RESUME_FILE`, use `example.yaml` sample data
  - **Personal Deployment**: Set `VITE_RESUME_FILE=resume.yaml` to load real resume
  - **Multi-version Management**: Supports loading different resume files (e.g., `resume-en.yaml`, `resume-zh.yaml`)
- **Backward Compatibility**: Maintains all existing functions, does not affect existing PIN code verification and theme switching mechanisms

## 2025-05-30 Custom ROOT PATH Function Implementation

- **Multi-environment Deployment Support**: Implemented complete custom root path function, supports different deployment environments
  - Created `src/utils/pathUtils.ts` to provide path processing utility functions
  - Supports `VITE_ROOT_PATH` environment variable for root path configuration
  - Updated `vite.config.ts` to support Vite base path configuration
  - Updated `main.tsx` to support React Router basename configuration
- **Path Utility Function System**:
  - `getRootPath()`: Gets and normalizes root path from environment variables
  - `buildPath(path)`: Automatically constructs complete path including root path prefix
  - `getBasename()`: Provides React Router compatible basename
- **Configuration System Update**:
  - Updated `config/site.ts` to use dynamic path construction
  - Updated `components/navbar.tsx` homepage link to use `buildPath`
  - All internal navigation links automatically support root path prefix
- **Environment Variable Documentation**:
  - Updated `.env.example` to add `VITE_ROOT_PATH` description and usage examples
  - Supports multiple deployment scenarios: root directory, subdirectory, GitHub Pages project directory
- **Usage Scenarios**:
  - **Root Directory Deployment**: `VITE_ROOT_PATH=/` or not set (default)
  - **Subdirectory Deployment**: `VITE_ROOT_PATH=/my-app`
  - **GitHub Pages**: `VITE_ROOT_PATH=/your-repo-name`
- **Technical Features**:
  - Automatic path normalization, handles slash issues
  - Fully compatible with React Router and Vite
  - Maintains all existing functions and theme switching
  - Backward compatible, does not affect existing deployment

## 2025-05-30 Portfolio Card Layout Optimization

- **Bottom Link Fixed**: Optimized PortfolioContent component card layout
  - Used `flex flex-col` and `flex-grow` to ensure proper distribution of card content
  - Added `mt-auto` class to ensure bottom area (homepage link) is always fixed at card bottom
  - Improved card height consistency, enhanced visual tidiness
  - Added comments explaining purpose of bottom fixed area
- **User Experience Enhancement**:
  - Regardless of card content amount, 🔗 Link will stay at the same position at the bottom
  - Maintains responsive design and existing animation effects
  - Maintains dark/light theme compatibility

## 2025-05-30 Portfolio Function Optimization and Documentation Enhancement

- **User Experience Optimization**: User manually adjusted PortfolioContent component
  - Changed homepage link text from "🔗 Demo" to "🔗 Link"
  - Enhanced user experience, as homepage might be project homepage, documentation, or other types of links
- **Documentation Architecture Enhancement**: Complete recording of all project components and functions
  - Added effects component system description (SplitText, Orb, Particles, FuzzyText)
  - Added content component system description (PortfolioContent, ResumeContent)
  - Added utility function system description (githubApi, resumeLoader)
  - Added navigation system record (navbar.tsx)
  - Ensured all components in `src` directory are properly recorded
- **Project Architecture Transparency**:
  - All page components (`pages/`) have been recorded in detail
  - All core components (`components/`) have been categorized and explained
  - All utility functions (`utils/`) have been recorded
  - Ensured documentation is completely consistent with actual code

## 2025-05-30 Project Architecture Documentation Enhancement

- **Documentation Error Correction**: Fixed non-existent `GradientText` component reference
  - Removed incorrect `import GradientText from './GradientText';` description
  - Updated to use `title` utility from `@/components/primitives` to achieve gradient text effects
  - Fixed Home page description to reflect actual implementation state
- **Core Architecture Component Documentation**:
  - Added complete UI component system description (`primitives.ts`)
  - Recorded all components of icon system (`icons.tsx`)
  - Documented layout system (`default.tsx`) and theme system (`theme-switch.tsx`)
  - Added configuration system description (`site.ts`)
- **Styles and Type System Recording**:
  - Documented CSS utility classes and special effect styles
  - Recorded complete TypeScript type definitions
  - Added application core component descriptions (`App.tsx`, `main.tsx`, `provider.tsx`)
- **Ensured Documentation Completeness**:
  - Checked that all components in `src` directory have been properly recorded
  - Removed false or outdated component references
  - All function descriptions match actual implementation state

## 2025-05-30 Resume PIN Code Conditional Logic Optimization

- **Conditional PIN Code Verification**: Implemented smart PIN code verification mechanism
  - When `VITE_PIN_CODE` environment variable is not set or empty, directly displays resume content without PIN code verification
  - When `VITE_PIN_CODE` is set, maintains original PIN code verification protection mechanism
  - Uses `IS_PIN_ENABLED` constant to control entire verification process
- **Automatic Initialization Logic**:
  - Automatically checks PIN code enabled status when component loads
  - Automatically sets `authenticated = true` and loads resume data when not enabled
  - Maintains original Modal verification process when enabled
- **Usage Scenario Optimization**:
  - **Development Environment**: Don't set or clear `VITE_PIN_CODE`, directly access resume content for easy development testing
  - **Production Environment**: Set `VITE_PIN_CODE`, requires correct PIN code to view resume, protecting privacy
- **Maintains Backward Compatibility**:
  - All original functions completely retained: theme switching, FuzzyText 404 effects, animation effects
  - Error handling mechanism only triggers when PIN code is enabled
  - Modal component conditional rendering, avoiding unnecessary UI elements

## 2025-05-30 Portfolio Function Complete Implementation

- **GitHub API Integration System**: Implemented complete GitHub API integration, supports dynamic loading of personal projects
  - Created `src/utils/githubApi.ts` to provide complete GitHub API operation functions
  - Supports mixed use of REST API and GraphQL API, optimizing data retrieval efficiency
  - Implemented API error handling and rate limit management
- **Pinned Project Priority Display**:
  - Uses GitHub GraphQL API to get user's Pinned repositories
  - Pinned projects automatically sorted to top with "📌 Pinned" badge
  - Supports displaying contribution projects in other people's repos
- **PortfolioContent Component Design**:
  - Uses HeroUI components to build modern card-based layout
  - Dynamically displays project language, star count, fork count, latest commit records
  - Supports project topic tag display and demo links
  - Implements responsive grid layout (mobile 1 column, tablet 2 columns, desktop 3 columns)
- **Visual Design Optimization**:
  - Repo name left-aligned, pinned flag and statistics right-aligned
  - Supports programming language color indication, enhancing visual identification
  - Added Framer Motion animation effects, providing smooth loading experience
- **Technical Architecture Features**:
  - Complete TypeScript type definitions, including GitHubRepository, GitHubCommit, GitHubContribution
  - Environment variable management: `VITE_GITHUB_TOKEN` for GitHub API authentication
  - Error handling mechanism: loading state, error prompts, empty state handling
  - Complies with ESLint standards, no warnings or errors

## 2025-05-30 Resume System Complete Implementation

- **YAML-Driven Resume System**: Implemented complete resume management system based on YAML configuration
  - Supports specifying resume data source file through `VITE_RESUME_FILE` environment variable
  - Implemented `src/utils/resumeLoader.ts` for dynamic YAML data loading
- **Resume Page Function Enhancement**:
  - Maintains original PIN code verification mechanism (environment variable `VITE_PIN_CODE`)
  - Integrated new `ResumeContent` component, implementing beautiful resume display
  - Added loading state and error handling mechanism
  - Maintains 404 FuzzyText effect compatibility with theme switching
- **ResumeContent Component Design**:
  - Uses HeroUI components (Card, Chip, Divider, Link) to build modern UI
  - Implements responsive layout, supports dark/light themes
  - Added Framer Motion animation effects, enhancing user experience
  - Structured display: personal information, education background, research experience, work experience, skills, awards, community contributions, research interests
- **Dependency Package Updates**:
  - Added `js-yaml` and `@types/js-yaml` for YAML parsing
  - Installed missing HeroUI components: `@heroui/card`, `@heroui/chip`, `@heroui/divider`, `@heroui/spinner`
  - Ensured `framer-motion` is properly installed for animation effects
- **Technical Architecture Optimization**:
  - YAML configuration files located in `public/` directory, ensuring proper network access
  - Complete TypeScript type definitions, providing good development experience
  - Component-based design, easy to maintain and extend
  - Follows Vite best practices, optimizing packaging and deployment

## 2025-05-30 Theme Switching Function Enhancement

- **Problem Fix**: Fixed Particles component and 404 FuzzyText effect adaptation issues when switching between dark/light themes
- **Particles Component Optimization**:
  - Added `useTheme` hook to implement theme awareness
  - Implemented dynamic color selection: dark mode uses white/gray particles, light mode uses dark gray particles
  - Removed hardcoded particleColors, changed to automatic theme detection
- **404 FuzzyText Effect Fix**:
  - Implemented dual theme detection: useTheme hook + DOM MutationObserver
  - Added component re-rendering mechanism using renderKey and forceRender state
  - Enhanced FuzzyText component's canvas handling and theme change response
  - Added complete canvas cleanup and reset mechanism
- **Code Quality Improvement**:
  - Removed all console.log statements to comply with ESLint standards
  - Cleaned up unnecessary debug output, keeping code tidy
  - ESLint check now passes completely with no warnings or errors
- **Technical Improvements**:
  - Theme switching now correctly responds to all visual effects
  - Particle system and text effects can instantly adapt to theme changes
  - Enhanced component stability and user experience

## 2025-05-30 ESLint Code Quality Correction

- **Correction Content**: Removed all remaining console statements to fully comply with ESLint standards
- **Corrected Files**:
  - `src/pages/resume.tsx`: Removed `console.log` statements in error handling, also removed unused error parameters
  - `src/utils/resumeLoader.ts`: Removed `console.error` statements, maintaining error propagation mechanism
- **Result**: ESLint check now passes completely with no warnings or errors, achieving 100% code quality standard
- **Impact**: Maintained original error handling functionality, only removed debug output, complying with production environment code requirements

## 2025-05-30 Resume System Dynamic Section Order and Complete JSON Resume Support

- `src/utils/resumeLoader.ts` added `extractSectionOrder()`, automatically extracts top-level section order from YAML/JSON
- Returned `data` structure includes `sectionOrder` array, ResumeContent dynamically renders sections according to this order
- Supports complete JSON Resume standard fields: `certificates`, `references`, `projects`, as well as existing `work`, `education`, `skills`, `languages`, `interests`, `awards`, `publications`, `volunteer`
- `languages` and `basics` information displayed together in Header Section, other sections strictly displayed according to `sectionOrder` array order, no need for hardcoded order
- Web version uses consistent rendering logic, dynamic order adjustment requires no code modification to display latest configuration
