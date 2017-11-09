FROM node:boron

RUN mkdir -p  /opt/app
WORKDIR /opt/app
RUN npm install -g @angular/cli@1.3.0

COPY package.json .
COPY package-lock.json .

RUN npm install --only=production

COPY .angular-cli.json .
COPY . .

RUN ls
RUN cd src; ls
RUN ng build --aot -prod

EXPOSE 8080

CMD ["npm", "start"]
