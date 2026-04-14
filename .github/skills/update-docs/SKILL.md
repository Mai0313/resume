---
name: update-docs
description: "Investigate the entire codebase using Agent Team and update all documentation files (README, CONTRIBUTING, etc.) to reflect the actual code. Use when: docs are outdated, code changed significantly, need to sync documentation with codebase, update README, refresh project docs."
argument-hint: "describe what changed or just say 'sync all docs'"
---

# Update Documentation from Codebase

Thoroughly investigate the codebase using Agent Team (subagents) and update all documentation files to accurately reflect the current state of the code. This skill is **language and framework agnostic** — it works for any project regardless of programming language, build system, or tech stack.

## When to Use

- After significant code changes that may have made docs outdated
- When adding new features, dependencies, or configuration options
- Periodic documentation sync to ensure accuracy
- When version numbers, tech stack, or project structure changed

## Target Files

### Always Update (if they exist)

| File | Purpose |
|------|---------|
| `README.md` | Primary project documentation |
| `README.*.md` | Localized README variants (e.g., `README.zh-CN.md`, `README.zh-TW.md`, `README.ja.md`, etc.) |
| `CONTRIBUTING.md` | Contribution guidelines |

### Update If Present (skip if missing)

| File | Purpose |
|------|---------|
| `CLAUDE.md` | Claude AI instructions |
| `GEMINI.md` | Gemini AI instructions |
| `.github/copilot-instructions.md` | GitHub Copilot instructions |
| `AGENTS.md` | Agent definitions |

**Discovery**: At the start, scan the repo root and `.github/` for all documentation files matching these patterns. Only update files that already exist — never create new ones.

## Procedure

### Phase 1: Codebase Investigation (Parallel Subagents)

Launch multiple **Explore** subagents in parallel to gather comprehensive codebase information. Each subagent should be given a focused investigation area.

**Subagent 1 — Project Structure & Config:**
> Thoroughly investigate the project structure. Report:
> - All top-level config files and their purpose
> - Full directory tree with descriptions of each folder's role
> - Build system, scripts, and available commands (look for Makefile, package.json scripts, Cargo.toml, pyproject.toml, CMakeLists.txt, Justfile, taskfile, or any build config)
> - Deployment configuration (CI/CD workflows, Docker, cloud platform configs, etc.)
> - Project type detection: identify the primary language(s) and framework(s)

**Subagent 2 — Dependencies & Tech Stack:**
> Thoroughly investigate dependencies and tech stack. Report:
> - Identify the dependency manifest(s) used by this project (e.g., package.json, requirements.txt, pyproject.toml, go.mod, Cargo.toml, build.gradle, pom.xml, Gemfile, etc.)
> - All dependencies with their EXACT versions as declared in the manifest
> - Key frameworks and libraries being used and HOW they're used in the code
> - Any version mismatches between documentation and actual dependency manifests

**Subagent 3 — Features & Architecture:**
> Thoroughly investigate all source code features. Report:
> - Entry points, modules, pages/routes, APIs, CLI commands — whatever is relevant to the project type
> - Core components/classes/functions and their responsibilities
> - Environment variables and configuration mechanisms (grep for common patterns: `env`, `config`, `settings`, `ENV`, `os.environ`, `process.env`, `std::env`, etc.)
> - Any features not documented or documented features that no longer exist

**Subagent 4 — Existing Documentation Audit:**
> Find and read ALL documentation files in the repo root and `.github/` (README*, CONTRIBUTING*, CLAUDE.md, GEMINI.md, copilot-instructions.md, AGENTS.md, and any other .md files that serve as project docs). Report:
> - Which files exist and which don't
> - Current structure and sections of each doc
> - Any inconsistencies BETWEEN localized versions of the same doc
> - Outdated information spotted (wrong versions, missing features, removed features, incorrect commands)

### Phase 2: Diff Analysis

Compare investigation results against current documentation:

1. **Version Numbers**: Cross-check all library/framework versions mentioned in docs against the actual dependency manifest(s)
2. **Features**: Verify every documented feature still exists in code; find undocumented features
3. **Configuration**: Ensure all env vars, config options, and setup steps are accurate
4. **Structure**: Confirm project structure descriptions match actual file tree
5. **Commands**: Verify all documented commands (build, test, lint, deploy, etc.) match what's actually available

### Phase 3: Update Strategy Decision

For each documentation file, decide the approach:

- **Diff Update**: If the doc structure is good and only specific facts are wrong (versions, feature list, etc.), make targeted edits
- **Full Rewrite**: If the doc is fundamentally outdated or structurally misaligned with the codebase, rewrite it entirely while preserving the overall style and tone

### Phase 4: Apply Updates

Update each file following these rules:

1. **Preserve language consistency**: Each doc must stay in its original language — detect the language from existing content and maintain it
2. **Keep technical terms in English**: Even in non-English docs, keep technical terms (library names, CLI commands, env variable names, class/function names, config keys) in English
3. **Sync content across localized versions**: All language variants of the same doc should contain equivalent information — no version should have extra or missing sections compared to others
4. **Preserve formatting style**: Match the existing markdown style (badge format, heading levels, emoji usage, table style, etc.)
5. **Update version numbers precisely**: Use exact versions from the project's dependency manifest, not approximations
6. **For AI instruction files** (CLAUDE.md, GEMINI.md, copilot-instructions.md, AGENTS.md): Update everything as needed — both project-specific facts and behavioral instructions can be modified to match current codebase reality

### Phase 5: Verification

After all updates:

1. Confirm all target files that exist have been reviewed
2. Verify version numbers are consistent across all docs
3. Check that no localized doc has missing sections vs others
4. Ensure no placeholder text or investigation notes leaked into final docs

## Important Notes

- Do NOT create files that don't already exist — only update existing ones
- If a target file doesn't exist in the repo, simply skip it
- When unsure about a feature or config, check the actual code rather than guessing
- The Agent Team (Explore subagents) should be used for read-only investigation only
- **Final report must be in Traditional Chinese** (繁體中文), with technical terms kept in English
