# Base stage
FROM node:18 as base

# Install git
RUN apt-get update && apt-get install -y git

RUN apt-get install -y build-essential curl
# Install PM2 globally
RUN npm install -g pm2

RUN mkdir app
# Set the working directory
WORKDIR /app
# Copy the .env file

# Clone the repository and checkout the "newTS" branch
RUN git clone https://github.com/linkcollect/LinkCollect-.git && \
    cd LinkCollect- && \
    git checkout newTs

COPY .env /app/LinkCollect-/.env
# Change to the repository directory
WORKDIR /app/LinkCollect-

# Install dependencies
RUN npm install

# Start the Node.js backend with PM2
CMD ["pm2-runtime", "npm", "--", "start"]
