FROM node:boron

RUN mkdir -p  /opt/app
WORKDIR /opt/app

COPY package*.json ./

RUN npm install --only=production

COPY .angular-cli.json .
COPY . .

RUN ng build --aot -prod

ENV APP_ID setYourAppId
ENV MASTER_KEY setYourMasterKey
ENV DATABASE_URI setMongoDBURI

EXPOSE 1337

CMD ["npm", "start"]
