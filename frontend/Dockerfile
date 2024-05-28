FROM node:21 as frontend-builder

WORKDIR /app

COPY . .

RUN npm i

FROM node:alpine 

WORKDIR /app

COPY --from=frontend-builder /app .

COPY  .env.sample .env.local

EXPOSE 5173:5173

CMD ["npm","run","dev","--","--host"]
