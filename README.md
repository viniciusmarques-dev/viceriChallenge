# 📋TO-DO List

Aplicação full stack de gerenciamento de tarefas (TO-DO) com cadastro, login e gerenciamento de tarefas por usuário.

## 🧩 Tecnologias Utilizadas

### Front-end (Angular)
- Angular
- TypeScript
- Angular Router
- CSS

---

### Back-end (Node.js)
- Node.js
- Express
- Prisma ORM
- SQLite

---

## 🛠️ Requisitos

- Node.js (v18+ recomendado)
- Angular CLI (`npm install -g @angular/cli`)
- SQLite3 (ou outro banco de dados, como PostgreSQL)
- Git

---

## 🚀 Como rodar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/viniciusmarques-dev/viceriChallenge
cd viceriChallenge
```

### 2. Instalando as dependências do backend
```bash
cd server
npm install
npx prisma migrate dev --first-migrate init
npx prisma generate
npm run dev
```

### 2. Instalando as dependências do frontend
```bash
npm install
ng serve
```



