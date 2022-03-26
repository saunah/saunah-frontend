# build react app
FROM node:17-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm ci
COPY . ./
RUN npm run build

# setup production environment
FROM nginx:1.17
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

ENV JSFOLDER=/usr/share/nginx/html/static/js/*.js
COPY start.sh /
RUN chmod +x /start.sh
ENTRYPOINT [ "/start.sh" ]
