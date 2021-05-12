# DESAFIO BACKEND - RESIDUALL

O desafio se constitui em desenvolver uma API que valida ou consulta se um email é válido. A API foi desenvolvida em Typescript/NodeJs usando o banco de dados PostgreSQL.

## Pré-requisitos

Caso construa a aplicação usando docker será necessário:

`docker`

`docker compose`

Caso construa a aplicação manualmente será necessário:

`NodeJS`

`yarn`

`PostgreSQL`

## Configuração

Abra o arquivo `db.ts` que se encontra na pasta `src/database` e edite sua propriedade `connectionString` passando suas configurações de conexão com o banco de dados.

Caso use o docker e docker-compose, abra o arquivo `docker-compose.yml` configure os atributos abaixo.

```compose
api:
  container_name: <nome do container>
postgres:
  container_name: <nome do container>
  environment:
    POSTGRES_USER: <usuário do banco de dados>
    POSTGRES_PASSWORD: <senha>
    POSTGRES_DB: <nome do banco de dados>

pgadmin:
  container_name: <nome do container>
environment:
  PGADMIN_DEFAULT_EMAIL: <email>
  PGADMIN_DEFAULT_PASSWORD: <senha>
```

## Instalar

Apartir de agora que você já tem o app configurado, ah duas maneiras de construir essa aplicação, usando docker ou manualmente.

caso use docker basta construir a imagem executando o seguinte comando:

    docker-compose up --build -d

manualmente:

Instalando dependências:

    yarn

Compilando typescript:

    yarn build

Executando aplicação:

    yarn start

## Como usar

Exemplos de como usar a API.

### Solicitação

    /health

Essa rota retorna o status do servidor.

### Example

```JSON
    {
      "status": "OK",
      "code": 200,
      "results": [
        {
          "message": "Servidor executando na porta 8080"
        }
      ]
    }
```

### Solicitação

    /mail/validation/v1

Essa rota recebe um email e um domain no corpo da solicitação e retorna se é um email e valido caso ele termine com:

- .com.br
- .com
- .gov.br
- .org

### Corpo

```JSON
    {
      "email_address": "username@provedor.com.br",
      "domain": "mail"
    }
```

### Resposta

```JSON
{
"status": "OK",
"code": 200,
"results": [
  {
    "email_address": "username@provedor.com.br",
    "domain": "mail",
    "valid_syntax": true
  }
]
}
```

Também podendo receber um array de emails para validação.

### Corpo

```JSON
{
	"email_address": ["email@provedor.com.br", "email@provedor.coom", "email@provedor.gov.br"],
	"domain": "mail"
}
```

### Resposta

```JSON
{
  "status": "OK",
  "code": 200,
  "results": [
    {
      "email_address": "email@provedor.com.br",
      "domain": "mail",
      "valid_syntax": true
    },
    {
      "email_address": "email@provedor.coom",
      "domain": "mail",
      "valid_syntax": false
    },
    {
      "email_address": "email@provedor.gov.br",
      "domain": "mail",
      "valid_syntax": true
    }
  ]
}
```

### Solicitação

    /mail/validation/v3

Essa rota recebe um email no corpo da solicitação e retorna se é um email e valido com base na API pública EVA. Também podendo receber um array de emails para validação.

### Corpo

```JSON
{
	"email_address": ["email@provedor.com.br", "google@gmail.com.br"]
}
```

### Resposta

```JSON
{
  "status": "OK",
  "code": 200,
  "results": [
    {
      "data": {
        "email_address": "email@provedor.com.br",
        "domain": "provedor.com.br",
        "valid_syntax": true,
        "disposable": false,
        "webmail": false,
        "deliverable": false,
        "catch_all": false,
        "gibberish": false,
        "spam": false
      }
    },
    {
      "data": {
        "email_address": "google@gmail.com.br",
        "domain": "gmail.com.br",
        "valid_syntax": true,
        "disposable": false,
        "webmail": false,
        "deliverable": false,
        "catch_all": false,
        "gibberish": false,
        "spam": false
      }
    }
  ]
}
```

### Solicitação

    /api/v1/

Essa rota recebe parâmetros na url e retornam dados de emails já avaliados de acordo com parâmetros passados.

| Params        | type    | Optional |
| ------------- | ------- | -------- |
| id_min        | int     | true     |
| id_max        | int     | true     |
| email_address | string  | true     |
| domain        | string  | true     |
| valid_syntax  | boolean | true     |
| date          | string  | true     |

### Example

    http://localhost:8080/api/v1/?id_min=3&id_max=15&valid_syntax=true&date=11/05/2021

### Resposta

```JSON
{
  "status": "OK",
  "code": 200,
  "results": [
    {
      "id": 4,
      "email_address": "email@provedor.com",
      "domain": "mail",
      "valid_syntax": true,
      "created_at": "2021-05-11T21:44:05.219Z"
    },
    {
      "id": 5,
      "email_address": "email@provedor.org",
      "domain": "mail",
      "valid_syntax": true,
      "created_at": "2021-05-11T21:44:05.220Z"
    }
  ]
}
```

### Solicitação

    /api/v3/

Essa rota recebe parâmetros na url e retornam dados de emails que foram avaliados com base na api EVA. E retornam os emails de acordo com parâmetros passados.

| Params        | type    | Optional |
| ------------- | ------- | -------- |
| id_min        | int     | true     |
| id_max        | int     | true     |
| email_address | string  | true     |
| domain        | string  | true     |
| valid_syntax  | boolean | true     |
| disposable    | boolean | true     |
| webmail       | boolean | true     |
| deliverable   | boolean | true     |
| catch_all     | boolean | true     |
| gibberish     | boolean | true     |
| date          | string  | true     |

### Example

    http://localhost:8080/api/v3/?id_min=7&id_max=15&webmail=false&date=12/05/2021

### Resposta

```JSON
{
  "status": "OK",
  "code": 200,
  "results": [
    {
      "id": 7,
      "email_address": "email@provedor.com.br",
      "domain": "provedor.com.br",
      "valid_syntax": true,
      "disposable": false,
      "webmail": false,
      "deliverable": false,
      "catch_all": false,
      "gibberish": false,
      "created_at": "2021-05-12T01:00:54.113Z"
    },
    {
      "id": 8,
      "email_address": "google@gmail.com.br",
      "domain": "gmail.com.br",
      "valid_syntax": true,
      "disposable": false,
      "webmail": false,
      "deliverable": false,
      "catch_all": false,
      "gibberish": false,
      "created_at": "2021-05-12T01:00:54.114Z"
    },
    {
      "id": 9,
      "email_address": "lucas@provedor.com.br",
      "domain": "provedor.com.br",
      "valid_syntax": true,
      "disposable": false,
      "webmail": false,
      "deliverable": false,
      "catch_all": false,
      "gibberish": false,
      "created_at": "2021-05-12T01:35:33.974Z"
    },
    {
      "id": 10,
      "email_address": "matheus@edu.ufes.br",
      "domain": "edu.ufes.br",
      "valid_syntax": true,
      "disposable": false,
      "webmail": false,
      "deliverable": true,
      "catch_all": true,
      "gibberish": false,
      "created_at": "2021-05-12T01:35:33.975Z"
    }
  ]
}
```

## Sugestão

Adicionar ao projeto uma padronização de commit, como: conventional commits

O uso de variáveis de ambiente para setar as configurações da aplicação.

A implementação de tests.
