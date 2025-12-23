# Step 1: Base image to reuse across stages
FROM node:20-alpine AS base

# Step 2: Builder Stage
FROM base AS builder
WORKDIR /app
COPY package.json package-lock.json ./

# 'npm ci' is faster and more reliable than 'npm install' for builds
RUN npm ci

COPY . .

# Build with secrets
# Note: Ensure your secret is actually named "env" in your docker build command
RUN --mount=type=secret,id=env,dst=/run/secrets/.env \
    export $(cat /run/secrets/.env | xargs) && \
    npm run build

# Step 3: Production Runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Create a non-root user for security (optional but recommended)
# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs

# --- OPTIMIZATION START ---
# Instead of copying the huge node_modules, we only copy the standalone folder
# Next.js standalone folder includes strictly necessary node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
# --- OPTIMIZATION END ---

EXPOSE 3000

# 'node server.js' is lighter than 'npm start'
CMD ["node", "server.js"]