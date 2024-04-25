FROM node:18-alpine as builder

RUN apk add wait4x

USER node
WORKDIR /home/node

COPY package*.json ./
RUN npm ci

COPY --chown=node:node . .
RUN npm run build

CMD ["sh", "./init.sh"]
