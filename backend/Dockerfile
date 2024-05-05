FROM node:21

WORKDIR /add

COPY . .

RUN npm i

COPY .env.sample .env

EXPOSE 5000

CMD ["npm", "start"]
