#! /bin/bash

# Colores para mensajes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Variables
BACKEND_DIR="backend"
BACKEND_ENV_DIR="./backend/.env"
FRONTEND_DIR="frontend"
FRONTEND_ENV_DIR="./frontend/.env"
REDIS="redis"
MONGO_DB="mongodb"
MONGO_EXPRESS="mongo-express"

BACKEND_PORT=8080
MONGODB_URI="mongodb://127.0.0.1/wanderlust"
REDIS_URL="redis://127.0.0.1:6379"
FRONTEND_URL=http://localhost:5173
BACKEND_URL=http://localhost:8080
ACCESS_COOKIE_MAXAGE=120000
ACCESS_TOKEN_EXPIRES_IN='120s'
REFRESH_COOKIE_MAXAGE=120000
REFRESH_TOKEN_EXPIRES_IN='120s'
JWT_SECRET=70dd8b38486eee723ce2505f6db06f1ee503fde5eb06fc04687191a0ed665f3f98776902d2c89f6b993b1c579a87fedaf584c693a106f7cbf16e8b4e67e9d6df
NODE_ENV=Development
GOOGLE_CLIENT_ID=30628847356-3j14qkcetnk8tp9khl3s5tpkiccc266g.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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

# Creando archivo de logs
mkdir -p logs
mkdir -p logs/docker
LOG_NAME_FILE=$(date -u +"%Y-%m-%dT%H:%M:%SZ")-logs.txt
LOG_PATH=logs/$LOG_NAME_FILE
touch $LOG_PATH

# Definiendo metodos utilitarios
dedent() {
    local -n reference="$1"
    reference="$(echo "$reference" | sed 's/^[[:space:]]*//')"
}

log_multi() {
    dedent $1
    printf "$1"
}

write_log() {
    local timestamp=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
    echo "$timestamp - ${message}" >>$LOG_PATH
}

print_message() {
    local color=$1
    local message=$2
    write_log
    local timestamp=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
    echo -e "${timestamp} - ${color}${message}${NC}"
}

check_installed_tools() {
    if command -v $1 &>/dev/null; then
        print_message $GREEN "$1 está instalado."
    else
        print_message $RED "$1 no está instalado. Por favor, instale $1 e intente nuevamente."
        exit 1
    fi
}

# Chequear herramientas para el script

print_message $YELLOW "Revisando herramientas"
check_installed_tools jq
check_installed_tools docker
check_installed_tools node

# Instalar dependencias
npm run installer

# Eliminar contendores
for CONTAINER_NAME in $REDIS $MONGO_DB $MONGO_EXPRESS; do
    if [ $(docker ps -q -a --filter "name=$CONTAINER_NAME" 2>/dev/null) ]; then
        print_message $GREEN "Ya existe el contendor: $CONTAINER_NAME"
    else
        print_message $GREEN "Creando contenedor $CONTAINER_NAME"
        if [ $CONTAINER_NAME == $MONGO_DB ]; then
            docker run --name mongodb -p 27017:27017 -d mongo:8.0.3-noble
        elif [ $CONTAINER_NAME == $MONGO_EXPRESS ]; then
            docker run -d \
                --name mongo-express \
                --link mongodb:mongo \
                -p 8081:8081 \
                -e ME_CONFIG_MONGODB_URL="mongodb://mongo:27017" \
                -e ME_CONFIG_OPTIONS_EDITORTHEME="ambiance" \
                -e ME_CONFIG_BASICAUTH_USERNAME="user" \
                -e ME_CONFIG_BASICAUTH_PASSWORD="pass" \
                mongo-express
            print_message $YELLOW "Auth para mongo express => User: user - password: pass"
        else
            docker run -d --name redis -p 6379:6379 redis
        fi
    fi
done

# Instalar typescript globalmente
if [[ ! -n $(tsc -v) ]]; then
    print_message $GREEN "Instalando typescript globalmente"
    npm i -g typescript
fi

# Compilar backend
if [ -f "$BACKEND_DIR/dist" ]; then
    print_message $GREEN "Eliminando carpeta dist"
    rm $BACKEND_DIR/dist
fi

print_message $YELLOW "Compilando Backend"
cd $BACKEND_DIR
npm run build
cd ..

# Agregando variables de ambiente backend
print_message $YELLOW "Agregando credenciales backend"
rm $BACKEND_ENV_DIR
cat <<EOF >>"$BACKEND_ENV_DIR"
PORT=$BACKEND_PORT
MONGODB_URI=$MONGODB_URI
REDIS_URL=$REDIS_URL
FRONTEND_URL=$FRONTEND_URL
BACKEND_URL=$BACKEND_URL
ACCESS_COOKIE_MAXAGE=$ACCESS_COOKIE_MAXAGE
ACCESS_TOKEN_EXPIRES_IN=$ACCESS_TOKEN_EXPIRES_IN
REFRESH_COOKIE_MAXAGE=$REFRESH_COOKIE_MAXAGE
REFRESH_TOKEN_EXPIRES_IN=$REFRESH_TOKEN_EXPIRES_IN
JWT_SECRET=$JWT_SECRET
NODE_ENV=$NODE_ENV
GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=$GOOGLE_CLIENT_SECRET
EOF

# Agregando variables de ambiente frontend
print_message $YELLOW "Agregando variables de ambiente frontend"
rm $FRONTEND_ENV_DIR
cat <<EOF >>"$FRONTEND_ENV_DIR"
echo "VITE_API_PATH=$BACKEND_URL" >>"$FRONTEND_ENV_DIR"
EOF

npm run start
