# Boas-vindas ao repositório do projeto de teste CRUD de Usuários!

<img width="810" height="735" alt="image" src="https://github.com/user-attachments/assets/42ba7e7f-71ef-4a8b-9375-24511eb3eb95" />


Seja muito bem-vindo(a) ao repositório do Projeto de test CRUD de Usuários! Aqui você encontrará informações sobre o que foi desenvolvido neste projeto, bem como os principais aprendizados adquiridos durante o processo. Para explorar o conteúdo, basta clicar nas seções abaixo. Boa leitura!


<br/>

<details>
  <summary><strong>👨‍💻 O que foi desenvolvido</strong></summary><br />

Neste projeto eu desenvolvi um sistema completo de CRUD (Create, Read, Update, Delete) de usuários, utilizando:

* **Vue.js** no front-end
* **Node.js + Express** no back-end
* **PostgreSQL** como banco de dados
* **Docker** para criação do ambiente

A aplicação permite que uma pessoa usuária seja capaz de:

* Criar novos usuários
* Visualizar usuários com paginação
* Pesquisar usuários por nome
* Atualizar dados de usuários
* Deletar usuários

</details>

<br/>

<details>
  <summary><strong>🧠 Habilidades desenvolvidas neste projeto</strong></summary><br />

Neste projeto, eu fui capaz de:

* Criar uma API RESTful com Node.js e Express
* Conectar uma aplicação com banco PostgreSQL
* Utilizar Docker para subir serviços
* Trabalhar com Vue.js (Composition API)
* Implementar paginação no back-end
* Implementar busca com query params
* Consumir API no front-end com `fetch`
* Organizar código em camadas (components, services, composables)
* Tratar erros de API (ex: email duplicado)

</details>

<br/>

<details>
  <summary><strong>⚙️ Como rodar o projeto</strong></summary><br />

## 📦 Pré-requisitos

Antes de começar, você precisa ter instalado:

* [Node.js](https://nodejs.org/)
* [Docker](https://www.docker.com/)
* [Git](https://git-scm.com/)

---

## 🐳 Subindo o banco com Docker

Na raiz do projeto, execute:

```bash
docker compose up -d
```

Isso irá subir um container PostgreSQL.

---

## 🧱 Configuração do banco

Após subir o container, conecte no banco:

```bash
docker exec -it crud_postgres psql -U postgres -d postgres
```

Crie o banco:

```sql
CREATE DATABASE crud_db;
\c crud_db;
```

Crie a tabela:

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL
);
```

---

## 🔧 Rodando o back-end

Entre na pasta:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

Crie um arquivo `.env`:

```env
PORT=3000
DB_HOST=127.0.0.1
DB_PORT=5433
DB_NAME=crud_db
DB_USER=postgres
DB_PASSWORD=postgres123
```

Inicie o servidor:

```bash
node src/server/server.js
```

Servidor rodando em:

```
http://localhost:3000
```

---

## 🌐 Rodando o front-end

Entre na pasta:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Inicie o projeto:

```bash
npm run dev
```

Acesse:

```
http://localhost:5173
```

---

</details>

<br/>

<details>
  <summary><strong>📡 Endpoints da API</strong></summary><br />

### 🔍 Listar usuários (com paginação e busca)

```http
GET /api/users?search=nome&page=1&limit=5
```

---

### ➕ Criar usuário

```http
POST /api/users
```

Body:

```json
{
  "name": "Robson Aires",
  "email": "robsonaires@outlook.com"
}
```

---

### ✏️ Atualizar usuário

```http
PUT /api/users/:id
```

---

### ❌ Deletar usuário

```http
DELETE /api/users/:id
```

</details>

<br/>

<details>
  <summary><strong>📁 Estrutura do projeto</strong></summary><br />

```bash
frontend/
  src/
    components/
    composables/
    services/
    views/

backend/
  src/
    server/
    db/

docker-compose.yml
```

</details>
