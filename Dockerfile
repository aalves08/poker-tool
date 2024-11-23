# Build stage
FROM node:16 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Inject environment variables into the build process
ARG VUE_APP_SERVER_URL
ARG VUE_APP_GITHUB_CLIENT_ID
ARG VUE_APP_GITHUB_CALLBACK_URL

# Debug echo
# RUN echo "VUE_APP_SERVER_URL=$VUE_APP_SERVER_URL"

# RUN npm run build -- --mode production

# You cannot save a variable for later use in other Dockerfile commands (if that is your intention). This is because each RUN happens in a new shell.
# https://stackoverflow.com/a/34215313
# RUN /bin/bash -c 'echo "VUE_APP_SERVER_URL=${$VUE_APP_SERVER_URL}" > .env && echo "VUE_APP_GITHUB_CLIENT_ID=${$VUE_APP_GITHUB_CLIENT_ID}" >> .env && echo "VUE_APP_GITHUB_CALLBACK_URL=$VUE_APP_GITHUB_CALLBACK_URL" >> .env && set -a && source .env && cat .env && npm run build -- --mode production'

RUN export VUE_APP_SERVER_URL=$VUE_APP_SERVER_URL && VUE_APP_GITHUB_CLIENT_ID=$VUE_APP_GITHUB_CLIENT_ID && VUE_APP_GITHUB_CALLBACK_URL=$VUE_APP_GITHUB_CALLBACK_URL && npm run build -- --mode production

# Serve stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 92
CMD ["nginx", "-g", "daemon off;"]