FROM node:10.9-alpine

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

COPY . .

RUN npm install -g -s --no-progress yarn && \
  yarn && \
  yarn cache clean

CMD [ "yarn", "start" ]

EXPOSE 8080
