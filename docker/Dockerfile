ARG PYTHON_VERSION=3.10
FROM nikolaik/python-nodejs:python${PYTHON_VERSION}-nodejs20 AS builder
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

LABEL maintainer="Wei Lee <mai@mai0313.com>" \
    org.label-schema.name="resume" \
    org.label-schema.vendor="Wei Lee" \
    org.label-schema.schema-version="1.0" \
    com.centurylinklabs.watchtower.stop-signal="SIGINT"

########################################################################################

FROM builder AS prod
WORKDIR /app
COPY . .
RUN yarn install && \
    yarn cache clean -f

# build for runtime
FROM prod AS runtime
WORKDIR /app
COPY . .
COPY --from=prod /app/node_modules ./node_modules
RUN yarn build && \
    yarn cache clean -f
