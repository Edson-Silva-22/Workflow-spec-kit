# Especificação de Funcionalidade: Gestão de Usuários

**Feature Branch**: `main`  
**Criado**: 2026-04-14  
**Status**: Rascunho  
**Input**: Sistema de Gerenciamento de Estoque - Módulo de Gestão de Usuários (PRD)

## Cenários de Uso e Testes *(obrigatório)*

### User Story 1 - Autenticação de Usuário (Prioridade: P1)

Como usuário do sistema, desejo fazer login com minhas credenciais para acessar as funcionalidades permitidas pelo meu perfil.

**Por que esta prioridade**: A autenticação é o ponto de entrada para todas as demais funcionalidades. Sem login, nenhuma operação pode ser realizada.

**Teste Independente**: Pode ser totalmente testado simulando o fluxo de login com credenciais válidas e inválidas, verificando o acesso ou negação ao sistema.

**Cenários de Aceitação**:

1. **Dado** que o usuário possui credenciais válidas, **Quando** insere email e senha corretos, **Então** o sistema deve conceder acesso e redirecionar para a página inicial.
2. **Dado** que o usuário insere credenciais inválidas, **Quando** tenta fazer login, **Então** o sistema deve exibir mensagem de erro e negar o acesso.
3. **Dado** que o usuário está logado, **Quando** clica em "Sair", **Então** o sistema deve encerrar a sessão e redirecionar para a tela de login.

---

### User Story 2 - Gerenciamento de Usuários pelo Administrador (Prioridade: P1)

Como administrador do sistema, desejo cadastrar, editar e desativar usuários para controlar quem tem acesso ao sistema.

**Por que esta prioridade**: A gestão de usuários é essencial para o controle de acesso e segurança do sistema.

**Teste Independente**: Pode ser totalmente testado criando, editando e desativando usuários, verificando as permissões e o comportamento do sistema.

**Cenários de Aceitação**:

1. **Dado** que sou administrador, **Quando** cadastro um novo usuário com perfil, email e senha, **Então** o sistema deve criar o usuário e permitir seu acesso.
2. **Dado** que sou administrador, **Quando** edito os dados de um usuário existente, **Então** o sistema deve salvar as alterações e refletir na próxima autenticação.
3. **Dado** que sou administrador, **Quando** desativo um usuário ativo, **Então** o sistema deve impedir o login desse usuário.
4. **Dado** que sou Gerente ou Operador, **Quando** tento acessar a gestão de usuários, **Então** o sistema deve negar o acesso.

---

### User Story 3 - Recuperação de Senha (Prioridade: P2)

Como usuário do sistema, desejo poder recuperar minha senha em caso de esquecimento para não perder o acesso ao sistema.

**Por que esta prioridade**: Funcionalidade importante para continuidade de acesso, mas não bloqueia o uso do sistema se indisponível temporariamente.

**Teste Independente**: Pode ser testado solicitando recuperação de senha e verificando o envio do email com instruções.

**Cenários de Aceitação**:

1. **Dado** que esqueci minha senha, **Quando** clico em "Esqueci minha senha" e informo meu email cadastrado, **Então** o sistema deve enviar instruções de recuperação.
2. **Dado** que informo um email não cadastrado na recuperação, **Quando** solicito recuperação de senha, **Então** o sistema deve exibir mensagem indicando que o email não foi encontrado.

---

### User Story 4 - Gerenciamento de Perfis (Prioridade: P2)

Como administrador, desejo definir e alterar o perfil de cada usuário para garantir que tenham apenas as permissões necessárias.

**Por que esta prioridade**: O controle de perfis é fundamental para a segurança e organização do trabalho.

**Teste Independente**: Pode ser testado alterando o perfil de um usuário e verificando as permissões disponíveis.

**Cenários de Aceitação**:

1. **Dado** que sou administrador, **Quando** altero o perfil de um usuário para "Operador", **Então** o usuário deve perder acesso às funcionalidades de Gerente e Administrador.
2. **Dado** que sou administrador, **Quando** tento remover meu próprio perfil de administrador, **Então** o sistema deve bloquear a ação e exibir mensagem de erro.

---

### Casos Extremos

- O que acontece quando o administrador tenta desativar a si mesmo?
- Como o sistema trata tentativas de login simultâneo com as mesmas credenciais?
- O que acontece se o link de recuperação de senha expirar?
- Como o sistema identifica e rejeita emails duplicados no cadastro?

---

## Requisitos *(obrigatório)*

### Requisitos Funcionais

- **RF-001**: O sistema DEVE autenticar usuários através de email e senha.
- **RF-002**: O sistema DEVE manter sessões de usuário através de tokens JWT.
- **RF-003**: O sistema DEVE permitir que administradores cadastrem novos usuários.
- **RF-004**: O sistema DEVE permitir que administradores editem dados de usuários existentes.
- **RF-005**: O sistema DEVE permitir que administradores desativem usuários.
- **RF-006**: O sistema DEVE implementar três perfis de usuário: Administrador, Gerente de Estoque e Operador.
- **RF-007**: O sistema DEVE permitir recuperação de senha via email.
- **RF-008**: O sistema DEVE rejeitar emails duplicados no cadastro de usuários.
- **RF-009**: O sistema DEVE expirar tokens JWT após período de inatividade.
- **RF-010**: Apenas Administradores PODEM gerenciar usuários.
- **RF-011**: O sistema DEVE bloquear o administrador de desativar a si mesmo.

### Entidades Principais *(incluir se a funcionalidade envolve dados)*

- **Usuário**: Representa um usuário do sistema com email único, senha hashada, nome, perfil (Administrador/Gerente/Operador) e status (ativo/inativo).
- **Sessão**: Representa uma sessão ativa de usuário através de token JWT com timestamp de expiração.

---

## Critérios de Sucesso *(obrigatório)*

### Resultados Mensuráveis

- **CS-001**: Usuários conseguem fazer login em até 5 segundos com credenciais válidas.
- **CS-002**: Sistema nega acesso a 100% das tentativas de login com credenciais inválidas.
- **CS-003**: Administradores conseguem criar um novo usuário em até 30 segundos.
- **CS-004**: Alterações de perfil têm efeito imediato na próxima autenticação do usuário.
- **CS-005**: Sistema impede 100% das tentativas de acesso não autorizado à gestão de usuários.
- **CS-006**: Sistema bloqueia 100% das tentativas de auto-desativação do administrador.

---

## Clarificações

### Sessão 2026-04-14

- Q: Sistema de recuperação de senha - como enviar o email/token? → A: Console/Log apenas (V1) - logs de saída, sem envio real
- Q: Tempo de expiração do token JWT? → A: 1 hora
- Q: Administrador pode desativar a si mesmo? → A: Não - sistema bloqueia a ação

### Casos Extremos (Resolvidos)

- Administrador tenta desativar a si mesmo? → Sistema bloqueia a ação.
- Login simultâneo com as mesmas credenciais? → Apenas uma sessão ativa por vez.
- Link de recuperação de senha expira? → Expiração configurável (padrão: 15 minutos).
- Email duplicado no cadastro? → Sistema rejeita com mensagem clara.

## Suposições

- Os usuários possuem acesso à internet e podem receber emails.
- O sistema de envio de emails está configurado e funcional (V1: logs).
- O tempo de expiração do token JWT é de 1 hora.
- Não há integração com provedores de identidade externos (SSO) na V1.
- As senhas são armazenadas de forma segura (hash + salt).
