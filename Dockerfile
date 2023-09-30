FROM node:latest AS build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:latest as production
COPY --from=build /app/dist/ /usr/share/nginx/html

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/scanner-privateKey.key /usr/local/apache2/conf/server.key
COPY --from=build /app/scanner.crt /usr/local/apache2/conf/server.crt

EXPOSE 80
EXPOSE 443