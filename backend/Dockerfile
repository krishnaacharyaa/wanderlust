# ------------------- Stage 1: Build Stage ------------------------------
# Use the official Node.js 21 image as the base for building
FROM node:21 AS frontend-builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available) separately to leverage Docker cache
COPY package*.json ./

# Upgrade npm to the latest version
RUN npm install -g npm@10.8.2

# Install dependencies using npm ci for a clean, repeatable build, skipping optional dependencies
RUN npm ci --no-optional

# Copy the rest of the application files
COPY . .

# Run the build process (uncomment if applicable, e.g., using a build tool like Vite)
# RUN npm run build

# ------------------- Stage 2: Final Stage ------------------------------
# Use a slim version of Node.js 21 for the final image to reduce size
FROM node:21-slim

# Set the working directory to /app
WORKDIR /app

# Copy built assets and necessary files from the build stage
COPY --from=frontend-builder /app .

# Ensure only production dependencies are installed
RUN npm ci --only=production

# Copy environment variables for the Docker environment
COPY .env.docker .env.local

# Set a non-root user for security purposes
RUN useradd --no-log-init --user-group --create-home --shell /bin/bash appuser
USER appuser

# Expose the application port
EXPOSE 5173

# Use a healthcheck to ensure the container is running correctly
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 CMD curl -f http://localhost:5173/ || exit 1

# Define the default command to run the application in development mode
CMD ["npm", "run", "dev", "--", "--host"]
