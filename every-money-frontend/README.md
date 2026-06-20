# Every Money — Frontend

Aplicação web de **gestão financeira pessoal** do projeto Every Money. Permite visualizar saldos, criar transações, orçamentos, contas e categorias, com foco na **Visão Geral** como painel central do dia a dia.

## Funcionalidades

- **Autenticação** — login com JWT (access + refresh token)
- **Visão Geral (`/home`)** — saldos, orçamentos com barra de progresso, últimas transações do mês, seletor de conta e mês
- **Transações** — listagem por conta/mês e criação via modal
- **Orçamentos** — listagem global, filtro por conta e criação
- **Contas** — listagem e criação
- **Categorias** — listagem e criação
- **Onboarding** — fluxos guiados quando não há conta ou categoria cadastrada

## Stack

| Camada | Tecnologia |
|--------|------------|
| Framework | React 19 + Create React App |
| Linguagem | TypeScript (hooks/services) + JSX (páginas/componentes) |
| Roteamento | React Router v7 |
| HTTP | Axios |
| Estilos | styled-components |
| Testes | Jest + Testing Library |

## Pré-requisitos

- Node.js 18+
- npm
- [every-money-backend](https://github.com/) rodando (padrão: `http://localhost:3000`)

## Instalação

```bash
git clone <url-do-repositorio>
cd every-money-frontend
npm install
```

## Variáveis de ambiente

Crie ou use o arquivo `.env.development` na raiz do projeto:

```env
PORT=8080
REACT_APP_BACKEND_API=http://localhost:3000
```

| Variável | Descrição | Padrão |
|----------|-----------|--------|
| `PORT` | Porta do servidor de desenvolvimento | `8080` |
| `REACT_APP_BACKEND_API` | URL base da API backend | `http://localhost:3000` |

## Scripts

```bash
# Desenvolvimento (http://localhost:8080)
npm start

# Build de produção
npm run build

# Testes
npm test
```

## Rotas

| Rota | Página | Autenticação |
|------|--------|--------------|
| `/` | Login | Pública |
| `/home` | Visão Geral | Protegida |
| `/account` | Contas | Protegida |
| `/budget` | Orçamentos | Protegida |
| `/category` | Categorias | Protegida |
| `/transaction` | Transações | Protegida |

Rotas protegidas redirecionam para `/` quando não há token válido no `localStorage`.

## Estrutura do projeto

```
src/
├── api/              # Cliente HTTP (BackendApi, refresh token)
├── components/       # UI reutilizável (modal, forms, tabelas, cards)
├── hook/             # Hooks por domínio (useHome, useContas, etc.)
├── pages/            # Páginas por rota
├── service/          # Camada de serviço REST
├── share/
│   ├── context/      # Factories dos services
│   ├── domain/       # Tipos e enums
│   ├── storage/      # localStorage
│   └── utils/        # Datas, moeda, orçamento
└── index.tsx         # Bootstrap, rotas e ToastProvider
```

### Padrão de arquitetura

```
Page → Hook → Service → BackendApi → REST API
```

## Integração com o backend

O frontend consome os endpoints REST do backend NestJS. Principais operações:

| Recurso | Leitura | Criação |
|---------|---------|---------|
| Auth | — | `POST /auth/login` |
| Contas | `GET /conta/listar-contas/usuario/:id` | `POST /conta/criar-conta` |
| Categorias | `GET /categoria/listar-categorias/usuario/:id` | `POST /categoria/criar-categoria` |
| Transações | `GET /transacao/listar-transacoes/conta/:id` | `POST /transacao/criar-transacao/conta/:contaId/categoria/:categoriaId` |
| Orçamentos | `GET /orcamento/listar-orcamentos/usuario/:id` | `POST /orcamento/criar-orcamento/conta/:contaId` |

### Formato de `mesReferencia`

O backend utiliza o formato **`"Junho 2026"`** (mês por extenso em português + ano). O frontend converte automaticamente entre esse formato e o valor do input HTML `type="month"` (`2026-06`).

## Desenvolvimento

1. Suba o backend na porta `3000`
2. Execute `npm start` neste projeto
3. Acesse `http://localhost:8080` e faça login

### Dicas

- Se aparecer erro de rede em loop, reinicie o frontend e faça logout/login para renovar os tokens
- Orçamentos criados com formato de mês incorreto no banco podem não aparecer — recrie pelo formulário da aplicação
- O build de produção gera os arquivos estáticos em `build/`

## Licença

Projeto privado — uso interno.
