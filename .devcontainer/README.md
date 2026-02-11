# Dev Container for Resume Project

This directory contains configuration files for developing this project in a fully reproducible environment using [VS Code Dev Containers](https://code.visualstudio.com/docs/devcontainers/containers).

## What's Included?

- **Base Image**: [nikolaik/python-nodejs](https://github.com/nikolaik/docker-python-nodejs) with **Python 3.11** and **Node.js 22**.
- **Tools**:
  - **uv**: Fast Python package installer and resolver.
  - **Yarn**: Enabled via Corepack for managing Node.js dependencies.
  - **Zsh & Oh My Zsh**: Configured with the [Powerlevel10k](https://github.com/romkatv/powerlevel10k) theme.
  - **Zsh Plugins**: `zsh-autosuggestions`, `zsh-syntax-highlighting`, `zsh-z`.
- **VS Code Configuration**:
  - **Extensions**: A comprehensive set of extensions for Python, Jupyter, Go, Rust, C++, Docker, and more.
  - **Terminal**: Zsh configured as the default shell.
  - **Mounts**: Automatically mounts your local `.gitconfig`, `.ssh`, and `.p10k.zsh` for a seamless experience.
  - **Auto-setup**: Runs `yarn install` on container creation to install project dependencies.

## Usage

1. **Prerequisites**: Install [Docker Desktop](https://www.docker.com/products/docker-desktop) and [VS Code](https://code.visualstudio.com/).
2. **Open in VS Code**: Open this project folder in VS Code.
3. **Reopen in Container**:
   - You should see a notification to "Reopen in Container".
   - Alternatively, open the Command Palette (`F1` or `Ctrl+Shift+P`) and run `Dev Containers: Reopen in Container`.
4. **Wait for Build**: The first time you open the dev container, it will build the Docker image and install extensions. This may take a few minutes.

## Customization

- **Dockerfile**: Modify `.devcontainer/Dockerfile` to add system packages or change the base image version.
- **devcontainer.json**:
  - Add/remove VS Code extensions in the `customizations.vscode.extensions` list.
  - Adjust `mounts` if you need to pass additional local configuration files.

## Troubleshooting

- **SSH Keys**: The container mounts `~/.ssh` by default. Ensure your local SSH agent is running if you use passphrase-protected keys.
- **Zsh Theme**: The container mounts `~/.p10k.zsh`. If you don't have this file locally, you might see a configuration wizard or default styling.
