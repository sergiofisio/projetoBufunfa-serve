# Bufunfa - API

Projeto para ensino de controle financeiro. Esta API veio para desenvolver um sistema para ser utilizado por escolas e/ ou por uma familia.

## Funcionalidades SWAGGER

Todas as funcionalidades você encontra no link [clicando aqui.](https://bufunfa.onrender.com/swaggerDocs/)

#### Exemplo de utilização Swagger

##### **Registrar novo usuario**
`POST` `/register/{table}`  

Essa é a rota para registrar novo usuario.

#####  EX. Requisição

```javascript
{
  "name": "Andre Cardoso",
  "email": "andrecardoso@email.com",
  "password": "121520",
  "cpf": "04452365858"
}

```
#####  Respostas

```javascript
// HTTP Status 201
{
  "message": "Usuario criado com sucesso"
}
```
```javascript
// HTTP Status 400
{
  "message": "Erro ao criar usuario"
}
```

## Deploy

Link deploy da API <https://bufunfa.onrender.com>


## Tecnologias

Para essa aplicação foram utilizadas as seguintes tecnologias

[![My Skills](https://skillicons.dev/icons?i=prisma,ts,express,aws,)](https://skillicons.dev)
          
          
