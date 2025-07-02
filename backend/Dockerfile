from node:21

workdir /app

copy . .

run npm i
copy .env.sample .env


expose 8080

cmd ["npm", "start"]
