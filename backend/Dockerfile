#step 1
FROM node:21 as backend

WORKDIR /app

COPY . .

RUN npm install


#stage 2
FROM node:21-slim

WORKDIR /app

COPY --from=backend /app .

COPY .env.sample .env

EXPOSE 3010

CMD ["npm", "start"]
