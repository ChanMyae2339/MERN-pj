# Use the official lightweight Node.js Alpine image
FROM node:22-alpine

# Set Node environment to production for optimized performance
ENV NODE_ENV=production

# Set the working directory inside the container
WORKDIR /app

# Change ownership of the working directory to the non-root 'node' user
RUN chown -R node:node /app

# Switch to the non-root 'node' user for better security
USER node

# Copy package.json and package-lock.json first to leverage Docker cache
COPY --chown=node:node package*.json ./

# Install exact production dependencies securely and quickly
RUN npm ci --only=production

# Copy the rest of the application source code
COPY --chown=node:node . .

# Expose the port your backend runs on (e.g., 4000)
EXPOSE 4000

# Start the Node.js application
CMD ["node", "server.js"]