# Use the nginx base image
FROM nginx:alpine as base

# Copy the nginx configuration file to the container
COPY images/configs/nginx.conf /etc/nginx/nginx.conf

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
