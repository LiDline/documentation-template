# docker build --pull --rm -f "Dockerfile" -t website:latest "." --progress=plain

FROM node:18 AS dependencies
WORKDIR /app
COPY . ./
RUN npm install
RUN npm run build

# Сборка и запуск Nginx с Gatsby
FROM nginx:alpine
EXPOSE 80
WORKDIR /usr/share/nginx/html
# Копирование собранных файлов Gatsby
COPY --from=dependencies /app/public ./
ENTRYPOINT nginx -g "daemon off;"