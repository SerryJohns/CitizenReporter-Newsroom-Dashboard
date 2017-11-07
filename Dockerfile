FROM node:8.4.0

RUN mkdir -p /opt/app
WORKDIR /opt/app
RUN npm install -g @angular/cli

COPY package.json ./package.json
RUN npm install

COPY src ./src/
COPY e2e ./e2e/
COPY angular-cli.json ./angular-cli.json
COPY protractor.conf.js ./protractor.conf.js
COPY karma.conf.js ./karma.conf.js
COPY tslint.json ./tslint.json

RUN ng build --prod
