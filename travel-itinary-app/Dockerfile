# Use Node.js 20 LTS with slim variant for smaller size
FROM node:20-bullseye-slim

# Create app directory
WORKDIR /app

# Copy package files first (better Docker layer caching)
COPY package*.json ./

# Install dependencies
RUN npm install && npm cache clean --force && npm install --save-dev jest

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Start the development server
CMD ["npm","start"]
