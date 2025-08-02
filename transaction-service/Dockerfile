# base image
FROM node:20

WORKDIR /app

# Copy package files first
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy Prisma schema
COPY prisma ./prisma

# Copy the rest of your code
COPY . .

# Generate Prisma Client
# RUN npx prisma generate

# Start app
CMD ["npm", "start"]