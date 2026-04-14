# 📦 PRD — Sistema de Gerenciamento de Estoque

## 1. 📌 Visão Geral

O objetivo deste projeto é desenvolver um sistema de gerenciamento de estoque completo para pequenas e médias empresas, permitindo o controle eficiente de produtos, movimentações e níveis de estoque em tempo real.

O sistema será uma aplicação web com possibilidade de expansão futura para mobile, focada em usabilidade, rastreabilidade e redução de erros operacionais.

---

## 2. ❗ Problema

Muitas pequenas e médias empresas ainda realizam o controle de estoque de forma manual ou utilizando planilhas, o que gera problemas como:

* Falta de controle preciso de entrada e saída de produtos
* Erros humanos frequentes
* Dificuldade em rastrear movimentações
* Ausência de alertas de estoque baixo
* Perda de vendas por falta de produtos

---

## 3. 🎯 Objetivos

### Objetivos principais

* Permitir controle de estoque em tempo real
* Garantir rastreabilidade completa das movimentações
* Reduzir erros manuais
* Facilitar a gestão de produtos

### Objetivos secundários

* Melhorar tomada de decisão com base em dados
* Possibilitar escalabilidade futura (multi-empresa, integrações)

---

## 4. 👤 Usuários / Personas

### 1. Administrador

* Gerencia usuários
* Acesso total ao sistema

### 2. Gerente de Estoque

* Controla produtos e movimentações
* Visualiza relatórios

### 3. Operador

* Realiza entrada e saída de produtos
* Acesso limitado

---

## 5. 📚 Funcionalidades

### 5.1 Gestão de Produtos

* Criar produto
* Editar produto
* Deletar produto
* Listar produtos
* Campos:

  * Nome
  * SKU (único)
  * Descrição
  * Categoria
  * Preço
  * Quantidade em estoque
  * Estoque mínimo

---

### 5.2 Movimentações de Estoque

* Registrar entrada de produto
* Registrar saída de produto
* Histórico completo de movimentações
* Tipos de movimentação:

  * Entrada
  * Saída
  * Ajuste manual

---

### 5.3 Controle de Estoque

* Atualização automática do estoque
* Validação para impedir estoque negativo
* Visualização de estoque atual

---

### 5.4 Alertas

* Alerta de estoque baixo
* Destaque visual em produtos críticos

---

### 5.5 Gestão de Usuários

* Cadastro de usuários
* Autenticação (login)
* Controle de permissões por perfil

---

### 5.6 Dashboard (Opcional na V1, mas recomendado)

* Visão geral do estoque
* Produtos com baixo estoque
* Movimentações recentes

---

## 6. 🧭 Fluxos de Uso

### Fluxo 1 — Cadastro de Produto

1. Usuário acessa tela de produtos
2. Clica em "Criar produto"
3. Preenche dados obrigatórios
4. Salva produto
5. Produto aparece na listagem

---

### Fluxo 2 — Entrada de Estoque

1. Usuário seleciona produto
2. Clica em "Adicionar estoque"
3. Informa quantidade
4. Confirma operação
5. Estoque é atualizado
6. Movimentação é registrada

---

### Fluxo 3 — Saída de Estoque

1. Usuário seleciona produto
2. Clica em "Remover estoque"
3. Informa quantidade
4. Sistema valida estoque disponível
5. Confirma operação
6. Estoque é atualizado
7. Movimentação é registrada

---

### Fluxo 4 — Alerta de Estoque Baixo

1. Sistema verifica estoque mínimo
2. Produto entra em estado crítico
3. Usuário visualiza alerta no sistema

---

## 7. 📏 Regras de Negócio

* SKU deve ser único
* Produto deve ter nome obrigatório
* Estoque não pode ser negativo
* Toda movimentação deve ser registrada
* Não é permitido deletar produto com histórico de movimentações (opcional: soft delete)
* Apenas usuários autorizados podem realizar movimentações
* Apenas administradores podem gerenciar usuários

---

## 8. 🚫 Fora do Escopo (V1)

* Integração com ERPs externos
* Sistema multi-empresa
* Controle de fornecedores
* Controle financeiro
* API pública
* Aplicativo mobile

---

## 9. 📊 Métricas de Sucesso

* Redução de inconsistências no estoque
* Tempo médio para registrar movimentações
* Número de produtos gerenciados
* Frequência de uso do sistema
* Quantidade de alertas de estoque baixo resolvidos

---

## 10. 🧩 Considerações Técnicas (Alto Nível)

* Aplicação web (frontend + backend)
* Backend com API REST
* Autenticação baseada em token (JWT)
* Banco de dados NoSQL
* Estrutura preparada para testes automatizados

---

## 11. 🔐 Permissões (Resumo)

| Ação                   | Admin | Gerente | Operador |
| ---------------------- | ----- | ------- | -------- |
| Gerenciar usuários     | ✅     | ❌       | ❌        |
| Criar/editar produto   | ✅     | ✅       | ❌        |
| Registrar movimentação | ✅     | ✅       | ✅        |
| Visualizar estoque     | ✅     | ✅       | ✅        |

---

## 12. 🔮 Possíveis Evoluções Futuras

* Multi-empresa (multi-tenant)
* Integração com sistemas externos
* Relatórios avançados
* API pública
* Aplicativo mobile
* Integração com código de barras

---
