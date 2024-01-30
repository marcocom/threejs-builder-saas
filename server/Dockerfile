FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 4200
CMD [ "node", "dist/index.js" ]
