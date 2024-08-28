
# ------------------- Stage 1: Build Stage ------------------------------
# Use the official Node.js 21 image as the base for building
FROM node:21 AS frontend-builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available) separately to leverage Docker cache
COPY package*.json ./

# Increase memory limit for Node.js during dependency installation
RUN node --max-old-space-size=4096 /usr/local/bin/npm install

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

# Copy environment variables for the Docker environment
COPY .env.docker .env.local

# Expose the port for the Node.js application
EXPOSE 5173

# Define the default command to run the application in development mode
CMD ["npm", "run", "dev", "--", "--host"]
