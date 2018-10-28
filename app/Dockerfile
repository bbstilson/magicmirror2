FROM node:10.9-alpine

WORKDIR /app

COPY package.json yarn.lock ./

COPY . .

RUN yarn install
RUN yarn cache clean
RUN yarn build

ARG PORT=3000
EXPOSE 3000

CMD yarn serve 3000

