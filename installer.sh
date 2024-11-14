#! /bin/bash

# Colores para mensajes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Variable
BACKEND_DIR="backend"
FRONTEND_DIR="frontend"
REDIS="redis"
MONGO_DB="mongodb"
MONGO_EXPRESS="mongo-express"
ENVIRONMENT="sample"

# Creando archivo de logs
mkdir -p logs
mkdir -p logs/docker
LOG_NAME_FILE=$( date -u +"%Y-%m-%dT%H:%M:%SZ" )-logs.txt
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

write_log(){
    local timestamp=$( date -u +"%Y-%m-%dT%H:%M:%SZ" )
    echo "$timestamp - ${message}" >> $LOG_PATH
}

print_message() {
    local color=$1
    local message=$2
    write_log 
    local timestamp=$( date -u +"%Y-%m-%dT%H:%M:%SZ" )
    echo -e "${timestamp} - ${color}${message}${NC}"
}

check_installed_tools(){
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

# A. Instalar dependencias
npm run installer

# B. Crear contenedores

# B1. Eliminar contendores
for CONTAINER_NAME in $REDIS $MONGO_DB $MONGO_EXPRESS
do
    if [ $(docker ps -q -a --filter "name=$CONTAINER_NAME" 2> /dev/null) ]; then
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


# C. instalar typescript globalmente
if [[ ! -n $( tsc -v ) ]]; then
    print_message $GREEN "Instalando typescript globalmente"
    npm i -g typescript
fi

# D. Compilar backend
if [ -f "$BACKEND_DIR/dist" ]; then 
    print_message $GREEN "Eliminando carpeta dist"
    rm $BACKEND_DIR/dist
fi

print_message $YELLOW "Compilando Backend"
cd $BACKEND_DIR
npm run build
cd ..

# E. Configuracion de ambiente
NODE_ENV_DEFAULT="sample"
read -p "Cual ambiente desea configurar NODE_ENV [production/development/sample]: " ENVIRONMENT
ENVIRONMENT="${ENVIRONMENT:-$NODE_ENV_DEFAULT}"
print_message $GREEN "Ambiente Seleccionado -> $ENVIRONMENT"
export NODE_ENV=$ENVIRONMENT

# F. Configuracion de credenciales
print_message $YELLOW "GOOGLE_CLIENT_ID -> $GOOGLE_CLIENT_ID"
LACK_CREDS=false
if [ -z "$GOOGLE_CLIENT_ID" ] | [  -z "$GOOGLE_CLIENT_SECRET" ]; then
    print_message $RED "Faltan credenciales"
    log_multi "
        para conseguir estos tokens ingrese a https://console.cloud.google.com/apis/credentials?project=devops-final-1731180691822
        ** si no tiene permisos me avisan y los agrego luego de agregado se descargan las credenciales de identity de ese proyecto
    "
    LACK_CREDS=true
    sudo -v
fi 

if [ -z "$GOOGLE_CLIENT_ID" ]; then
    read -e -p "GOOGLE_CLIENT_ID=" GOOGLE_CLIENT_ID_TOKEN
    export GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID_TOKEN
    echo "export GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID_TOKEN" >> ~/.bashrc
    echo "export GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID_TOKEN" >> ~/.zshrc
fi

if [ -z "$GOOGLE_CLIENT_SECRET" ]; then
    read -e -p "GOOGLE_CLIENT_SECRET=" GOOGLE_CLIENT_SECRET_TOKEN
    export GOOGLE_CLIENT_SECRET=$GOOGLE_CLIENT_SECRET_TOKEN
    echo "export GOOGLE_CLIENT_SECRET=$GOOGLE_CLIENT_SECRET_TOKEN" >> ~/.bashrc
    echo "export GOOGLE_CLIENT_SECRET=$GOOGLE_CLIENT_SECRET_TOKEN" >> ~/.zshrc
    print_message $GREEN "Credenciales exportadas correctamente"
fi

if [ "$LACK_CREDS" = true ]; then
    print_message $GREEN "todo listo ahora puede ejecutar => npm run start"
    sleep 3
    source ~/.bashrc
    exec /bin/zsh
fi
sleep 3
npm run start
