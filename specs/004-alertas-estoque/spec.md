# Especificação de Funcionalidade: Alertas de Estoque

**Feature Branch**: `main`  
**Criado**: 2026-04-14  
**Status**: Rascunho  
**Input**: Sistema de Gerenciamento de Estoque - Módulo de Alertas de Estoque (PRD)

## Cenários de Uso e Testes *(obrigatório)*

### User Story 1 - Visualizar Produtos com Estoque Baixo (Prioridade: P2)

Como usuário do sistema, desejo visualizar uma lista de produtos cujo estoque está igual ou abaixo do mínimo para saber quais itens precisam de reposição.

**Por que esta prioridade**: Alertas de estoque baixo são essenciais para evitar rupturas e perda de vendas, mas a visualização manual complementa o monitoramento automático.

**Teste Independente**: Pode ser testado criando produtos com estoque abaixo do mínimo e verificando se aparecem na lista de alertas.

**Cenários de Aceitação**:

1. **Dado** que um produto tem quantidade em estoque igual ao estoque mínimo definido, **Quando** acesso a lista de alertas, **Então** o produto deve aparecer na lista de produtos críticos.
2. **Dado** que um produto tem quantidade em estoque abaixo do estoque mínimo definido, **Quando** acesso a lista de alertas, **Então** o produto deve aparecer com destaque de alerta.
3. **Dado** que todos os produtos têm estoque acima do mínimo, **Quando** acesso a lista de alertas, **Então** o sistema deve exibir mensagem indicando que não há alertas pendentes.
4. **Dado** que um produto está na lista de alertas, **Quando** visualizo seus detalhes, **Então** o sistema deve exibir: nome, SKU, estoque atual, estoque mínimo e diferença (quanto falta).

---

### User Story 2 - Notificação Automática de Estoque Baixo (Prioridade: P2)

Como sistema, desejo notificar automaticamente quando um produto atinge o nível mínimo de estoque para que os responsáveis tomem ação rapidamente.

**Por que esta prioridade**: Notificações automáticas garantem que problemas de estoque sejam percebidos mesmo sem verificação manual constante.

**Teste Independente**: Pode ser testado simulando uma saída que leva o estoque abaixo do mínimo e verificando se a notificação é gerada.

**Cenários de Aceitação**:

1. **Dado** que uma saída de estoque resulta em quantidade igual ou inferior ao mínimo, **Quando** a movimentação é registrada, **Então** o sistema deve gerar um alerta para o produto.
2. **Dado** que um produto está em estado crítico e o alerta já foi gerado, **Quando** uma entrada é registrada que eleva o estoque acima do mínimo, **Então** o sistema deve marcar o alerta como resolvido.
3. **Dado** que múltiplos produtos estão em estado crítico, **Quando** acesso a central de alertas, **Então** os produtos devem estar ordenados por urgência (mais crítico primeiro).

---

### User Story 3 - Configurar Nível Mínimo de Estoque (Prioridade: P2)

Como Gerente ou Administrador, desejo definir o estoque mínimo de cada produto para customizar os níveis de alerta conforme a necessidade.

**Por que esta prioridade**: O estoque mínimo varia por produto e deve ser configurável para evitar alertas desnecessários ou tardios.

**Teste Independente**: Pode ser testado alterando o estoque mínimo de um produto e verificando quando o alerta é disparado.

**Cenários de Aceitação**:

1. **Dado** que um produto existe, **Quando** defino seu estoque mínimo como 10 unidades, **Então** o sistema deve armazenar o valor e usá-lo para comparação.
2. **Dado** que um produto tem estoque mínimo definido, **Quando** o altero para um valor maior que o estoque atual, **Então** o sistema deve gerar um alerta imediato.
3. **Dado** que um produto tem estoque mínimo definido como 0, **Quando** o estoque atual também é 0, **Então** o produto NÃO deve gerar alerta (0 é o mínimo esperado).

---

### User Story 4 - Acompanhar Resolução de Alertas (Prioridade: P3)

Como Gerente ou Administrador, desejo acompanhar o status dos alertas para saber quais problemas já foram resolvidos e quais ainda requerem atenção.

**Por que esta prioridade**: Acompanhamento de alertas ajuda na gestão do trabalho e na priorização de compras.

**Teste Independente**: Pode ser testado criando alertas e verificando seu status antes e depois da reposição de estoque.

**Cenários de Aceitação**:

1. **Dado** que um alerta foi gerado e ainda não foi tratado, **Quando** visualizo o alerta, **Então** seu status deve ser "Pendente".
2. **Dado** que um alerta foi resolvido com entrada de estoque, **Quando** visualizo o histórico de alertas, **Então** o alerta deve constar como "Resolvido" com data da resolução.
3. **Dado** que desejo ver todos os alertas de um período, **Quando** filtro por data, **Então** o sistema deve exibir alertas criados naquele período.

---

### Casos Extremos

- O que acontece quando o estoque mínimo é definido como valor negativo?
- Como o sistema trata alertas criados antes de uma mudança no estoque mínimo?
- O que acontece se o estoque mínimo for maior que o estoque atual no momento do cadastro?
- Como o sistema indica produtos que nunca tiveram alerta (estoque sempre adequado)?

---

## Requisitos *(obrigatório)*

### Requisitos Funcionais

- **RF-001**: O sistema DEVE identificar produtos com quantidade em estoque igual ou inferior ao estoque mínimo.
- **RF-002**: O sistema DEVE exibir uma lista de produtos em estado crítico com destaque visual.
- **RF-003**: O sistema DEVE gerar alertas automaticamente após cada movimentação que resulte em estado crítico.
- **RF-004**: O sistema DEVE resolver alertas automaticamente quando o estoque voltar a ficar acima do mínimo.
- **RF-005**: O sistema DEVE permitir a definição de estoque mínimo para cada produto.
- **RF-006**: O sistema DEVE ordenar alertas por nível de criticidade.
- **RF-007**: O sistema DEVE permitir que usuários visualizem o histórico de alertas por produto.
- **RF-008**: O sistema DEVE indicar a diferença entre estoque atual e estoque mínimo (quanto falta para repor).
- **RF-009**: O estoque mínimo DEVE ser um número inteiro não negativo.

### Entidades Principais

- **Alerta**: Representa uma notificação de estoque baixo com: ID único, Produto (referência), Data de criação, Data de resolução (se aplicável), Status (Pendente/Resolvido), Estoque no momento do alerta, Estoque mínimo configurado.

---

## Critérios de Sucesso *(obrigatório)*

### Resultados Mensuráveis

- **CS-001**: Alertas são gerados em até 5 segundos após a movimentação que causa estado crítico.
- **CS-002**: Lista de produtos críticos é atualizada em tempo real após movimentações.
- **CS-003**: 100% dos produtos com estoque abaixo do mínimo aparecem nos alertas.
- **CS-004**: Sistema resolve alertas automaticamente em até 5 segundos após reposição.
- **CS-005**: Usuários identificam rapidamente (em até 10 segundos) quais produtos precisam de reposição.

---

## Suposições

- O estoque mínimo é definido em unidades (quantidade, não valor).
- Um produto pode ter apenas um alerta pendente por vez.
- Quando o estoque volta a ficar acima do mínimo, o alerta é automaticamente resolvido.
- Não há limite para o número de alertas históricos armazenados.
- Produtos novos com estoque 0 e mínimo 0 não geram alerta.
