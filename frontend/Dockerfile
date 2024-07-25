#-------Stage 1 Start------
# Base Image
FROM node:22 AS Frontend

#Setup Working Directory
WORKDIR /app

#Copy Code
COPY package*.json ./

#Package Install
RUN npm i

COPY . .

#--------Stage 1 Complete-------
#--------Stage 2 Start---------
    
FROM node:22-slim

WORKDIR /app

COPY --from=Frontend /app .

COPY .env.sample .env.local

EXPOSE 5173

CMD ["npm","run","dev","--","--host"]
