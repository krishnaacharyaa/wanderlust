# Use Node.js 21 as the base image
FROM node:21

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json first for better caching
COPY package*.json ./

# Increase memory limit for Node.js and install dependencies
RUN node --max-old-space-size=4096 /usr/local/bin/npm install

# Copy the rest of the application code
COPY . .

# Copy environment sample file
COPY .env.sample .env.local

# Expose the port the app runs on
EXPOSE 5173

# Command to run the app
CMD ["npm", "run", "dev", "--", "--host"]
