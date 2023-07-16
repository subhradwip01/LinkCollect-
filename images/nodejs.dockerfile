FROM node:18

# Install git
RUN apt-get update && apt-get install -y git

# Install PM2 globally
RUN npm install -g pm2

# Set the working directory
WORKDIR /app

# Copy the .env file
COPY .env /app/LinkCollect-/.env

# Clone the repository
RUN git clone https://github.com/linkcollect/LinkCollect-.git

# Change to the repository directory
WORKDIR /app/LinkCollect-

# Install dependencies
RUN npm install

# Start the backend
CMD ["npm", "start"]

# Stage 3: Start the Node.js backend with PM2
CMD ["pm2-runtime", "npm", "--", "run", "dev"]
