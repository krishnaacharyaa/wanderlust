FROM node:21 as backend-builder

WORKDIR /app

COPY . .

RUN npm i 

FROM node:alpine

WORKDIR /app

COPY --from=backend-builder /app .

COPY .env.sample .env

EXPOSE 5000

CMD ["npm","start"]
