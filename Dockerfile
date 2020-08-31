FROM node:12.14.0-alpine3.11

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENTRYPOINT [ "sh", "/usr/src/app/.docker/entrypoint.sh"]