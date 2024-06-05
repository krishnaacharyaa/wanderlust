#stage 1
FROM node:21 as frontend

WORKDIR /app

COPY . .

RUN npm install

#stage 2
FROM node:21-slim as nodeapp

WORKDIR /app

COPY --from=frontend /app .

COPY .env.sample .env.local

RUN npm run build

#stage 3 NGINX

FROM nginx

WORKDIR /usr/share/nginx/nimbusfusion.line.pm/html

RUN rm -rf /etc/nginx/conf.d/*

COPY nimbusfusion.line.pm.conf /etc/nginx/conf.d/

RUN rm -rf ./*

EXPOSE 5173

EXPOSE 443

COPY --from=nodeapp /app/dist .

ENTRYPOINT [ "nginx","-g","daemon off;" ]
