FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# RUN npm run build
EXPOSE 4002
CMD ["npm", "run", "build"]