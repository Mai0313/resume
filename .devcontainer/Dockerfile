ARG NODE_VERSION=20
FROM node:${NODE_VERSION}-slim AS builder

LABEL maintainer="Wei Lee <mai@mai0313.com>" \
    org.label-schema.name="resume" \
    org.label-schema.vendor="Wei Lee" \
    org.label-schema.schema-version="1.0" \
    com.centurylinklabs.watchtower.stop-signal="SIGINT"

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    ca-certificates \
    && git config --global http.sslVerify false \
    && rm -rf /var/lib/apt/lists/*

# Install yarn globally
RUN corepack enable && corepack prepare yarn@stable --activate

# Install zsh and related tools
RUN apt-get update && apt-get install -y \
    zsh \
    vim \
    wget \
    fontconfig \
    && rm -rf /var/lib/apt/lists/*

# Install Meslo Nerd Font for powerlevel10k
RUN mkdir -p "/usr/local/share/fonts/meslo" && \
    wget -O "/usr/local/share/fonts/meslo/MesloLGS NF Regular.ttf" "https://github.com/romkatv/dotfiles-public/raw/master/.local/share/fonts/NerdFonts/MesloLGS%20NF%20Regular.ttf" && \
    wget -O "/usr/local/share/fonts/meslo/MesloLGS NF Bold.ttf" "https://github.com/romkatv/dotfiles-public/raw/master/.local/share/fonts/NerdFonts/MesloLGS%20NF%20Bold.ttf" && \
    wget -O "/usr/local/share/fonts/meslo/MesloLGS NF Italic.ttf" "https://github.com/romkatv/dotfiles-public/raw/master/.local/share/fonts/NerdFonts/MesloLGS%20NF%20Italic.ttf" && \
    wget -O "/usr/local/share/fonts/meslo/MesloLGS NF Bold Italic.ttf" "https://github.com/romkatv/dotfiles-public/raw/master/.local/share/fonts/NerdFonts/MesloLGS%20NF%20Bold%20Italic.ttf" && \
    fc-cache -fv

# Install oh-my-zsh
RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended

# Install powerlevel10k theme
RUN git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/themes/powerlevel10k

# Install zsh plugins
RUN git clone --depth=1 https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions && \
    git clone --depth=1 https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting && \
    git clone --depth=1 https://github.com/agkozak/zsh-z ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-z

# Configure .zshrc
RUN sed -i 's|^ZSH_THEME=.*$|ZSH_THEME="powerlevel10k/powerlevel10k"|' $HOME/.zshrc && \
    sed -i 's|^plugins=(.*)$|plugins=(git zsh-autosuggestions zsh-syntax-highlighting zsh-z)|' $HOME/.zshrc && \
    sed -i 's|^# ZSH_CUSTOM=.*$|ZSH_CUSTOM=$HOME/.oh-my-zsh/custom|' $HOME/.zshrc && \
    sed -i 's|^# export PATH=\$HOME/bin:\$HOME/.local/bin:/usr/local/bin:\$PATH$|export PATH=$HOME/bin:$HOME/.local/bin:/usr/local/bin:$PATH|' $HOME/.zshrc

# Set zsh as default shell
RUN chsh -s $(which zsh)

# Set working directory
WORKDIR /workspace
