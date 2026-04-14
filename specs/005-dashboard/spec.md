# Especificação de Funcionalidade: Dashboard

**Feature Branch**: `main`  
**Criado**: 2026-04-14  
**Status**: Rascunho  
**Input**: Sistema de Gerenciamento de Estoque - Módulo de Dashboard (PRD)

## Cenários de Uso e Testes *(obrigatório)*

### User Story 1 - Visão Geral do Estoque (Prioridade: P3)

Como usuário do sistema, desejo visualizar um resumo geral do estado do estoque para ter uma visão rápida da situação atual.

**Por que esta prioridade**: Dashboard é uma funcionalidade complementar que facilita a gestão, mas não é essencial para as operações básicas de estoque.

**Teste Independente**: Pode ser testado acessando o dashboard e verificando se os totais estão corretos.

**Cenários de Aceitação**:

1. **Dado** que existem produtos cadastrados, **Quando** acesso o dashboard, **Então** o sistema deve exibir o total de produtos cadastrados.
2. **Dado** que existem movimentações registradas, **Quando** acesso o dashboard, **Então** o sistema deve exibir o valor total em estoque (soma de quantidade × preço de todos os produtos).
3. **Dado** que acesso o dashboard, **Quando** visualizo as informações, **Então** os dados devem estar sempre atualizados (tempo real ou próximo do real).

---

### User Story 2 - Produtos com Baixo Estoque no Dashboard (Prioridade: P3)

Como usuário do sistema, desejo ver os produtos mais críticos diretamente no dashboard para priorizar minha atenção.

**Por que esta prioridade**: Facilita a identificação rápida de problemas sem precisar navegar para outras telas.

**Teste Independente**: Pode ser testado verificando se produtos em estado crítico aparecem no dashboard.

**Cenários de Aceitação**:

1. **Dado** que existem produtos em estado crítico, **Quando** acesso o dashboard, **Então** o sistema deve exibir uma seção com os produtos que precisam de atenção prioritária.
2. **Dado** que os produtos críticos são ordenados, **Quando** visualizo o dashboard, **Então** os mais urgentes devem aparecer no topo (menor estoque relativo).
3. **Dado** que não há produtos críticos, **Quando** acesso o dashboard, **Então** o sistema deve exibir mensagem indicando que tudo está em ordem.

---

### User Story 3 - Movimentações Recentes (Prioridade: P3)

Como usuário do sistema, desejo visualizar as últimas movimentações realizadas para acompanhar a atividade do estoque.

**Por que esta prioridade**: Acompanhar movimentações recentes ajuda a entender o que está acontecendo no estoque.

**Teste Independente**: Pode ser testado verificando se as últimas movimentações aparecem no dashboard.

**Cenários de Aceitação**:

1. **Dado** que existem movimentações registradas, **Quando** acesso o dashboard, **Então** o sistema deve exibir as últimas 10 movimentações realizadas.
2. **Dado** que visualizo as movimentações recentes, **Quando** examino cada item, **Então** devo ver: tipo da movimentação, produto afetado, quantidade e timestamp.
3. **Dado** que não há movimentações registradas, **Quando** acesso o dashboard, **Então** o sistema deve exibir mensagem indicando ausência de movimentações.

---

### User Story 4 - Indicadores de Desempenho (Prioridade: P3)

Como Gerente ou Administrador, desejo ver indicadores de desempenho do sistema para avaliar a eficiência das operações.

**Por que esta prioridade**: Métricas auxiliam na tomada de decisão e melhoria contínua.

**Teste Independente**: Pode ser testado verificando se os indicadores são calculados corretamente.

**Cenários de Aceitação**:

1. **Dado** que existem dados no sistema, **Quando** acesso o dashboard, **Então** o sistema deve exibir o número de produtos com estoque adequado vs. críticos.
2. **Dado** que existem movimentações, **Quando** acesso o dashboard, **Então** o sistema deve exibir a quantidade de movimentações do dia/semana.
3. **Dado** que existem alertas, **Quando** acesso o dashboard, **Então** o sistema deve exibir a quantidade de alertas pendentes vs. resolvidos.

---

### User Story 5 - Refresh do Dashboard (Prioridade: P4)

Como usuário do sistema, desejo poder atualizar os dados do dashboard para ver informações mais recentes.

**Por que esta prioridade**: Funcionalidade de conveniência para quando o usuário suspeita de dados desatualizados.

**Teste Independente**: Pode ser testado atualizando o dashboard e verificando se novos dados aparecem.

**Cenários de Aceitação**:

1. **Dado** que estou no dashboard, **Quando** clico no botão de atualizar, **Então** o sistema deve recarregar todos os dados exibidos.
2. **Dado** que a atualização está em progresso, **Quando** visualizo o dashboard, **Então** o sistema deve exibir indicador de carregamento.

---

### Casos Extremos

- O que acontece se o valor total em estoque não puder ser calculado (produtos sem preço)?
- Como o dashboard se comporta com muitos produtos (1000+)?
- O que acontece se uma movimentação for registrada enquanto o usuário visualiza o dashboard?
- Como são tratados produtos desativados no cálculo de totais?

---

## Requisitos *(obrigatório)*

### Requisitos Funcionais

- **RF-001**: O sistema DEVE exibir um dashboard com visão geral do estoque.
- **RF-002**: O sistema DEVE mostrar o total de produtos cadastrados.
- **RF-003**: O sistema DEVE mostrar o valor total em estoque (soma de quantidade × preço).
- **RF-004**: O sistema DEVE exibir produtos com estoque crítico (quando houver).
- **RF-005**: O sistema DEVE exibir as movimentações mais recentes.
- **RF-006**: O sistema DEVE permitir atualização manual dos dados do dashboard.
- **RF-007**: O dashboard DEVE carregar em até 10 segundos mesmo com 1000+ produtos.
- **RF-008**: Todos os usuários PODEM acessar o dashboard.

### Entidades Principais

Esta especificação não define novas entidades, apenas visualiza dados existentes (Produtos, Movimentações, Alertas).

---

## Critérios de Sucesso *(obrigatório)*

### Resultados Mensuráveis

- **CS-001**: Dashboard carrega completamente em até 10 segundos com 1000 produtos.
- **CS-002**: Usuário consegue identificar o estado geral do estoque em até 15 segundos.
- **CS-003**: Produtos críticos são claramente destacados e identificáveis em até 5 segundos.
- **CS-004**: Atualização do dashboard completa em até 5 segundos.
- **CS-005**: Indicadores são 100% precisos em relação aos dados do banco.

---

## Suposições

- Dashboard é uma visualização (read-only), não permite operações diretas.
- Produtos sem preço definido não são incluídos no cálculo de valor total.
- Produtos desativados (soft delete) não são incluídos nas contagens e totais.
- "Tempo real" significa atualização a cada 30 segundos ou sob demanda.
- Não há gráficos ou visualizações avançadas na V1 (apenas listas e números).
