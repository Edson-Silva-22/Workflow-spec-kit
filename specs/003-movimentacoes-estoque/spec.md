# Especificação de Funcionalidade: Movimentações de Estoque

**Feature Branch**: `main`  
**Criado**: 2026-04-14  
**Status**: Rascunho  
**Input**: Sistema de Gerenciamento de Estoque - Módulo de Movimentações de Estoque (PRD)

## Cenários de Uso e Testes *(obrigatório)*

### User Story 1 - Registrar Entrada de Estoque (Prioridade: P1)

Como Operador, Gerente ou Administrador, desejo registrar a entrada de produtos no estoque para manter o controle atualizado das quantidades.

**Por que esta prioridade**: A entrada de estoque é uma operação fundamental para manter o inventário atualizado.

**Teste Independente**: Pode ser testado registrando uma entrada de 10 unidades de um produto e verificando o aumento no estoque e o registro no histórico.

**Cenários de Aceitação**:

1. **Dado** que um produto existe no sistema, **Quando** registro uma entrada de 10 unidades, **Então** o estoque do produto deve aumentar em 10 unidades e uma movimentação de entrada deve ser registrada.
2. **Dado** que registro uma entrada, **Quando** informo a quantidade e usuário responsável, **Então** o sistema deve registrar automaticamente o timestamp da operação.
3. **Dado** que registro uma entrada, **Quando** finalizo a operação, **Então** o sistema deve exibir confirmação do sucesso.

---

### User Story 2 - Registrar Saída de Estoque (Prioridade: P1)

Como Operador, Gerente ou Administrador, desejo registrar a saída de produtos do estoque para manter o controle atualizado das quantidades.

**Por que esta prioridade**: A saída de estoque é essencial para rastrear vendas, consumo interno ou perdas.

**Teste Independente**: Pode ser testado registrando uma saída de 5 unidades de um produto com estoque suficiente e verificando a redução.

**Cenários de Aceitação**:

1. **Dado** que um produto tem estoque de 20 unidades, **Quando** registro uma saída de 5 unidades, **Então** o estoque deve reduzir para 15 unidades e uma movimentação de saída deve ser registrada.
2. **Dado** que um produto tem estoque de 3 unidades, **Quando** registro uma saída de 5 unidades, **Então** o sistema deve bloquear a operação e exibir erro indicando estoque insuficiente.
3. **Dado** que um produto tem estoque de 0 unidades, **Quando** registro qualquer saída, **Então** o sistema deve bloquear a operação.

---

### User Story 3 - Ajuste Manual de Estoque (Prioridade: P2)

Como Gerente ou Administrador, desejo realizar ajustes manuais no estoque para corrigir inconsistências identificadas durante inventários.

**Por que esta prioridade**: Ajustes manuais são necessários para corrigir erros de contagem ou perdas não registradas.

**Teste Independente**: Pode ser testado realizando um ajuste que aumenta ou reduz o estoque e verificando o valor final.

**Cenários de Aceitação**:

1. **Dado** que um produto tem 100 unidades, **Quando** realizo um ajuste de +10 unidades, **Então** o estoque final deve ser 110 unidades.
2. **Dado** que um produto tem 100 unidades, **Quando** realizo um ajuste de -30 unidades, **Então** o estoque final deve ser 70 unidades.
3. **Dado** que um produto tem 50 unidades, **Quando** tento realizar um ajuste que resultaria em estoque negativo, **Então** o sistema deve bloquear o ajuste.
4. **Dado** que registro um ajuste, **Quando** informo o motivo do ajuste, **Então** o sistema deve registrar o motivo no histórico.

---

### User Story 4 - Consultar Histórico de Movimentações (Prioridade: P1)

Como Gerente ou Administrador, desejo consultar o histórico completo de movimentações para auditar e rastrear todas as operações realizadas.

**Por que esta prioridade**: A rastreabilidade é um princípio fundamental do sistema conforme a Constituição.

**Teste Independente**: Pode ser testado consultando o histórico de um produto específico ou por período.

**Cenários de Aceitação**:

1. **Dado** que existem movimentações registradas, **Quando** consulto o histórico por produto, **Então** o sistema deve exibir todas as movimentações daquele produto em ordem cronológica.
2. **Dado** que existem movimentações registradas, **Quando** filtro por período, **Então** o sistema deve exibir apenas movimentações dentro do período especificado.
3. **Dado** que existem movimentações registradas, **Quando** filtro por tipo (entrada/saída/ajuste), **Então** o sistema deve exibir apenas movimentações do tipo selecionado.
4. **Dado** que existem movimentações registradas, **Quando** consulto uma movimentação específica, **Então** o sistema deve exibir: produto, tipo, quantidade, usuário responsável e timestamp.

---

### User Story 5 - Relatório de Movimentações (Prioridade: P3)

Como Gerente ou Administrador, desejo gerar relatórios de movimentações para análise e tomada de decisão.

**Por que esta prioridade**: Relatórios auxiliam na gestão e planejamento, mas não são críticos para a operação básica.

**Teste Independente**: Pode ser testado gerando um relatório e verificando se os dados estão corretos.

**Cenários de Aceitação**:

1. **Dado** que existem movimentações, **Quando** gero um relatório de entradas do mês, **Então** o sistema deve listar todas as entradas do período com totais.
2. **Dado** que existem movimentações, **Quando** gero um relatório por produto, **Então** o sistema deve exibir o resumo de todas as movimentações do produto.

---

### Casos Extremos

- O que acontece ao tentar registrar saída com quantidade zero?
- Como o sistema trata movimentações simultâneas no mesmo produto?
- O que acontece se o sistema falhar durante o registro de uma movimentação?
- Como é feita a validação de quantidade negativa na entrada?

---

## Requisitos *(obrigatório)*

### Requisitos Funcionais

- **RF-001**: O sistema DEVE registrar toda entrada de estoque com: produto, quantidade, usuário responsável e timestamp.
- **RF-002**: O sistema DEVE registrar toda saída de estoque com: produto, quantidade, usuário responsável e timestamp.
- **RF-003**: O sistema DEVE registrar todo ajuste manual com: produto, quantidade anterior, nova quantidade, motivo, usuário responsável e timestamp.
- **RF-004**: O sistema DEVE bloquear saídas que resultem em estoque negativo.
- **RF-005**: O sistema DEVE calcular automaticamente o novo estoque após cada movimentação.
- **RF-006**: O sistema DEVE permitir consulta do histórico de movimentações por produto.
- **RF-007**: O sistema DEVE permitir consulta do histórico de movimentações por período.
- **RF-008**: O sistema DEVE permitir consulta do histórico de movimentações por tipo.
- **RF-009**: O sistema DEVE exibir estoque atual junto com cada registro de movimentação.
- **RF-010**: Ajustes manuais DEVEM requerer justificativa/motivo.
- **RF-011**: Apenas Administradores e Gerentes PODEM realizar ajustes manuais.

### Entidades Principais

- **Movimentação**: Representa uma operação no estoque com: ID único, Produto (referência), Tipo (Entrada/Saída/Ajuste), Quantidade, Quantidade anterior (para ajustes), Estoque resultante, Usuário responsável, Timestamp, Motivo (para ajustes).

---

## Critérios de Sucesso *(obrigatório)*

### Resultados Mensuráveis

- **CS-001**: Registro de movimentação completa em até 5 segundos.
- **CS-002**: Sistema impede 100% das tentativas de estoque negativo.
- **CS-003**: Todas as movimentações são registradas com timestamp preciso.
- **CS-004**: Consulta de histórico retorna resultados em até 3 segundos para períodos de até 1 ano.
- **CS-005**: Rastreabilidade completa: qualquer produto pode ter seu histórico consultado desde a criação.

---

## Suposições

- Movimentações são operações atômicas (ou tudo é salvo ou nada).
- O timestamp das movimentações usa o fuso horário local do servidor.
- A quantidade de movimentação é sempre um número inteiro positivo.
- Histórico de movimentações é imutável (não pode ser editado ou apagado).
- Operações simultâneas no mesmo produto são tratadas com bloqueios de concorrência.
