FROM node:14 as build
WORKDIR /app
COPY . .
RUN npm install && npm run build