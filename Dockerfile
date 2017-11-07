FROM node:8-alpine as builder

RUN apk add

RUN npm install -g @angular/cli

COPY package.json /src/package.json
RUN cd npm install

EXPOSE  8080

# CMD ["node", "/src/index.js"]

RUN ng build --prod
