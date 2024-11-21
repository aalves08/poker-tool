FROM node:16
WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY . .
EXPOSE 4002
CMD ["yarn", "run", "build"]