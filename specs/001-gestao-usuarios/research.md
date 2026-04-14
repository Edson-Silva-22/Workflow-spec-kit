# Pesquisa: Gestão de Usuários

**Feature**: 001-gestao-usuarios  
**Data**: 2026-04-14  
**Stack**: NestJS + MongoDB + Vue 3  
**Reference**: [Elucide-Notes](https://github.com/Edson-Silva-22/Elucide-Notes)

## 1. Padrões de Código Backend (Elucide-Notes)

### Service Pattern

```typescript
// backend/src/modules/auth/auth.service.ts
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../users/entities/user.entity';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { handleError } from '../../utils/methods/handle-error';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService
  ) {}

  async login(createAuthDto: CreateAuthDto) {
    try {
      const userIsExist = await this.userModel.findOne({ email: createAuthDto.email });
      if (!userIsExist) throw new NotFoundException('Usuário não encontrado.');
      
      const passwordIsCorrect = await bcrypt.compare(createAuthDto.password, userIsExist.password);
      if (!passwordIsCorrect) throw new BadRequestException('Senha incorreta.');

      const payload = { sub: userIsExist._id, username: userIsExist.name, role: userIsExist.role };
      return {
        token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      handleError(error);
    }
  }
}
```

### Auth Guard Pattern

```typescript
// backend/src/modules/auth/auth.guard.ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { handleError } from '../utils/methods/handle-error';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      
      if (!token) {
        throw new Error('Token não fornecido.');
      }
      
      const payload = await this.jwtService.verifyAsync(token);
      request['user'] = payload;
      
      return true;
    } catch (error) {
      handleError(error);
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
```

### Authorization Decorator

```typescript
// backend/src/modules/authorization/decorator/roles.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
```

### Authorization Guard

```typescript
// backend/src/modules/authorization/guard/authorization.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorator/roles.decorator';
import { handleError } from '../../utils/methods/handle-error';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    try {
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
      
      if (!requiredRoles) {
        return true;
      }
      
      const { user } = context.switchToHttp().getRequest();
      const hasRole = requiredRoles.some((role) => user.role === role);
      
      if (!hasRole) {
        throw new Error('Acesso não autorizado.');
      }
      
      return true;
    } catch (error) {
      handleError(error);
    }
  }
}
```

### Utils - Handle Error

```typescript
// backend/src/utils/methods/handle-error.ts
export function handleError(error: unknown): never {
  if (error instanceof Error) {
    throw error;
  }
  throw new Error('Unknown error occurred');
}
```

### Utils - Auth User Decorator

```typescript
// backend/src/utils/decorators/auth-user.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
```

## 2. Padrões de Código Frontend (Elucide-Notes)

### Pinia Store Pattern (Composition API)

```typescript
// frontend/src/modules/auth/store/auth.store.ts
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

  async function logout() {
    loading.value = true
    const response = await useApi('get', 'auth/logout')
    userAuth.value = null
    loading.value = false
    if (response) return response
  }

  async function me() {
    const response = await useApi('get', 'users/me')
    if (response) {
      userAuth.value = response
      return true
    } else {
      userAuth.value = null
      return false
    }
  }

  return {
    login,
    logout,
    me,
    userAuth,
    loading
  }
})
```

### HTTP Client Plugin

```typescript
// frontend/src/plugins/http-client.ts
import axios, { type AxiosInstance, type AxiosError } from 'axios'
import { useAuthStore } from '@/modules/auth/store/auth.store'

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      const authStore = useAuthStore()
      authStore.logout()
    }
    return Promise.reject(error)
  }
)

export function useApi(method: 'get' | 'post' | 'put' | 'patch' | 'delete', url: string, data?: unknown) {
  return api[method](url, data)
    .then((response) => response.data)
    .catch((error) => {
      console.error(`API Error [${method}] ${url}:`, error)
      return null
    })
}

export { api }
```

## 3. Padrões de Teste Backend (Elucide-Notes)

### Unit Test

```typescript
// backend/src/modules/auth/tests/unit/auth.service.spec.ts
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

### Mock Pattern

```typescript
// backend/src/modules/users/tests/mocks/users.mocks.ts
import { CreateUserDto } from '../dto/create-user.dto';
import { User, Role, UserStatus } from '../entities/user.entity';

export const mockUser: User = {
  _id: '507f1f77bcf86cd799439011',
  email: 'test@example.com',
  passwordHash: '$2b$12$hash',
  name: 'Test User',
  role: Role.OPERATOR,
  status: UserStatus.ACTIVE,
  createdAt: new Date(),
  updatedAt: new Date(),
} as User;

export const mockCreateUserDto: CreateUserDto = {
  email: 'test@example.com',
  password: 'Password123',
  name: 'Test User',
  role: Role.OPERATOR,
};
```

## 4. Padrões de Teste Frontend (Elucide-Notes)

### Page Object

```typescript
// frontend/src/modules/auth/tests/page-objects/login.page-object.ts
export const loginPage = {
  goto: () => page.goto('/login'),
  
  getEmailInput: () => page.locator('[data-testid="email"]'),
  getPasswordInput: () => page.locator('[data-testid="password"]'),
  getSubmitButton: () => page.locator('[data-testid="submit"]'),
  getErrorMessage: () => page.locator('[data-testid="error-message"]'),
  
  fillEmail: (email: string) => loginPage.getEmailInput().fill(email),
  fillPassword: (password: string) => loginPage.getPasswordInput().fill(password),
  submit: () => loginPage.getSubmitButton().click(),
  
  login: (email: string, password: string) => {
    loginPage.fillEmail(email)
    loginPage.fillPassword(password)
    loginPage.submit()
  },
}
```

### E2E Test

```typescript
// frontend/src/modules/auth/tests/e2e/auth.e2e.spec.ts
import { test, expect } from '@playwright/test'
import { loginPage } from '../page-objects/login.page-object'

test.describe('Auth E2E', () => {
  test.beforeEach(async () => {
    await loginPage.goto()
  })

  test('should display login form', async () => {
    await expect(loginPage.getEmailInput()).toBeVisible()
    await expect(loginPage.getPasswordInput()).toBeVisible()
    await expect(loginPage.getSubmitButton()).toBeVisible()
  })

  test('should login successfully with valid credentials', async () => {
    await loginPage.login('admin@estoque.local', 'Admin@123')
    await expect(page).toHaveURL('/dashboard')
  })

  test('should show error with invalid credentials', async () => {
    await loginPage.login('invalid@example.com', 'wrongpassword')
    await expect(loginPage.getErrorMessage()).toBeVisible()
  })
})
```

### Mock Pattern

```typescript
// frontend/src/modules/auth/tests/mocks/auth.mock.ts
import { faker } from '@faker-js/faker'

export const mockLoginRequest = {
  email: faker.internet.email(),
  password: faker.internet.password(),
}

export const mockLoginResponse = {
  token: faker.string.uuid(),
  user: {
    id: faker.string.uuid(),
    email: mockLoginRequest.email,
    name: faker.person.fullName(),
    role: 'ADMIN',
  },
}

export const mockUserList = Array.from({ length: 5 }, () => ({
  id: faker.string.uuid(),
  email: faker.internet.email(),
  name: faker.person.fullName(),
  role: faker.helpers.arrayElement(['ADMIN', 'MANAGER', 'OPERATOR']),
  status: 'ACTIVE',
}))
```

## 5. Configurações de ESLint e Prettier

### Backend - ESLint (flat config)

```javascript
// backend/eslint.config.mjs
import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  {
    files: ['**/*.ts'],
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'warn',
    },
  },
];
```

### Backend - Prettier

```json
// backend/.prettierrc
{
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 80,
  "tabWidth": 2,
  "semi": true
}
```

## 6. Conclusão

### Padrões Adoptados do Elucide-Notes

| Aspecto | Padrão |
|---------|--------|
| Estrutura Backend | `modules/{name}/dto\|entities\|tests` |
| Estrutura Frontend | `modules/{name}/pages\|store\|router\|tests` |
| Auth Backend | Guard + JWT Service pattern |
| Auth Frontend | Pinia store com Composition API |
| Testes Backend | Jest com mocks em `tests/mocks/` |
| Testes Frontend | Playwright com Page Objects |
| Utils | `utils/methods/` para helpers compartilhados |
| Linting | ESLint flat config + Prettier |

## Referências

- [Elucide-Notes Repository](https://github.com/Edson-Silva-22/Elucide-Notes)
- [NestJS Documentation](https://docs.nestjs.com/)
- [Vue 3 Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
- [Playwright](https://playwright.dev/)
- [Pinia](https://pinia.vuejs.org/)
