FROM node:carbon

RUN mkdir -p  /opt/app
WORKDIR /opt/app

RUN npm config get prefix
RUN chown -R $(whoami) $(npm config get prefix)/lib/node_modules

RUN npm install -g node-gyp
RUN npm install -g @angular/cli@1.3.0

COPY package.json .

RUN npm install --save @angular/cli@1.3.0

RUN npm install --only=production

COPY .angular-cli.json .
COPY . .

RUN ng build --aot -prod

ENV APP_ID setYourAppId
ENV MASTER_KEY setYourMasterKey
ENV DATABASE_URI setMongoDBURI

EXPOSE 1337

CMD ["npm", "start"]
