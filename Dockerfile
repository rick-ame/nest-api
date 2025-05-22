FROM node:22-alpine AS base
RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml* .npmrc* ./

# Step: build
FROM base AS build

RUN pnpm install --frozen-lockfile

COPY . .

ARG ENABLE_SWAGGER

RUN pnpm prisma generate && \
  pnpm build

# Step: prod
FROM base AS prod

RUN pnpm install --prod --frozen-lockfile

COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma

RUN pnpm prisma generate

RUN apk add --no-cache curl && \
  addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

ENV PORT=3000

EXPOSE ${PORT}

HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD curl -f http://localhost:${PORT}/health || exit 1

CMD ["node", "dist/main.js"]
