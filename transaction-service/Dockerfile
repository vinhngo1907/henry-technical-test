FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

RUN npx prisma generate

COPY . .

ENV NODE_ENV=production

EXPOSE 3002

CMD [ "npm", "run", "start" ]