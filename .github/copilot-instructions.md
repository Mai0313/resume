# AI Coding Instructions for Resume Website

## Project Overview

This is a **data-driven personal resume website** built with Vite + React + TypeScript. Resume content is loaded from YAML files following the [JSON Resume Schema](https://jsonresume.org/schema/), supporting local files, GitHub Gists, and raw URLs. The site features conditional page rendering based on environment variables and supports deployment to GitHub Pages, Vercel, or Docker.

## Architecture & Core Concepts

### Environment-Driven Conditional Rendering

Pages and navigation items only appear when their required environment variables are set:

- **Resume page**: Only rendered when `VITE_RESUME_FILE` is configured
- See [src/App.tsx](../src/App.tsx) for routing logic
- Navigation automatically updates in [src/config/site.ts](../src/config/site.ts) using `envHelpers.isResumeFileAvailable()`

**Environment Management**: All env vars are centralized in [src/utils/env.ts](../src/utils/env.ts) with validation and defaults. Always use the `env` and `envHelpers` exports, never access `import.meta.env` directly.

### Resume Data Flow

1. **Source Resolution** ([src/utils/resumeLoader.ts](../src/utils/resumeLoader.ts)):
   - Local files: `public/example.yaml` → served as `/example.yaml`
   - GitHub Gist URLs → auto-converted to raw format
   - Raw URLs → fetched directly
2. **YAML Parsing**: Dynamic import of `js-yaml` (code-split for smaller initial bundle)
3. **Section Order Preservation**: `Object.keys()` preserves YAML key order for dynamic section rendering
4. **Component Rendering** ([src/components/ResumeContent.tsx](../src/components/ResumeContent.tsx)): Maps section names to components via `sectionComponentMap`

### Path Handling for Subdirectory Deployment

The app supports deployment to subdirectories (e.g., `username.github.io/resume`) via `VITE_ROOT_PATH`:

- **Never hardcode paths**: Always use `buildPath()` from [src/utils/pathUtils.ts](../src/utils/pathUtils.ts)
- **Router setup**: Uses `getBasename()` for React Router in [src/provider.tsx](../src/provider.tsx)
- **Vite config**: Reads `process.env.VITE_ROOT_PATH` for base path in [vite.config.ts](../vite.config.ts)

## Component Architecture Patterns

### Resume Section Components

All components in [src/components/ResumeSections/](../src/components/ResumeSections/) follow this pattern:

```tsx
interface SectionProps {
  [dataKey]: DataType[] | undefined;
  itemVariants: Variants; // Framer Motion animation variants
}

// Wrapper pattern with SectionCard
<SectionCard
  colorScheme="blue"           // Predefined color in SectionCard.tsx
  data={sectionData}           // Auto-hides if empty
  icon={SectionIcons.work}     // SVG icon from SectionCard
  itemVariants={itemVariants}
  sectionKey="work"
  title="Work Experience"
>
  {/* Content uses shared components */}
  <ItemCard>                   {/* Reusable card styling */}
    <DateRange ... />          {/* from src/components/shared/ */}
    <BulletList ... />
    <ExternalLink ... />
  </ItemCard>
</SectionCard>
```

**Key patterns**:
- `SectionCard` provides consistent section headers, icons, and conditional rendering
- `ItemCard` standardizes card styling (replaces repeated className strings)
- All shared components are in [src/components/shared/](../src/components/shared/) and exported via index.ts
- Color schemes are centralized in `SectionCard.tsx` - use existing schemes, don't hardcode colors

### Animation Strategy

Animations use Framer Motion with predefined variants in [src/utils/animations.ts](../src/utils/animations.ts):

- `fadeInStagger`: Container + item variants for staggered list animations
- Always destructure as `const { container, item } = fadeInStagger` and pass `item` as `itemVariants` prop
- Don't create new animation variants inline - extend existing ones in animations.ts

## Development Workflows

### Commands (prefer yarn)

```bash
yarn dev              # Start dev server (http://localhost:5173)
yarn build            # TypeScript check + Vite build → dist/
yarn check            # Run type-check + format + lint (do this before commits)
yarn deploy           # Build and deploy to GitHub Pages (gh-pages branch)
```

### Environment Setup

Create `.env` file with:

```bash
VITE_WEBSITE_TITLE=Your Name     # Required
VITE_RESUME_FILE=example.yaml    # Optional, hides /resume if unset
VITE_PIN_CODE=123456             # Optional PIN protection
VITE_ROOT_PATH=/resume           # For subdirectory deployment
VITE_RESUME_PDF_PATH=/resume.pdf # PDF download path (maps to public/)
```

### Adding New Resume Sections

1. **Create interface** in [src/utils/resumeLoader.ts](../src/utils/resumeLoader.ts) following JSON Resume Schema
2. **Add to ResumeData interface** as optional array property
3. **Create section component** in [src/components/ResumeSections/](../src/components/ResumeSections/):
   - Use `SectionCard` wrapper pattern
   - Reuse shared components (`ItemCard`, `DateRange`, `BulletList`, etc.)
   - Choose appropriate color scheme from `SectionCard.tsx`
4. **Register in ResumeContent.tsx**: Add to `sectionComponentMap` using `createSectionComponent` factory
5. **Export from index.ts**: Add to [src/components/ResumeSections/index.ts](../src/components/ResumeSections/index.ts)

### Testing Changes

- **Resume loading**: Test with local YAML, GitHub Gist URL, and raw URL formats
- **Conditional rendering**: Test with/without `VITE_RESUME_FILE` to verify navigation updates
- **Subdirectory deployment**: Test with `VITE_ROOT_PATH=/test` to verify all links work
- **Theme switching**: Verify dark mode support (HeroUI's `useTheme` hook)

## Project-Specific Conventions

- **TypeScript**: Strict mode enabled, prefer explicit types over `any`
- **Imports**: Use `@/` alias for src/ directory (configured in tsconfig.json + vite-tsconfig-paths)
- **Styling**: Tailwind CSS + HeroUI components (don't install additional UI libraries)
- **Code formatting**: Prettier config in package.json (2 spaces, double quotes, trailing commas)
- **Error handling**: Use HeroUI's `addToast` for user-facing errors (see [src/pages/resume.tsx](../src/pages/resume.tsx))

## Integration Points

- **HeroUI v2**: React UI library, docs at https://heroui.com
- **JSON Resume Schema**: Resume data structure standard, schema at https://jsonresume.org/schema/
- **GitHub Gist**: Auto-converts gist.github.com URLs to gist.githubusercontent.com/raw format
- **Docker**: Multi-stage build in [docker/Dockerfile](../docker/Dockerfile), compose config in [docker-compose.yaml](../docker-compose.yaml)
- **GitHub Actions**: Auto-deployment workflow in `.github/workflows/deploy.yml` (if exists)

## Common Pitfalls

1. **Don't access `import.meta.env` directly** - use [src/utils/env.ts](../src/utils/env.ts) exports
2. **Don't hardcode absolute paths** - use `buildPath()` from [src/utils/pathUtils.ts](../src/utils/pathUtils.ts)
3. **Don't create inline animation variants** - extend [src/utils/animations.ts](../src/utils/animations.ts)
4. **Don't repeat card styling** - use `ItemCard` component from [src/components/shared/](../src/components/shared/)
5. **YAML files must be in public/** - not src/, or they won't be served correctly
6. **Languages section is special** - rendered in header, not in dynamic sections loop (see [src/components/ResumeContent.tsx](../src/components/ResumeContent.tsx))
