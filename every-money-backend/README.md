# Every Money — Backend

API REST para controle financeiro pessoal. Permite gerenciar contas, categorias, transações e orçamentos, com autenticação JWT.

## Funcionalidades

- **Autenticação** — login com e-mail e senha, geração de access/refresh tokens e renovação de sessão
- **Contas** — criação e listagem de contas bancárias por usuário (corrente, poupança, investimento, etc.)
- **Categorias** — organização de receitas e despesas por classificação (moradia, alimentação, transporte, etc.)
- **Transações** — registro de entradas e saídas vinculadas a conta e categoria, com listagem por período
- **Orçamentos** — definição de limites mensais por tipo de categoria
- **Usuário** — alteração de senha

## Stack

| Tecnologia | Uso |
|---|---|
| [NestJS](https://nestjs.com/) | Framework da API |
| [TypeORM](https://typeorm.io/) | ORM e migrations |
| [PostgreSQL](https://www.postgresql.org/) | Banco de dados |
| [Passport + JWT](https://www.passportjs.org/) | Autenticação |
| [Swagger](https://swagger.io/) | Documentação interativa da API |
| [Jest](https://jestjs.io/) | Testes unitários e de integração |

## Arquitetura

O projeto segue uma organização em camadas inspirada em Clean Architecture:

```
src/
├── interface/        # Controllers (entrada HTTP)
├── application/      # Use cases (regras de aplicação)
├── domain/           # Entidades, modelos e contratos de repositório
├── infrastructure/   # Implementações (TypeORM, PostgreSQL)
└── modules/          # Módulos transversais (auth, config, access-log)
```

## Pré-requisitos

- Node.js `22.16.0`
- npm `11.17.0`
- PostgreSQL em execução

## Configuração

1. Clone o repositório e instale as dependências:

```bash
npm install
```

2. Crie o arquivo de ambiente `.env.development` na raiz do projeto:

```env
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=seu_usuario
DB_PASSWORD=sua_senha
DB_DATABASE=every_money

JWT_SECRET=sua_chave_secreta
JWT_EXPIRES_IN=120s
JWT_REFRESH_SECRET=sua_chave_refresh
JWT_REFRESH_EXPIRES_IN=7d

ACCESS_LOG_ENABLED=true
```

3. Inicialize o banco de dados e aplique as migrations:

```bash
npm run db:init
```

## Executando

```bash
# Desenvolvimento (hot-reload)
npm run start:dev

# Produção
npm run build
npm run start:prod
```

A API sobe em **http://localhost:3000**.

## Documentação da API (Swagger)

Com o servidor rodando:

- **Swagger UI:** http://localhost:3000/api-docs
- **OpenAPI JSON:** http://localhost:3000/api-docs-json

Endpoints protegidos exigem o header `Authorization: Bearer <access_token>`. O endpoint `POST /auth/refresh` utiliza o refresh token no esquema `JWT-refresh`.

## Autenticação

| Endpoint | Descrição |
|---|---|
| `POST /auth/login` | Autentica com e-mail e senha; retorna `accessToken` e `refreshToken` |
| `POST /auth/refresh` | Renova os tokens usando o refresh token |

Demais rotas exigem o access token no header `Authorization`.

## Scripts úteis

| Comando | Descrição |
|---|---|
| `npm run start:dev` | Inicia em modo desenvolvimento |
| `npm run build` | Compila o projeto |
| `npm run test` | Executa testes com cobertura |
| `npm run lint` | Verifica e corrige o código com ESLint |
| `npm run db:init` | Recria o banco e aplica migrations |
| `npm run db:migrations:apply` | Aplica migrations pendentes |
| `npm run db:migrations:generate --name=NomeDaMigration` | Gera nova migration |

## Testes

```bash
# Todos os testes
npm run test

# Modo watch
npm run test:watch

# Testes e2e
npm run test:e2e
```

## Licença

Projeto privado — UNLICENSED.
