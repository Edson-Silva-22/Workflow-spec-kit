# Plano de Implementação: Gestão de Usuários

**Branch**: `main` | **Data**: 2026-04-14 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `specs/001-gestao-usuarios/spec.md`
**Reference**: [Elucide-Notes](https://github.com/Edson-Silva-22/Elucide-Notes)

## Resumo

Módulo de autenticação e gestão de usuários para o Sistema de Gerenciamento de Estoque. Implementa login/logout com JWT, CRUD de usuários com perfis (Admin/Gerente/Operador), recuperação de senha via console/log e proteção contra auto-desativação do administrador.

## Contexto Técnico

**Linguagem/Versão**: TypeScript 5.x (Node.js 20 LTS)  
**Framework Backend**: NestJS (arquitetura modular)  
**Dependências Principais Backend**: @nestjs/jwt, @nestjs/passport, passport-jwt, bcrypt, mongoose, class-validator  
**Armazenamento**: MongoDB + Mongoose ODM  
**Testes Backend**: Jest (unitários, e2e)  
**Framework Frontend**: Vue 3 (Composition API)  
**UI**: Vuetify (Material Design)  
**Estado Global**: Pinia (Composition API style)  
**Roteamento**: Vue Router  
**HTTP Client**: Axios (plugin pattern)  
**Testes E2E**: Playwright (page objects pattern)  
**Linting**: ESLint + Prettier (flat config)  
**Plataforma Alvo**: Linux server, Navegadores modernos  
**Tipo de Projeto**: Aplicação web full-stack (backend API + frontend SPA)  

## Verificação da Constituição

*GATE: Deve passar antes da Fase 0 de pesquisa. Re-verificar após design da Fase 1.*

| Princípio | Status | Observação |
|-----------|--------|------------|
| I. Integridade de Dados | ✅ | Validação de email único, senha hashada com bcrypt |
| II. Rastreabilidade Completa | ✅ | Log de autenticações, histórico de alterações |
| III. Controle de Acesso | ✅ | JWT + Guards + RBAC com 3 perfis |
| IV. Monitoramento Proativo | N/A | Não aplicável a este módulo |
| V. Testabilidade | ✅ | Jest (backend), Playwright (e2e) |
| VI. Simplicidade Intencional | ✅ | Escopo V1 bem definido |

## Estrutura do Projeto (Padrões Elucide-Notes)

### Backend - NestJS

```
backend/
├── src/
│   ├── modules/
│   │   ├── auth/                      # Módulo de autenticação
│   │   │   ├── dto/
│   │   │   │   ├── create-auth.dto.ts
│   │   │   │   └── update-auth.dto.ts
│   │   │   ├── entities/
│   │   │   │   └── auth.entity.ts
│   │   │   ├── tests/
│   │   │   │   ├── unit/
│   │   │   │   │   ├── auth.controller.spec.ts
│   │   │   │   │   ├── auth.service.spec.ts
│   │   │   │   │   └── auth.guard.spec.ts
│   │   │   │   └── e2e/
│   │   │   │       └── auth.e2e.spec.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.guard.ts
│   │   │   └── auth.module.ts
│   │   │
│   │   ├── authorization/            # Módulo de autorização (guards)
│   │   │   ├── decorator/
│   │   │   │   └── roles.decorator.ts
│   │   │   ├── guard/
│   │   │   │   └── authorization.guard.ts
│   │   │   ├── tests/
│   │   │   │   └── unit/
│   │   │   │       └── authorization.guard.spec.ts
│   │   │   └── authorization.module.ts
│   │   │
│   │   └── users/                    # Módulo de usuários
│   │       ├── dto/
│   │       │   ├── create-user.dto.ts
│   │       │   └── update-user.dto.ts
│   │       ├── entities/
│   │       │   └── user.entity.ts
│   │       ├── tests/
│   │       │   ├── unit/
│   │       │   ├── e2e/
│   │       │   └── mocks/
│   │       │       └── users.mocks.ts
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
├── nest-cli.json
├── package.json
└── tsconfig.json
```

### Frontend - Vue 3

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
│   │           │   └── auth.e2e.spec.ts
│   │           ├── mocks/
│   │           │   └── auth.mock.ts
│   │           └── page-objects/
│   │               └── login.page-object.ts
│   │
│   ├── components/
│   │   ├── Header.vue
│   │   ├── PageHeader.vue
│   │   └── alert/
│   │       ├── alert.vue
│   │       └── store/
│   │           └── alert.store.ts
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
├── eslint.config.js
├── package.json
├── vite.config.ts
└── tsconfig.json
```

### Padrões de Nomeclatura (Elucide-Notes)

#### Backend

| Tipo | Padrão | Exemplo |
|------|---------|---------|
| Module | `{name}.module.ts` | `auth.module.ts` |
| Controller | `{name}.controller.ts` | `auth.controller.ts` |
| Service | `{name}.service.ts` | `auth.service.ts` |
| Guard | `{name}.guard.ts` | `auth.guard.ts` |
| DTO | `{action}-{name}.dto.ts` | `create-auth.dto.ts` |
| Entity | `{name}.entity.ts` | `user.entity.ts` |
| Test (unit) | `{name}.spec.ts` | `auth.service.spec.ts` |
| Test (e2e) | `{name}.e2e.spec.ts` | `auth.e2e.spec.ts` |
| Test (mock) | `{name}.mocks.ts` | `users.mocks.ts` |

#### Frontend

| Tipo | Padrão | Exemplo |
|------|---------|---------|
| Page | `login.vue` | `login.vue` |
| Store | `{name}.store.ts` | `auth.store.ts` |
| Router | `{name}.router.ts` | `auth.router.ts` |
| Test (e2e) | `{name}.e2e.spec.ts` | `auth.e2e.spec.ts` |
| Test (mock) | `{name}.mock.ts` | `auth.mock.ts` |
| Page Object | `{name}.page-object.ts` | `login.page-object.ts` |

### Padrões de Código

#### Backend - Service Pattern

```typescript
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService
  ) {}

  async login(createAuthDto: CreateAuthDto) {
    try {
      // implementation
    } catch (error) {
      handleError(error);
    }
  }
}
```

#### Frontend - Pinia Store Pattern (Composition API)

```typescript
import type { User } from "@/modules/users/store/user.store"
import { useApi } from "@/plugins/http-client"

export const useAuthStore = defineStore('auth', () => {
  const userAuth = ref<User | null>(null)
  const loading = ref(false)

  async function login(email: string, password: string) {
    loading.value = true
    const response = await useApi('post', 'auth', { email, password })
    loading.value = false
    
    if (response) {
      await me()
      return response
    }
  }

  return { login, userAuth, loading }
})
```

### Padrões de Teste

#### Backend - Unit Tests

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
```

#### Frontend - Playwright E2E with Page Objects

```typescript
// page-objects/login.page-object.ts
export const loginPage = {
  goto: () => page.goto('/login'),
  fillEmail: (email: string) => page.fill('[data-testid="email"]', email),
  fillPassword: (password: string) => page.fill('[data-testid="password"]', password),
  submit: () => page.click('[data-testid="submit"]'),
}

// auth.e2e.spec.ts
import { loginPage } from './page-objects/login.page-object';

describe('Auth E2E', () => {
  it('should login successfully', async () => {
    await loginPage.goto();
    await loginPage.fillEmail('test@example.com');
    await loginPage.fillPassword('password123');
    await loginPage.submit();
    await expect(page).toHaveURL('/dashboard');
  });
});
```

## Rastreamento de Complexidade

> **Preencher SOMENTE se a Verificação da Constituição tiver violações que precisam ser justificadas**

| Violação | Por Que Necessário | Alternativa Mais Simples Rejeitada Porque |
|----------|-------------------|------------------------------------------|
| Nenhuma | - | - |

## Fases de Implementação

### Fase 0: Pesquisa (research.md)

- Avaliação de bibliotecas de autenticação NestJS
- Padrões de JWT com NestJS
- Configuração de Guards e Strategies
- Análise de security best practices

### Fase 1: Design (data-model.md, quickstart.md, contracts/)

- Modelo de dados: User, Session, PasswordReset (Mongoose schemas)
- API contracts: Auth endpoints, User CRUD
- Quickstart: Setup do projeto seguindo padrões Elucide-Notes

### Fase 2: Tarefas (tasks.md)

- Geração de tarefas por User Story
- Priorização P1 → P2
- Dependências entre tarefas
- Estrutura de testes (unit + e2e)

---

## Próximos Passos

1. `/speckit.tasks specs/001-gestao-usuarios` - Gerar lista de tarefas
2. Implementar Fase 0: Pesquisa
3. Implementar Fase 1: Design
4. Implementar Fase 2: Código
