# FROM node:16-alpine
FROM node:18-alpine

WORKDIR /app

# Install dependencies for Express server
COPY package.json package-lock.json ./
RUN npm install

# Copy Express source code
COPY . .

# Importance: Set NODE_ENV to production
ENV NODE_ENV=production

# Expose transaction service port
EXPOSE 3002

# Start server (which also serves React build from ./public)
CMD [ "npm", "run", "start" ]