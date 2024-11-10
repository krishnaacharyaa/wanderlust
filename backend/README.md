# Google Console identity
proyecto de Devops auth: [Google cloud](https://console.cloud.google.com/apis/credentials?project=devops-final-1731180691822)

si no tiene permisos me avisan y los agrego luego de agregado se descargan las credenciales de ese proyecto, luego deben agregarlas en su zhsrc o bashrc dependiendo de su consola

export GOOGLE_CLIENT_ID=
export GOOGLE_CLIENT_SECRET=

# Docker

## Crear contenedores
 docker run --name mongodb -p 27017:27017 -d mongo:8.0.3-noble
 docker run -d --name redis -p 6379:6379 redis

## Tools
```bash
docker run -it \
	--name mongo-express \
	--link mongodb:mongo \
	-p 8081:8081 \
	-e ME_CONFIG_MONGODB_URL="mongodb://mongo:27017" \
	-e ME_CONFIG_OPTIONS_EDITORTHEME="ambiance" \
	-e ME_CONFIG_BASICAUTH_USERNAME="user" \
	-e ME_CONFIG_BASICAUTH_PASSWORD="pass" \
	mongo-express
```