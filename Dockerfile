FROM node:alpine AS builder

WORKDIR /build

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM alpine:latest

WORKDIR /app

COPY package*.json ./
COPY --from=builder ./build/dist ./dist
COPY --from=builder ./build/node_modules ./node_modules

RUN apk add --update nodejs npm

EXPOSE 5000

CMD ["npm", "run", "start"]