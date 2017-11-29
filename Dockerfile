FROM node:carbon

RUN mkdir -p  /opt/app
WORKDIR /opt/app

RUN mkdir ~/.npm-global
RUN npm config set prefix '~/.npm-global'
RUN export PATH=~/.npm-global/bin:$PATH
# RUN source ~/.profile
RUN npm install -g jshint

# RUN npm install -g @angular/cli@1.3.0

# COPY package.json .

# RUN npm install --save @angular/cli@1.3.0

# RUN npm install --only=production

# COPY .angular-cli.json .
# COPY . .

# RUN ng build --aot -prod

# ENV APP_ID setYourAppId
# ENV MASTER_KEY setYourMasterKey
# ENV DATABASE_URI setMongoDBURI

# EXPOSE 1337

CMD ["npm", "start"]
