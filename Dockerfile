# Tahap 1: Build Stage
FROM node:18-alpine as build

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Tahap 2: Production Stage
FROM nginx:stable-alpine

# Copy build output to nginx html folder
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom nginx configuration (opsional)
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]