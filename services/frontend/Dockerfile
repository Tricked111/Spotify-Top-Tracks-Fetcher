# ==== CONFIGURE =====
FROM node:17-alpine as builder
# Set the working directory to /app inside the container
WORKDIR /app

COPY package.json .

# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm install --legacy-peer-deps

# Copy app files
COPY . .
# ==== BUILD =====
# Build the app
RUN npm run build
# ==== RUN =======
# Set the env to "production"
ENV NODE_ENV production
# Expose the port on which the app will be running (3000 is the default that `serve` uses)
EXPOSE 3000
# Start the app
CMD [ "npm", "start"]