# Contributing

Contributions are welcome! Whether reporting issues, suggesting features, or submitting Pull Requests, all are greatly appreciated.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18.x or higher
- [Yarn](https://yarnpkg.com/) (recommended) or npm

### Development Setup

1. Fork and clone the repository:

   ```bash
   git clone https://github.com/<your-username>/resume.git
   cd resume
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Create a `.env` file in the project root (refer to `.env` example in README):

   ```bash
   VITE_WEBSITE_TITLE=Mai
   VITE_RESUME_FILE=resume.yaml
   ```

4. Start the development server:

   ```bash
   yarn dev
   ```

## How to Contribute

1. Fork this project
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Make your changes
4. Run quality checks: `yarn check`
5. Commit your changes following [Conventional Commits](#commit-conventions)
6. Push to the branch: `git push origin feature/AmazingFeature`
7. Open a Pull Request

## Development Standards

### Code Quality

The project uses the following tools to ensure code quality:

- **ESLint** - Code style checking and error detection
- **Prettier** - Automatic code formatting
- **TypeScript** - Type checking

Before committing, always run:

```bash
# Complete check (type-check + format + lint)
yarn check
```

Or use individual commands:

```bash
# Type checking only
yarn type-check

# Code formatting
yarn format

# Linting with auto-fix
yarn lint
```

### Commit Conventions

This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification. Pull Request titles are validated by CI to ensure compliance.

Format: `<type>(<scope>): <description>`

Common types:

- `feat` - A new feature
- `fix` - A bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting, semicolons, etc.)
- `refactor` - Code refactoring without feature changes or bug fixes
- `perf` - Performance improvements
- `test` - Adding or updating tests
- `chore` - Build process, dependency updates, or auxiliary tool changes
- `ci` - CI/CD configuration changes

Examples:

```
feat: add PDF download button to resume page
fix: resolve navigation bar display issue on mobile
docs: update environment variable documentation
chore: upgrade HeroUI dependencies
```

### Pull Request Guidelines

- Keep PRs focused on a single concern
- Ensure the PR title follows Conventional Commits format
- Provide a clear description of the changes
- Make sure all CI checks pass before requesting review
- Update relevant documentation if applicable

## Project Structure Overview

Key directories for contributors:

- `src/pages/` - Page components
- `src/components/` - Reusable UI components
- `src/components/ResumeSections/` - Resume section components
- `src/utils/` - Utility functions
- `src/config/` - Site configuration
- `src/types/` - TypeScript type definitions

For detailed project structure, see [README.md](README.md#project-structure).

## Report Issues

If you find bugs or have feature suggestions, please [create an Issue](https://github.com/Mai0313/resume/issues).

When reporting bugs, please include:

- Steps to reproduce the issue
- Expected behavior
- Actual behavior
- Browser and OS information (if applicable)
- Screenshots (if applicable)

## License

By contributing to this project, you agree that your contributions will be licensed under the [MIT License](LICENSE).
