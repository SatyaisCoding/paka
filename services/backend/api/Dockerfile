# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/
COPY prisma.config.ts ./

# Install all dependencies
RUN npm ci

# Copy source code
COPY . .

# Generate Prisma client (outputs to src/lib/generated/prisma)
# Provide dummy URL for generation (not used at runtime)
RUN DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy" npx prisma generate

# Build TypeScript
RUN npm run build

# Production stage
FROM node:22-alpine AS runner

WORKDIR /app

# Copy package files and install production dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy Prisma files
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./

# Copy built files
COPY --from=builder /app/dist ./dist

# Copy generated Prisma client to dist folder (where compiled JS expects it)
COPY --from=builder /app/src/lib/generated ./dist/lib/generated

# Copy runtime dependencies from builder
COPY --from=builder /app/node_modules/@prisma/adapter-pg ./node_modules/@prisma/adapter-pg

# Expose port
EXPOSE 3000

# Start the server
CMD ["node", "dist/server.js"]

