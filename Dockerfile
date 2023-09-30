FROM node:latest AS build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM httpd:latest as production
COPY --from=build /app/dist/ /usr/local/apache2/htdocs
COPY --from=build /app/scanner-privateKey.key /usr/local/apache2/conf/server.key
COPY --from=build /app/scanner.crt /usr/local/apache2/conf/server.crt

RUN sed -i \
		-e 's/^#\(Include .*httpd-ssl.conf\)/\1/' \
		-e 's/^#\(LoadModule .*mod_ssl.so\)/\1/' \
		-e 's/^#\(LoadModule .*mod_socache_shmcb.so\)/\1/' \
		conf/httpd.conf \

EXPOSE 80
EXPOSE 443