FROM node:boron

RUN mkdir -p  /opt/app
WORKDIR /opt/app
RUN npm install -g @angular/cli@1.3.0

RUN mkdir -p /Dashboard
RUN mkdir -p /ParseServer

COPY . .
# COPY Dashboard/package.json . /Dashboard/package.json
# COPY Dashboard/package-lock.json . /Dashboard/package-lock.json

# RUN ls
# RUN pwd

RUN cd Dashboard; npm install --only=production

# COPY Dashboard/.angular-cli.json /Dashboard/.angular-cli.json .
# COPY Dashboard /Dashboard . .

RUN cd Dashboard; ng build --aot -prod

EXPOSE 8080

CMD ["npm", "start"]
