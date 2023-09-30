FROM node:latest AS build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM httpd:latest as production
COPY --from=build /app/dist/ /usr/local/apache2/htdocs
EXPOSE 80