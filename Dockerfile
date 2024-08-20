FROM node:20.16.0 AS build

WORKDIR /home/node/app

RUN npm cache clean --force

COPY . .

RUN npm install

RUN npm install -g @angular/cli

RUN npm run build --prod


FROM nginx:1.27.1

COPY ./nginx.conf  /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

COPY --from=build /home/node/app/dist/pagila-client/browser .

CMD ["nginx", "-g", "daemon off;"]

EXPOSE 80
