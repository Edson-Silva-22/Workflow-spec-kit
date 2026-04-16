---

description: "Task list for Gestão de Usuários feature implementation"
---

# Tasks: Gestão de Usuários

**Input**: Design documents from `/specs/001-gestao-usuarios/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Jest (backend unit/e2e), Playwright (frontend e2e) - implementados junto com código

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Create project structure per implementation plan (backend/ e frontend/)
- [X] T002 Initialize NestJS backend with TypeScript 5.x and dependencies (@nestjs/jwt, @nestjs/passport, passport-jwt, bcrypt, mongoose, class-validator)
- [X] T003 [P] Initialize Vue 3 frontend with Vuetify, Pinia, Vue Router, Axios
- [X] T004 [P] Configure ESLint + Prettier (flat config) para backend e frontend
- [X] T005 [P] Configure Jest para testes backend
- [X] T006 Configure Playwright para testes e2e frontend

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T007 Setup MongoDB connection configuration em backend/src/config/database.config.ts
- [X] T008 [P] Configure environment variables (.env.example) com MONGODB_URI, JWT_SECRET, JWT_EXPIRATION
- [X] T009 [P] Setup global error handling e logging em backend/src/utils/methods/handle-error.ts
- [X] T010 Create User entity schema em backend/src/modules/users/entities/user.entity.ts
- [X] T011 Create Role enum (ADMIN, MANAGER, OPERATOR) e UserStatus enum (ACTIVE, INACTIVE)
- [X] T012 Setup auth module estrutura em backend/src/modules/auth/
- [X] T013 Implement JWT Strategy em backend/src/modules/auth/strategies/jwt.strategy.ts
- [X] T014 Implement local Strategy em backend/src/modules/auth/strategies/local.strategy.ts
- [X] T015 Create Roles guard em backend/src/modules/authorization/guard/authorization.guard.ts
- [X] T016 Create @Roles decorator em backend/src/modules/authorization/decorator/roles.decorator.ts
- [X] T017 Setup AppModule integrando Mongoose e Auth modules

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Autenticação de Usuário (Priority: P1) 🎯 MVP

**Goal**: Implementar login/logout com JWT e validação de credenciais

**Independent Test**: Testar login com credenciais válidas e inválidas, logout e proteção de rotas

### Implementation for User Story 1

- [ ] T018 [P] [US1] Create Login DTO em backend/src/modules/auth/dto/create-auth.dto.ts
- [ ] T019 [P] [US1] Create UserResponse DTO em backend/src/modules/auth/dto/user-response.dto.ts
- [ ] T020 [US1] Implement AuthService com método login em backend/src/modules/auth/auth.service.ts
- [ ] T021 [US1] Implement AuthService com método validateUser em backend/src/modules/auth/auth.service.ts
- [ ] T022 [US1] Implement AuthController com POST /auth/login em backend/src/modules/auth/auth.controller.ts
- [ ] T023 [US1] Implement AuthController com POST /auth/logout em backend/src/modules/auth/auth.controller.ts
- [ ] T024 [US1] Add JWT Guard ao AuthController em backend/src/modules/auth/auth.controller.ts
- [ ] T025 [P] [US1] Create AuthGuard em backend/src/modules/auth/auth.guard.ts
- [ ] T026 [P] [US1] Create @CurrentUser decorator em backend/src/utils/decorators/auth-user.decorator.ts
- [ ] T027 [US1] Configurar JWT Module em backend/src/modules/auth/auth.module.ts

**Frontend - Login Page**

- [ ] T028 [P] [US1] Create Login page em frontend/src/modules/auth/pages/login.vue
- [ ] T029 [P] [US1] Create auth store com Pinia em frontend/src/modules/auth/store/auth.store.ts
- [ ] T030 [P] [US1] Create auth router em frontend/src/modules/auth/router/auth.router.ts
- [ ] T031 [US1] Create http-client plugin com Axios em frontend/src/plugins/http-client.ts
- [ ] T032 [US1] Integrate login page com auth store em frontend/src/modules/auth/pages/login.vue

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Gerenciamento de Usuários (Priority: P1)

**Goal**: CRUD de usuários (cadastrar, editar, desativar) apenas para Administradores

**Independent Test**: Testar criar, editar e desativar usuários como Admin; testar acesso negado para Gerente/Operador

### Implementation for User Story 2

- [ ] T033 [P] [US2] Create CreateUserDto em backend/src/modules/users/dto/create-user.dto.ts
- [ ] T034 [P] [US2] Create UpdateUserDto em backend/src/modules/users/dto/update-user.dto.ts
- [ ] T035 [P] [US2] Create UsersService em backend/src/modules/users/users.service.ts
- [ ] T036 [US2] Implement create método em backend/src/modules/users/users.service.ts
- [ ] T037 [US2] Implement findAll com paginação em backend/src/modules/users/users.service.ts
- [ ] T038 [US2] Implement findOne por ID em backend/src/modules/users/users.service.ts
- [ ] T039 [US2] Implement update método em backend/src/modules/users/users.service.ts
- [ ] T040 [US2] Implement remove (soft delete) método em backend/src/modules/users/users.service.ts
- [ ] T041 [US2] Create UsersController em backend/src/modules/users/users.controller.ts
- [ ] T042 [US2] Add @Roles(ADMIN) guard aos endpoints deUsersController
- [ ] T043 [US2] Add validação para prevenir auto-desativação do admin em backend/src/modules/users/users.service.ts
- [ ] T044 [US2] Add validação para prevenir email duplicado em backend/src/modules/users/users.service.ts
- [ ] T045 [US2] Create UsersModule integrando Mongoose em backend/src/modules/users/users.module.ts

**Frontend - User Management**

- [ ] T046 [P] [US2] Create user store em frontend/src/modules/users/store/user.store.ts
- [ ] T047 [P] [US2] Create user router em frontend/src/modules/users/router/user.router.ts
- [ ] T048 [US2] Create UserList page em frontend/src/modules/users/pages/user-list.vue
- [ ] T049 [US2] Create UserForm dialog/page em frontend/src/modules/users/pages/user-form.vue
- [ ] T050 [US2] Integrate UserList com user store em frontend/src/modules/users/pages/user-list.vue

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Recuperação de Senha (Priority: P2)

**Goal**: Implementar recuperação de senha via console/log (V1)

**Independent Test**: Testar recuperação de senha com email válido e inválido

### Implementation for User Story 3

- [ ] T051 [P] [US3] Create PasswordReset entity em backend/src/modules/auth/entities/password-reset.entity.ts
- [ ] T052 [P] [US3] Create ForgotPasswordDto em backend/src/modules/auth/dto/forgot-password.dto.ts
- [ ] T053 [P] [US3] Create ResetPasswordDto em backend/src/modules/auth/dto/reset-password.dto.ts
- [ ] T054 [US3] Implement forgotPassword método em AuthService backend/src/modules/auth/auth.service.ts
- [ ] T055 [US3] Implement resetPassword método em AuthService backend/src/modules/auth/auth.service.ts
- [ ] T056 [US3] Add POST /auth/forgot-password endpoint em backend/src/modules/auth/auth.controller.ts
- [ ] T057 [US3] Add POST /auth/reset-password endpoint em backend/src/modules/auth/auth.controller.ts
- [ ] T058 [US3] Implement token expiration (15 min TTL) em backend/src/modules/auth/auth.service.ts
- [ ] T059 [US3] Add console.log para exibir token de recuperação (V1) em backend/src/modules/auth/auth.service.ts

**Frontend - Password Recovery**

- [ ] T060 [P] [US3] Create ForgotPassword page em frontend/src/modules/auth/pages/forgot-password.vue
- [ ] T061 [P] [US3] Create ResetPassword page em frontend/src/modules/auth/pages/reset-password.vue
- [ ] T062 [US3] Integrate forgot/reset pages com auth store

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: User Story 4 - Gerenciamento de Perfis (Priority: P2)

**Goal**: Alterar perfil de usuários com proteção contra auto-demição de admin

**Independent Test**: Testar alteração de perfil e proteção contra auto-remoção de admin

### Implementation for User Story 4

- [ ] T063 [US4] Add validação para prevenir auto-remoção de admin em backend/src/modules/users/users.service.ts
- [ ] T064 [US4] Add validação para impedir último admin de ser alterado em backend/src/modules/users/users.service.ts
- [ ] T065 [P] [US4] Create RoleGuard mais robusto em backend/src/modules/authorization/guard/authorization.guard.ts

**Frontend - Role Management**

- [ ] T066 [US4] Add role dropdown ao UserForm em frontend/src/modules/users/pages/user-form.vue
- [ ] T067 [US4] Add lógica de proteção visual para auto-remoção em frontend/src/modules/users/pages/user-list.vue

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T068 [P] Add data-testid attributes para Playwright em frontend/src/modules/auth/pages/login.vue
- [ ] T069 [P] Add data-testid attributes para Playwright em frontend/src/modules/users/pages/user-list.vue
- [ ] T070 Add loading states aos formulários frontend
- [ ] T071 Add error handling e toast notifications em frontend/src/components/alert/
- [ ] T072 Create Header component com logout em frontend/src/components/Header.vue
- [ ] T073 Create default layout integrando Header em frontend/src/layouts/default.vue
- [ ] T074 Add protected route guard em frontend/src/router/index.ts
- [ ] T075 Run quickstart.md validation scenarios
- [ ] T076 Code cleanup e refactoring

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Depends on User entity from Foundational
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Depends on AuthService from US1
- **User Story 4 (P4)**: Can start after Foundational (Phase 2) - Depends on UsersService from US2

### Within Each User Story

- Models before services
- Services before endpoints
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, US1 and US2 can start in parallel (independent modules)
- US3 and US4 can also run in parallel after Foundational
- All entities/dtos for a user story marked [P] can run in parallel

---

## Parallel Example: User Story 1

```bash
# Launch all parallel tasks for User Story 1:
Task: "Create Login DTO in backend/src/modules/auth/dto/create-auth.dto.ts"
Task: "Create UserResponse DTO in backend/src/modules/auth/dto/user-response.dto.ts"

Task: "Create AuthGuard in backend/src/modules/auth/auth.guard.ts"
Task: "Create @CurrentUser decorator in backend/src/utils/decorators/auth-user.decorator.ts"

Task: "Create Login page in frontend/src/modules/auth/pages/login.vue"
Task: "Create auth store with Pinia in frontend/src/modules/auth/store/auth.store.ts"
Task: "Create auth router in frontend/src/modules/auth/router/auth.router.ts"
```

---

## Implementation Strategy

### MVP First (User Stories 1 & 2)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Complete Phase 4: User Story 2
6. **STOP and VALIDATE**: Test User Story 2 independently
7. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Add User Story 4 → Test independently → Deploy/Demo
6. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (Auth - backend)
   - Developer B: User Story 2 (Users CRUD - backend)
   - Developer C: Frontend Login page + Auth store
3. Stories complete and integrate independently

---

## Summary

| Phase | Tasks |
|-------|-------|
| Phase 1: Setup | T001-T006 (6 tasks) |
| Phase 2: Foundational | T007-T017 (11 tasks) |
| Phase 3: US1 - Autenticação | T018-T032 (15 tasks) |
| Phase 4: US2 - Gerenciamento Usuários | T033-T050 (18 tasks) |
| Phase 5: US3 - Recuperação de Senha | T051-T062 (12 tasks) |
| Phase 6: US4 - Gerenciamento de Perfis | T063-T067 (5 tasks) |
| Phase 7: Polish | T068-T076 (9 tasks) |
| **Total** | **76 tasks** |

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence