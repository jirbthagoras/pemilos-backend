FROM node:slim AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:slim

WORKDIR /build

COPY package*.json ./
COPY --from=builder ./app/dist ./dist

RUN npm install --omit=dev

EXPOSE 5000

CMD ["npm", "run", "start"]