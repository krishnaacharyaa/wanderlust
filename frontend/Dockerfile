from node:21

workdir /app

copy . .

run npm i

copy .env.sample .env.local

expose 5173

cmd ["npm", "run", "dev", "--", "--host"]
