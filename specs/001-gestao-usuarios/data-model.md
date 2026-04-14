# Modelo de Dados: Gestão de Usuários

**Feature**: 001-gestao-usuarios  
**Data**: 2026-04-14  
**Reference**: [Elucide-Notes](https://github.com/Edson-Silva-22/Elucide-Notes)

## Visão Geral

Modelo de dados NoSQL para MongoDB, implementado via Mongoose ODM com NestJS, seguindo padrões do Elucide-Notes.

## Estrutura de Diretórios

```
backend/src/modules/users/
├── dto/
│   ├── create-user.dto.ts
│   └── update-user.dto.ts
├── entities/
│   └── user.entity.ts
├── tests/
│   ├── unit/
│   ├── e2e/
│   └── mocks/
│       └── users.mocks.ts
├── users.controller.ts
├── users.service.ts
└── users.module.ts
```

## Entidades

### User Entity

```typescript
// backend/src/modules/users/entities/user.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum Role {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  OPERATOR = 'OPERATOR',
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

@Schema({ timestamps: true, collection: 'users' })
export class User extends Document {
  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ required: true, minlength: 2, maxlength: 100, trim: true })
  name: string;

  @Prop({ type: String, enum: Role, default: Role.OPERATOR })
  role: Role;

  @Prop({ type: String, enum: UserStatus, default: UserStatus.ACTIVE })
  status: UserStatus;

  @Prop()
  lastLoginAt?: Date;

  createdAt: Date;
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Índices
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ role: 1 });
UserSchema.index({ status: 1 });
```

### Session Entity

```typescript
// backend/src/modules/auth/entities/session.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, collection: 'sessions' })
export class Session extends Document {
  @Prop({ required: true, type: String, ref: 'User' })
  userId: string;

  @Prop({ required: true, unique: true })
  refreshToken: string;

  @Prop({ required: true })
  expiresAt: Date;

  createdAt: Date;
}

export const SessionSchema = SchemaFactory.createForClass(Session);

// Índices
SessionSchema.index({ userId: 1 });
SessionSchema.index({ refreshToken: 1 }, { unique: true });
SessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // TTL index
```

### PasswordReset Entity

```typescript
// backend/src/modules/auth/entities/password-reset.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, collection: 'password_resets' })
export class PasswordReset extends Document {
  @Prop({ required: true, type: String, ref: 'User' })
  userId: string;

  @Prop({ required: true, unique: true })
  token: string;

  @Prop({ required: true })
  expiresAt: Date;

  @Prop({ default: false })
  used: boolean;

  createdAt: Date;
}

export const PasswordResetSchema = SchemaFactory.createForClass(PasswordReset);

// Índices
PasswordResetSchema.index({ token: 1 }, { unique: true });
PasswordResetSchema.index({ userId: 1 });
PasswordResetSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // TTL index
```

## DTOs

### Create User DTO

```typescript
// backend/src/modules/users/dto/create-user.dto.ts
import { IsEmail, IsString, MinLength, MaxLength, IsEnum, IsNotEmpty } from 'class-validator';
import { Role } from '../entities/user.entity';

export class CreateUserDto {
  @IsEmail({}, { message: 'Email inválido' })
  @MaxLength(255)
  email: string;

  @IsString()
  @MinLength(8, { message: 'Senha deve ter no mínimo 8 caracteres' })
  @MaxLength(128)
  password: string;

  @IsString()
  @MinLength(2, { message: 'Nome deve ter no mínimo 2 caracteres' })
  @MaxLength(100)
  name: string;

  @IsEnum(Role, { message: 'Perfil inválido' })
  role: Role;
}
```

### Update User DTO

```typescript
// backend/src/modules/users/dto/update-user.dto.ts
import { IsString, IsEnum, IsOptional, MinLength, MaxLength } from 'class-validator';
import { Role, UserStatus } from '../entities/user.entity';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @MinLength(2)
  @MaxLength(100)
  name?: string;

  @IsEnum(Role)
  @IsOptional()
  role?: Role;

  @IsEnum(UserStatus)
  @IsOptional()
  status?: UserStatus;
}
```

### Login DTO

```typescript
// backend/src/modules/auth/dto/create-auth.dto.ts
import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class CreateAuthDto {
  @IsEmail({}, { message: 'Email inválido' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Senha é obrigatória' })
  password: string;
}
```

### Reset Password DTO

```typescript
// backend/src/modules/auth/dto/reset-password.dto.ts
import { IsString, MinLength, MaxLength, IsNotEmpty } from 'class-validator';

export class ResetPasswordDto {
  @IsString()
  @IsNotEmpty({ message: 'Token é obrigatório' })
  token: string;

  @IsString()
  @MinLength(8, { message: 'Senha deve ter no mínimo 8 caracteres' })
  @MaxLength(128)
  newPassword: string;
}
```

## Relacionamentos

```
User (1) ──────< Session (many)
User (1) ──────< PasswordReset (many)
```

## Índices MongoDB

| Collection | Índice | Tipo | Propósito |
|------------|--------|------|-----------|
| users | email | UNIQUE | Busca por email (login) |
| users | role | INDEX | Filtragem por perfil |
| users | status | INDEX | Filtragem por status |
| sessions | refreshToken | UNIQUE | Validação de refresh |
| sessions | expiresAt | TTL | Auto-delete de sessões expiradas |
| password_resets | token | UNIQUE | Validação de reset |
| password_resets | expiresAt | TTL | Auto-delete de tokens expirados |

## Mocks (para testes)

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

export const mockUserList: User[] = [
  mockUser,
  { ...mockUser, _id: '507f1f77bcf86cd799439012', email: 'admin@example.com', role: Role.ADMIN },
] as User[];
```

## Considerações de Segurança

1. **passwordHash**: Nunca expor em responses
2. **refreshToken**: Hash adicional antes de armazenar
3. **Soft delete**: Usar campo `status` ao invés de deletar
4. **Audit trail**: Timestamps automáticos
5. **PasswordReset**: Token de uso único, expiração 15 min via TTL index
6. **Session**: Expiração via TTL index no MongoDB
