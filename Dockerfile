FROM node:boron

WORKDIR /usr/src/app

COPY package.json
COPY package-lock.json

RUN npm install --only=production

COPY . .

EXPOSE 8080

CMD ["npm", "start"]
