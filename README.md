# my-finances
Personal project to manage finances.

# **Documentação do Projeto - Organizador Financeiro**

## **1. Visão Geral**

O projeto tem como objetivo criar uma aplicação web para organizar finanças pessoais, permitindo que os usuários carreguem extratos bancários, analisem suas transações e gerenciem gastos.

A solução será baseada em uma arquitetura **full stack** utilizando:

- **Front-end:** Angular
- **Back-end:** Node.js (Express.js)
- **Banco de Dados:** MySQL
- **Processamento de Dados:** Python (FastAPI)
- **Autenticação e Autorização:** JWT com papéis de usuário (Admin e Analista)
- **Containers:** Docker e Docker Compose para orquestração dos serviços
- **Padrão de Design:** MVC (Model-View-Controller) no backend para organizar a estrutura do código
- **Testes:** Testes integrados no backend utilizando Jest e Supertest

---

## **2. Arquitetura e Fluxo do Projeto**

**Fluxo Geral:**

1. Usuário acessa a aplicação Angular.
2. Faz login via API de autenticação (Node.js) com JWT.
3. A API valida credenciais e retorna um token JWT.
4. Com o token, o usuário acessa os dados financeiros armazenados no MySQL.
5. O backend Node.js pode chamar o serviço Python para processar extratos.
6. O serviço Python retorna os dados processados ao backend.
7. O backend envia os dados estruturados para o front-end.
8. O usuário pode visualizar e gerenciar suas finanças pela interface Angular.

---

## **3. Tecnologias Utilizadas**

### **Front-end (Angular)**

- Angular 17
- TypeScript
- RxJS
- Angular Material
- JWT para autenticação

### **Back-end (Node.js + Express.js)**

- Node.js (v18+)
- Express.js
- MySQL2 (para conexão com MySQL)
- JSON Web Token (JWT) para autenticação
- bcrypt.js para hash de senhas
- dotenv para variáveis de ambiente
- Jest e Supertest para testes integrados

### **Banco de Dados (MySQL)**

- MySQL 8
- Tabelas para **usuários**, **transações** e **categorias**

### **Serviço de Processamento (Python + FastAPI)**

- FastAPI
- Pandas (para processamento de arquivos CSV)
- Uvicorn (servidor ASGI)

### **Containerização (Docker)**

- Docker para isolamento dos serviços
- Docker Compose para orquestração

---

## **4. Estrutura do Projeto**

### **Backend (Node.js - Padrão MVC)**

```
backend/
|-- src/
|   |-- controllers/
|   |-- middleware/
|   |-- models/
|   |-- routes/
|   |-- config/
|   |-- tests/
|-- server.js
|-- package.json
|-- Dockerfile
```

### **Frontend (Angular)**

```
frontend/
|-- src/
|   |-- app/
|   |-- components/
|   |-- services/
|   |-- assets/
|-- angular.json
|-- package.json
|-- Dockerfile
```

### **Serviço Python (FastAPI)**

```
python-service/
|-- main.py
|-- requirements.txt
|-- Dockerfile
```

### **Orquestração com Docker Compose**

```
docker-compose.yml
```

---

## **5. Passo a Passo para Desenvolvimento**

### **1. Configurar Banco de Dados (MySQL)**

- Criar banco `financeiro_db`.
- Criar tabelas `users` e `transactions`.

### **2. Implementar Backend (Node.js)**

- Criar API de autenticação com JWT.
- Implementar CRUD de transações.
- Proteger rotas com autenticação e RBAC (roles: Admin, Analista).
- Implementar testes integrados com Jest e Supertest.

### **3. Criar Serviço Python (FastAPI)**

- Criar rota para processar extratos bancários.
- Retornar dados estruturados para o Node.js.

### **4. Desenvolver Frontend (Angular)**

- Criar tela de login com JWT.
- Criar dashboard financeiro.
- Integrar com backend via HTTP.

### **5. Containerização com Docker**

- Criar `Dockerfile` para cada serviço.
- Criar `docker-compose.yml` para subir todos os containers.

---

## **6. Próximos Passos**

1. Finalizar Backend e Autenticação.
2. Construir API de Transações.
3. Desenvolver Frontend Angular.
4. Integrar o Serviço Python.
5. Configurar Ambiente com Docker.
6. Implementar testes integrados para garantir qualidade do backend.
