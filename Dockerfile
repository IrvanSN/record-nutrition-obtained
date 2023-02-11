FROM node:16.16-alpine

WORKDIR /server

COPY package.json /server
COPY package-lock.json /server

RUN npm ci

COPY . /server

EXPOSE 3030

CMD ["node", "./bin/www"]
