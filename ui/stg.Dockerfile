FROM node:18-alpine AS base

# Step 1. Rebuild the source code only when needed
FROM base AS builder

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json tailwind.config.ts postcss.config.js yarn.lock* package-lock.json* ./
# Omit --production flag for TypeScript devDependencies
RUN yarn --frozen-lockfile

COPY src ./src
COPY public ./public
COPY next.config.js .
COPY tsconfig.json .

# Build Next.js based on the preferred package manager
RUN yarn build

# Note: It is not necessary to add an intermediate step that does a full copy of `node_modules` here

# Step 2. Production image, copy all the files and run next
FROM base AS runner

WORKDIR /app

RUN npm install pm2 -g

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

CMD pm2 start 'node server.js' --no-daemon