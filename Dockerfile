# ---------------------------------------
# Etapa 1: Base - Instalar dependencias
# ---------------------------------------
FROM node:25-alpine AS base

# Instalar libc6-compat (necesario para alpine)
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copiar archivos de dependencias
COPY package.json package-lock.json* ./

# Instalar dependencias
RUN npm ci

# ---------------------------------------
# Etapa 2: Builder - Construir la app
# ---------------------------------------
FROM base AS builder
WORKDIR /app
COPY --from=base /app/node_modules ./node_modules
COPY . .

# Desactivar telemetría de Next.js
ENV NEXT_TELEMETRY_DISABLED 1

# Construir el proyecto
RUN npm run build

# ---------------------------------------
# Etapa 3: Runner - Imagen final
# ---------------------------------------
FROM node:25-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3010

ENV PORT 3010

CMD ["node", "server.js"]
