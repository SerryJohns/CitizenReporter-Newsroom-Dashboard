FROM node:8-alpine as builder

RUN apk add

RUN npm install -g @angular/cli

COPY package.json /src/package.json
RUN cd /src; npm install

COPY . /src

EXPOSE  8080

# CMD ["node", "/src/index.js"]

RUN ng build --prod
