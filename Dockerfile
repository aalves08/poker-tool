FROM node:16
WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn run build
EXPOSE 4002
# CMD ["yarn", "run", "serve"]