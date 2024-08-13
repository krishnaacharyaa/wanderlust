# Stage 1: Build the application
FROM node:21 AS backend-builder

# Setup the working directory
WORKDIR /app

# Copy package.json and package-lock.json separately for better caching
COPY package*.json ./

# Install dependencies
RUN npm ci --no-optional

# Copy the rest of the source code to the container
COPY . .

# Run tests (if applicable)
RUN npm run test

# Stage 2: Create a slim production image
FROM node:21-slim

# Set the working directory in the container
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=backend-builder /app .

# Ensure production environment variables are set correctly
COPY .env.docker .env

# Install production dependencies only
RUN npm ci --only=production

# Expose the application port
EXPOSE 5080

# Run the application as a non-root user for security
RUN useradd --no-log-init --user-group --create-home --shell /bin/bash appuser
USER appuser

# Start the application
CMD ["npm", "start"]
