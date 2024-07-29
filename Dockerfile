FROM node:20.16.0

WORKDIR /home/node/app

COPY package*.json .

RUN npm install

CMD ["npx", "@angular/cli", "serve", "--host=0.0.0.0"]
