FROM node:16.16-alpine

WORKDIR /server

COPY package.json /server
COPY package-lock.json /server

RUN npm ci

COPY . /server

RUN apk add -U tzdata

ENV TZ=Asia/Bangkok

CMD ["node", "./bin/www"]
