# Build stage
FROM node:16 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# # Inject environment variables into the build process
# ARG VUE_APP_API_TOKEN
# ARG VUE_APP_SERVER_URL
# ARG VUE_APP_GITHUB_CLIENT_ID
# ARG VUE_APP_GITHUB_CLIENT_SECRET
# ARG VUE_APP_GITHUB_CALLBACK_URL

# # Debug echo
# RUN echo "VUE_APP_SERVER_URL=$VUE_APP_SERVER_URL"

# RUN echo "VUE_APP_API_TOKEN=$VUE_APP_API_TOKEN" > .env && \
#     echo "VUE_APP_SERVER_URL=$VUE_APP_SERVER_URL" >> .env && \
#     echo "VUE_APP_GITHUB_CLIENT_ID=$VUE_APP_GITHUB_CLIENT_ID" >> .env && \
#     echo "VUE_APP_GITHUB_CLIENT_SECRET=$VUE_APP_GITHUB_CLIENT_SECRET" >> .env && \
#     echo "VUE_APP_GITHUB_CALLBACK_URL=$VUE_APP_GITHUB_CALLBACK_URL" >> .env


# RUN echo "bananas bananas bananas bananas bananas "

# RUN ls -la .env

# RUN echo "bananas bananas bananas bananas bananas "
# RUN echo "bananas bananas bananas bananas bananas "
# RUN echo "bananas bananas bananas bananas bananas "

# RUN /bin/bash -c "set -a && source .env && npm run build -- --mode production"

RUN npm run build -- --mode production

# Serve stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY --from=builder /app/run.sh /run.sh
EXPOSE 92

CMD ["/run.sh"]