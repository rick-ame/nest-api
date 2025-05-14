# Step: build
FROM node:22-alpine AS builder
RUN npm i -g pnpm@10.11

WORKDIR /app

COPY package.json pnpm-lock.yaml* .npmrc* ./

RUN pnpm install --frozen-lockfile

COPY . .

ENV ENABLE_SWAGGER=1

RUN pnpm prisma generate && \
  pnpm build

# Step: prod
FROM node:22-alpine
RUN npm i -g pnpm@10.11

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/prisma ./prisma

RUN pnpm install --prod --frozen-lockfile && \
  pnpm prisma generate

# add user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=30s --start-period=30s --retries=3 \
  CMD curl -f http://localhost:3000/ || exit 1

CMD ["node", "dist/main.js"]
