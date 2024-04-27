#!/bin/bash

echo 'Iniciando setup do projeto...'

echo 'Aguardando conexão com banco de dados...'
wait4x tcp $POSTGRES_HOST:$POSTGRES_PORT
echo 'Conexão com banco de dados estabelecida'

npm run migrate 

npm run build 

npm run start:prod