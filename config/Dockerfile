FROM sitespeedio/node:ubuntu-18.04-nodejs10.15.3

ENV NODE_PORT 3000

COPY package.json .

RUN npm install

COPY src src

COPY sql/init.sql .
COPY app.js .

EXPOSE 3000
EXPOSE 3306
