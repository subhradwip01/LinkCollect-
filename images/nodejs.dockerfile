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

# Install PM2 globally - prod
# RUN npm i pm2 -g

# Copy source code - for prod
# COPY build/src ./src

# Copy everything
COPY  . .

# Start the app using PM2, this will be used in production
# CMD ["pm2-runtime", "start", "src/app.js", "--name", "my-app"]

# for development purpose only

FROM base as production

# Install PM2 globally - prod
RUN npm i pm2 -g


ENV NODE_PATH=./build

RUN npm run build

# CMD ["npm", "run", "dev"]
