# Use the official Node.js 21 image as the base
FROM node:21

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available) separately to leverage Docker cache
COPY package*.json ./

# Upgrade npm to the latest version
RUN npm install -g npm@10.8.2

# Set an environment variable to skip Husky during Docker build
ENV HUSKY=0

# Install dependencies without running the `chmod` command
RUN npm install --ignore-scripts

# Copy the rest of the application files
COPY . .

# Copy environment variables file
COPY .env.sample .env

# Expose the application port
EXPOSE 5080

# Start the application
CMD ["npm", "start"]
