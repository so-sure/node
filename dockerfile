FROM node:14

RUN mkdir -p /src

WORKDIR /src

COPY . .
RUN npm i
