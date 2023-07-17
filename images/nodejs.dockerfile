# Base stage
FROM node:alpine as base

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Copy .env file
COPY .env ./

# Install dependencies
RUN npm i 

# Install PM2 globally
RUN npm i pm2 -g

# Copy source code
COPY build/src ./src

# Start the app using PM2
CMD ["pm2-runtime", "start", "src/app.js", "--name", "my-app"]
