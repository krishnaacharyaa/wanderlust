#------------- stage1------------
FROM node:22 AS backend-builder

# setup the working dir
WORKDIR /app

# code
COPY . .


# package install
RUN npm i

# Test
#RUN npm run test

#-------------- stage2-------------

FROM node:22-slim

#setup the working dir
WORKDIR /app

# copy the above stage as compressed
COPY --from=backend-builder /app .

COPY .env.sample .env

#port
EXPOSE 5000

CMD ["npm", "start"]





