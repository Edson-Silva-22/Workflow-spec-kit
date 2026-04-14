# 📦 stack.md

## 📖 Visão Geral
Este documento define a stack de tecnologias utilizada no projeto.  
Ele serve como referência para desenvolvimento, padronização e automação com IA (agents, tasks e spec-driven development).

---

# 🧠 Backend

## 🚀 Framework
- NestJS
  - Arquitetura modular
  - Injeção de dependência (DI)
  - Estrutura escalável e testável

## 🗄️ Banco de Dados
- MongoDB
  - Banco NoSQL orientado a documentos

- Mongoose
  - ODM para MongoDB
  - Definição de schemas
  - Suporte a validações e hooks

## ✅ Validação e DTOs
- class-validator
  - Validação baseada em decorators

- class-transformer
  - Transformação de payloads
  - Integração com ValidationPipe do NestJS

## 🔐 Segurança
- bcrypt
  - Hash de senhas
  - Comparação segura de credenciais

## 🧪 Testes
- Jest (padrão do NestJS)
  - Testes unitários
  - Testes de integração
  - Testes de e2e
  - Mock de dependências

---

# 🎨 Frontend

## ⚡ Framework
- Vue.js (Vue 3)
  - Composition API
  - Reatividade moderna

## 🎨 UI
- Vuetify
  - Biblioteca de componentes
  - Material Design
  - Alta produtividade

## 🗂️ Estado Global
- Pinia
  - Store oficial do Vue
  - Simples e tipado

## 🌐 Roteamento
- Vue Router
  - Gerenciamento de rotas SPA
  - Guards de autenticação
  - Lazy loading

## 🔌 HTTP Client
- Axios
  - Comunicação com backend
  - Interceptors para auth e tratamento de erros

## 🧪 Testes E2E
- Playwright
  - Testes end-to-end
  - Simulação de fluxo real do usuário
  - Suporte a mocks e autenticação

---

# ⚙️ Padrões de Arquitetura

## Backend
- Arquitetura modular (feature-based)
- Uso de DTOs para entrada e saída
- Separação em:
  - Controller
  - Service
  - Repository / Model
- Uso de Guards para autenticação e autorização

## Frontend
- Componentização
- Separação de responsabilidades (UI vs lógica)
- Uso de stores centralizadas (Pinia)
- Controle de acesso via rotas
- Arquitetura modular (feature-based)
---

# 🧪 Estratégia de Testes

## Backend
- Testes unitários (services)
- Testes de integração (controllers + banco)
- Mock de dependências externas

## Frontend
- Testes E2E com Playwright
- Cobertura de fluxos
- Mock de dependências externas 
---

# 🤖 Diretrizes para IA

- Sempre seguir padrões do NestJS e Vue 3
- Utilizar TypeScript em toda a aplicação
- Criar DTOs para qualquer entrada no backend
- Garantir validação com class-validator
- Utilizar Pinia para estado global
- Criar testes sempre que possível