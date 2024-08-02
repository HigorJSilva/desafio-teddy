
  

# Desafio Teddy

  

## Pré-requisitos

  

- [Docker](https://www.docker.com/get-started)

- [Docker Compose](https://docs.docker.com/compose/install/)

  

## Configuração do Projeto

  

### Clonando o Repositório

  

```bash

git  clone  https://github.com/HigorJSilva/desafio-teddy

cd  desafio-teddy

```

  

### Configurando o Ambiente

  

Copie o arquivo `.env.example` para `.env` e ajuste as configurações conforme necessário.

  

```bash

cp  .env.example  .env

```

### Subindo a aplicação  

```bash

 docker-compose up -d

```

### Executando Migrations

  

Para configurar o banco de dados com as tabelas execute as migrations:

```bash

docker exec -it desafio-teddy-app-1 npm run typeorm migration:run -- -d ./src/shared/database/datasource

```

## Acessando a aplicação



A aplicação estará acessível no endereço com a porta escolhida no `.env`:

```bash

http://localhost:3000/

```

### Acessando a documentação

  Crie seu usuário faça o login para acessar rotas protegidas por autorização
```bash

http://localhost:3000/api

```
