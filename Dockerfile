# ── Build : installe les dépendances et compile SvelteKit ────
FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ── Runtime : Node seul, utilisateur non-root ────────────────
FROM node:22-alpine

WORKDIR /app
ENV NODE_ENV=production PORT=3000

COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./

USER node

EXPOSE 3000

CMD ["node", "build"]
