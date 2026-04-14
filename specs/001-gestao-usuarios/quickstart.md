# Quickstart: Gestão de Usuários

**Feature**: 001-gestao-usuarios  
**Data**: 2026-04-14  
**Reference**: [Elucide-Notes](https://github.com/Edson-Silva-22/Elucide-Notes)

## Stack Técnica

| Camada | Tecnologia |
|--------|------------|
| Backend | NestJS + TypeScript |
| Database | MongoDB + Mongoose |
| Frontend | Vue 3 + Vuetify + Pinia |
| Testes | Jest (backend), Playwright (e2e) |
| Linting | ESLint + Prettier |

## Pré-requisitos

- Node.js 20 LTS
- MongoDB 6+
- pnpm (ou npm/yarn)
- Git

## Setup do Projeto

### 1. Clonar e Instalar Dependências

```bash
# Backend
cd backend
pnpm install

# Frontend
cd ../frontend
pnpm install
```

### 2. Configurar Variáveis de Ambiente

```bash
# backend/.env
MONGODB_URI="mongodb://localhost:27017/estoque"
JWT_SECRET="your-secret-key-min-32-chars"
JWT_EXPIRES_IN="1h"
REFRESH_TOKEN_EXPIRES_IN="7d"
ADMIN_PASSWORD="Admin@123"
PORT=3000
```

```bash
# frontend/.env
VITE_API_URL="http://localhost:3000/api"
```

### 3. Banco de Dados MongoDB

```bash
# Verificar MongoDB
mongosh --eval "db.adminCommand('ping')"

# Criar banco (opcional - criado automaticamente)
mongosh --eval "use estoque"
```

### 4. Credenciais Padrão

```
Email: admin@estoque.local
Senha: Admin@123 (alterar em produção!)
```

## Executar

### Development Mode

```bash
# Backend (porta 3000)
cd backend && pnpm start:dev

# Frontend (porta 5173)
cd frontend && pnpm dev
```

### Production Mode

```bash
# Backend
cd backend && pnpm build && pnpm start:prod

# Frontend
cd frontend && pnpm build
```

## Testes

### Backend

```bash
cd backend

# Unitários (por módulo)
pnpm test:unit -- --testPathPattern=auth
pnpm test:unit -- --testPathPattern=users

# Todos unitários
pnpm test:unit

# E2E (por módulo)
pnpm test:e2e -- --testPathPattern=auth
pnpm test:e2e -- --testPathPattern=users

# Cobertura
pnpm test:cov
```

### Frontend

```bash
cd frontend

# E2E com Playwright
pnpm test:e2e

# UI tests
pnpm test
```

## Estrutura de Pastas (Padrão Elucide-Notes)

### Backend (NestJS)

```
backend/
├── src/
│   ├── modules/
│   │   ├── auth/                     # Módulo de autenticação
│   │   │   ├── dto/
│   │   │   ├── entities/
│   │   │   ├── tests/
│   │   │   │   ├── unit/
│   │   │   │   ├── e2e/
│   │   │   │   └── mocks/
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.guard.ts
│   │   │   └── auth.module.ts
│   │   │
│   │   ├── authorization/            # Guards de autorização
│   │   │   ├── decorator/
│   │   │   ├── guard/
│   │   │   └── authorization.module.ts
│   │   │
│   │   └── users/                   # Módulo de usuários
│   │       ├── dto/
│   │       ├── entities/
│   │       ├── tests/
│   │       ├── users.controller.ts
│   │       ├── users.service.ts
│   │       └── users.module.ts
│   │
│   ├── utils/
│   │   ├── decorators/
│   │   │   └── auth-user.decorator.ts
│   │   └── methods/
│   │       ├── build-search-regex.ts
│   │       └── handle-error.ts
│   │
│   ├── app.module.ts
│   └── main.ts
│
├── test/
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
│
├── .prettierrc
├── eslint.config.mjs
└── ...
```

### Frontend (Vue 3)

```
frontend/
├── src/
│   ├── modules/
│   │   └── auth/
│   │       ├── pages/
│   │       │   └── login.vue
│   │       ├── router/
│   │       │   └── auth.router.ts
│   │       ├── store/
│   │       │   └── auth.store.ts
│   │       └── tests/
│   │           ├── e2e/
│   │           ├── mocks/
│   │           └── page-objects/
│   │
│   ├── components/
│   │   ├── Header.vue
│   │   └── alert/
│   │       └── alert.store.ts
│   │
│   ├── layouts/
│   │   └── default.vue
│   │
│   ├── plugins/
│   │   └── http-client.ts           # Axios plugin
│   │
│   ├── App.vue
│   └── main.ts
│
├── tests/
│   └── e2e/
│       └── app.e2e.spec.ts
│
├── playwright.config.ts
└── ...
```

## Comandos Úteis

### NestJS CLI

```bash
# Gerar módulo completo
nest g resource auth

# Gerar service
nest g service auth/auth

# Gerar controller
nest g controller auth/auth

# Gerar guard
nest g guard auth/auth

# Gerar DTO
nest g class auth/dto/create-auth.dto --dry-run
```

### Playwright

```bash
# Abrir UI do Playwright
pnpm playwright test --ui

# Gerar testes
pnpm playwright test --generate

# Modo headed
pnpm playwright test --headed

# Update snapshots
pnpm playwright test --update-snapshots
```

### Linting

```bash
# Backend
cd backend
pnpm lint          # ESLint
pnpm format        # Prettier
pnpm lint:fix      # ESLint --fix

# Frontend
cd frontend
pnpm lint
pnpm format
```

## Endpoints da API

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| POST | /api/auth/login | Login | - |
| POST | /api/auth/logout | Logout | JWT |
| POST | /api/auth/register | Cadastrar usuário | Admin |
| POST | /api/auth/refresh | Refresh token | Refresh |
| POST | /api/auth/forgot-password | Solicitar reset | - |
| POST | /api/auth/reset-password | Redefinir senha | Token |
| GET | /api/users | Listar usuários | Admin |
| GET | /api/users/me | Usuário logado | JWT |
| GET | /api/users/:id | Detalhar usuário | Admin |
| PATCH | /api/users/:id | Editar usuário | Admin |
| DELETE | /api/users/:id | Desativar usuário | Admin |

## Troubleshooting

### Erro de Conexão MongoDB

```bash
# Verificar MongoDB
mongosh --eval "db.adminCommand('ping')"

# Verificar URI de conexão
cat .env | grep MONGODB_URI
```

### Erro de Build

```bash
# Limpar cache
rm -rf dist node_modules/.cache

# Reconstruir
pnpm build
```

### JWT Invalid

```bash
# Regenerar JWT_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Problemas com Playwright

```bash
# Instalar browsers
pnpm playwright install

# Verificar instalação
pnpm playwright test --list
```

### ESLint/Prettier

```bash
# Verificar conflitos
pnpm lint --debug

# Formatar tudo
pnpm format

# Fix automático
pnpm lint:fix
```
