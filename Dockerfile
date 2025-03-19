# Stage 1: Build Stage
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock / pnpm-lock.yaml)
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install --frozen-lockfile

# Copy the rest of the application files
COPY . .

# Build the Next.js app
RUN npm run build

# Stage 2: Production Stage
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy only the built application and node_modules from the builder stage
COPY --from=builder /app/.next .next
COPY --from=builder /app/public public
COPY --from=builder /app/package.json package.json
COPY --from=builder /app/node_modules node_modules

# Expose port 3000
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "run", "start"]
