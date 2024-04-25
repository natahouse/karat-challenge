FROM node:18-alpine as builder

RUN apk add wait4x

ENV NODE_ENV build

USER node
WORKDIR /home/node

COPY package*.json ./
RUN npm ci

COPY --chown=node:node . .
RUN npm run build

ENV NODE_ENV production

CMD ["sh", "./init.sh"]
