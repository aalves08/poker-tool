FROM node:16 as build
WORKDIR /app
COPY . .
RUN npm install && npm run build