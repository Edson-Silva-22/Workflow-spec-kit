# Especificação de Funcionalidade: Gestão de Produtos

**Feature Branch**: `main`  
**Criado**: 2026-04-14  
**Status**: Rascunho  
**Input**: Sistema de Gerenciamento de Estoque - Módulo de Gestão de Produtos (PRD)

## Cenários de Uso e Testes *(obrigatório)*

### User Story 1 - Cadastro de Produto (Prioridade: P1)

Como Gerente de Estoque ou Administrador, desejo cadastrar novos produtos no sistema para que possam ser gerenciados e comercializados.

**Por que esta prioridade**: O cadastro de produtos é a base para todo o controle de estoque. Sem produtos, não há o que gerenciar.

**Teste Independente**: Pode ser totalmente testado criando um produto com todos os campos obrigatórios e verificando sua aparição na listagem.

**Cenários de Aceitação**:

1. **Dado** que sou Gerente ou Administrador, **Quando** preencho todos os campos obrigatórios de um novo produto (nome, SKU único, quantidade inicial, estoque mínimo) e salvo, **Então** o sistema deve criar o produto e exibi-lo na listagem.
2. **Dado** que tento cadastrar um produto com SKU já existente, **Quando** salvo o formulário, **Então** o sistema deve exibir erro indicando SKU duplicado.
3. **Dado** que tento cadastrar um produto sem nome, **Quando** salvo o formulário, **Então** o sistema deve exibir erro indicando campo obrigatório.

---

### User Story 2 - Edição de Produto (Prioridade: P1)

Como Gerente de Estoque ou Administrador, desejo editar informações de produtos existentes para manter os dados atualizados.

**Por que esta prioridade**: Produtos frequentemente precisam de informações atualizadas (preço, descrição, categoria).

**Teste Independente**: Pode ser testado alterando campos de um produto existente e verificando se as alterações são salvas corretamente.

**Cenários de Aceitação**:

1. **Dado** que sou Gerente ou Administrador, **Quando** edito o preço de um produto existente e salvo, **Então** o sistema deve salvar a alteração e refletir na próxima visualização.
2. **Dado** que tento editar um produto sem ter permissão (Operador), **Quando** acesso a tela de edição, **Então** o sistema deve bloquear o acesso.

---

### User Story 3 - Listagem e Busca de Produtos (Prioridade: P1)

Como usuário do sistema, desejo visualizar todos os produtos cadastrados e poder buscá-los por nome ou SKU para encontrar rapidamente o que preciso.

**Por que esta prioridade**: A visualização e busca de produtos é essencial para todas as operações de estoque.

**Teste Independente**: Pode ser testado listando produtos e realizando buscas por diferentes critérios.

**Cenários de Aceitação**:

1. **Dado** que existem produtos cadastrados, **Quando** acesso a listagem, **Então** o sistema deve exibir todos os produtos ativos com suas informações principais.
2. **Dado** que existem produtos cadastrados, **Quando** busco por um nome específico, **Então** o sistema deve exibir apenas produtos que contenham o termo na busca.
3. **Dado** que existem produtos cadastrados, **Quando** busco por SKU, **Então** o sistema deve exibir o produto exato correspondente.
4. **Dado** que busco por um termo inexistente, **Quando** executo a busca, **Então** o sistema deve exibir mensagem indicando que nenhum produto foi encontrado.

---

### User Story 4 - Exclusão de Produto (Prioridade: P2)

Como Gerente de Estoque ou Administrador, desejo poder excluir produtos que não são mais comercializados para manter a base de dados atualizada.

**Por que esta prioridade**: Manter a base de produtos limpa e relevante é importante para a operação.

**Teste Independente**: Pode ser testado tentando excluir um produto sem histórico de movimentações.

**Cenários de Aceitação**:

1. **Dado** que existe um produto sem histórico de movimentações, **Quando** solicito a exclusão, **Então** o sistema deve remover o produto permanentemente.
2. **Dado** que existe um produto com histórico de movimentações, **Quando** solicito a exclusão, **Então** o sistema deve marcar o produto como inativo (soft delete) e preservá-lo na base de dados.
3. **Dado** que tento excluir um produto sem ter permissão (Operador), **Quando** acesso a opção de exclusão, **Então** o sistema deve ocultar ou desabilitar a opção.

---

### User Story 5 - Categorização de Produtos (Prioridade: P3)

Como Gerente de Estoque ou Administrador, desejo categorizar produtos para facilitar a organização e busca.

**Por que esta prioridade**: Categorização melhora a organização mas não é crítica para o funcionamento básico.

**Teste Independente**: Pode ser testado atribuindo categorias a produtos e filtrando por categoria.

**Cenários de Aceitação**:

1. **Dado** que um produto existe, **Quando** atribuo uma categoria a ele, **Então** o sistema deve salvar a informação e permitir filtragem por categoria.
2. **Dado** que existem produtos em diferentes categorias, **Quando** filtro por uma categoria específica, **Então** o sistema deve exibir apenas produtos daquela categoria.

---

### Casos Extremos

- O que acontece ao tentar editar o SKU de um produto existente?
- Como o sistema trata produtos desativados na listagem?
- O que acontece se a quantidade em estoque for maior que o estoque mínimo?
- Como o sistema valida o formato do SKU?

---

## Requisitos *(obrigatório)*

### Requisitos Funcionais

- **RF-001**: O sistema DEVE permitir o cadastro de produtos com os campos: Nome, SKU (único), Descrição, Categoria, Preço, Quantidade em estoque, Estoque mínimo.
- **RF-002**: O sistema DEVE validar que o SKU é único antes de salvar o produto.
- **RF-003**: O sistema DEVE validar que o campo Nome é obrigatório.
- **RF-004**: O sistema DEVE permitir edição de todos os campos do produto, exceto SKU após criação.
- **RF-005**: O sistema DEVE permitir listagem de todos os produtos ativos.
- **RF-006**: O sistema DEVE permitir busca de produtos por nome e SKU.
- **RF-007**: O sistema DEVE implementar soft delete para produtos com histórico de movimentações.
- **RF-008**: O sistema DEVE permitir exclusão permanente apenas para produtos sem histórico.
- **RF-009**: Apenas Administradores e Gerentes PODEM criar e editar produtos.
- **RF-010**: Operadores NÃO PODEM criar, editar ou excluir produtos.

### Entidades Principais

- **Produto**: Representa um item no estoque com Nome, SKU (único), Descrição, Categoria, Preço, Quantidade em estoque, Estoque mínimo e Status (ativo/inativo).

---

## Critérios de Sucesso *(obrigatório)*

### Resultados Mensuráveis

- **CS-001**: Cadastro de novo produto completo em até 60 segundos.
- **CS-002**: Busca de produto retorna resultados em até 2 segundos.
- **CS-003**: Sistema impede 100% dos cadastros com SKU duplicado.
- **CS-004**: Sistema impede 100% dos cadastros sem nome obrigatório.
- **CS-005**: Listagem de 100+ produtos carrega em até 5 segundos.

---

## Suposições

- O SKU será formatado como código alfanumérico de até 20 caracteres.
- O preço será armazenado com duas casas decimais.
- A quantidade em estoque será um número inteiro não negativo.
- Categorias são definidas por texto livre (sem hierarquia).
- Produtos desativados não aparecem na listagem principal mas podem ser filtrados.
