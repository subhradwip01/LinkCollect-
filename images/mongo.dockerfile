FROM mongo:latest as base

# Add custom configuration if needed
# COPY mongod.conf /etc/mongod.conf

# Expose MongoDB default port
EXPOSE 27017

# Start MongoDB
CMD ["mongod", "--bind_ip_all"]
