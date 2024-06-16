# API

## Instalar dependências

```sh
npm install
```

Use a flag `--production` para o ambiente de produção:

```sh
npm install --production
```

## Testes

Obs.: É necessário instalar as dependências antes.

```sh
npm test
```

## Configuração

A configuração é feita por variáveis de ambiente. Estas são as opções e seus valores padrão:

```
DATABASE_URL=sqlite://:memory:
LOG_LEVEL=error
PORT=3000
```

As variáveis podem ser modificadas ao rodar a aplicação:

```sh
DATABASE_URL="postgres://user:pass@example.com:5432/dbname" LOG_LEVEL="warn" PORT="8008" node ./src/web.js
```
