FROM mongo:7.0-rc as base 

# Add custom configuration if needed
# COPY mongod.conf /etc/mongod.conf

# Start MongoDB
CMD ["mongod", "--bind_ip_all"]

FROM base as production
