# Gerenciamento de Cidades RestAPI 
#### Visão Geral
Esta aplicação é projetada para gerenciar e controlar o relacionamento entre usuários, pessoas e cidades. Oferece uma plataforma intuitiva que permite aos usuários criar, editar, deletar e listar pessoas associadas a cidades específicas. Com essa funcionalidade, é possível ter um controle abrangente sobre os dados dos usuários e as cidades associadas.

#### Funcionalidades
**Gerenciamento de Usuários:** Administre informações de usuários com facilidade.

**Vinculação de Pessoas a Cidades:** Associe indivíduos a cidades específicas e gerencie essas informações de forma eficiente.

**CRUD Flexível:** Crie, edite, exclua e liste dados de forma simples e intuitiva.

**Integração com Front-end:** A aplicação oferece rotas HTTP REST API para facilitar a integração com sistemas de front-end, permitindo expansão e personalização.

#### Motivação
O desenvolvimento desta aplicação foi impulsionado pelo desejo de explorar práticas de Clean Code e a construção de arquiteturas organizadas para melhor distribuição do código. Foi uma oportunidade para aplicar e aprofundar conhecimentos na área de back-end, bem como na implementação de testes automatizados, assegurando a qualidade e a confiabilidade do software.

#### Contribuições
Contribuições para melhorar a aplicação são sempre bem-vindas.


## 🛠 Tecnologias

**Node.js:** Uma plataforma de desenvolvimento JavaScript do lado do servidor, conhecida por sua eficiência e escalabilidade.

**Express:** Um framework web para Node.js, utilizado para construir APIs web de forma rápida e com diversas funcionalidades.
**Jest:** Uma framework de testes JavaScript, escolhido pela sua simplicidade e suporte para testes de APIs e lógica de negócios.

**SQLite:** Um sistema de gerenciamento de banco de dados SQL leve, usado devido à sua facilidade de configuração e utilização em ambientes de desenvolvimento.

**Knex:** Um construtor de consultas SQL para Node.js, que simplifica a interação com o banco de dados SQLite e garante maior flexibilidade e segurança nas consultas.

## Instalando e Rodando Projeto

```bash
# Clone o repositório
$ git clone https://github.com/thmata/noderestapi-cities/

# Vá para o repositório
$ cd All.To

# Instale as dependências
$ yarn install

# Rode esse comando para iniciar o gerar as tabelas
$ yarn knex:migrate

# Rode esse comando para popular a tabela de cidades
$ yarn knex:seed

# Rode esse comando para iniciar o projeto em desenvolvimento
$ yarn dev

```
