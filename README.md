# LinkCollect Backend

This repository contains the setup for the LinkCollect backend using TypeScript and Docker for development. Utilizing Docker makes the development process more straightforward. You can create a Docker image and test the database and backend effortlessly by running the commands provided in the makefile. The setup will generate a "mongo" folder in your repository. After signing up, you can test your endpoints.

For development purposes, creating an Nginx image is optional. The Nginx image acts as a proxy to our backend port, facilitating smoother interactions.

## Makefile Commands

To simplify the development process, we have included the following makefile commands:

- `build`: Builds the Docker containers using `docker-compose build`.
- `up`: Sets up the development environment, runs the backend using TypeScript, and creates a MongoDB container. Use `make up` to start the development environment. Use `make down` to stop the containers and `make rmi` to remove the Docker images.
- `up-prod`: Starts the production environment using `docker-compose.yml` and `docker-compose.prod.yml`.
- `down`: Stops the running containers using `docker-compose down`.
- `run`: Runs the backend using TypeScript and `ts-node`.
- `createnetwork`: Creates a Docker network with the name "example-net".
- `rmi`: Removes Docker images related to LinkCollect using `docker rmi`.
- `rmiall`: Removes all Docker images from the system.

Please use these commands to streamline your development and testing process.
