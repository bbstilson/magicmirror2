FROM node:10.9-alpine

WORKDIR /src

COPY package.json yarn.lock ./

COPY . .

RUN npm install -g -s --no-progress yarn && \
  yarn && \
  yarn cache clean

CMD [ "yarn", "start" ]

EXPOSE 4000
