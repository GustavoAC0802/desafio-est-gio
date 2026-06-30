# Minha Solução — Banco

Sistema fullstack desenvolvido para o Desafio Técnico — Banco do Processo Seletivo Agilize.

A aplicação permite visualizar contas bancárias e realizar operações de saque, depósito e transferência, respeitando as regras de negócio para conta corrente e conta poupança.

---

## Stack

- **Backend:** Node.js v22.19.0 + TypeScript
- **Frontend:** React + TypeScript + Vite
- **API:** Express
- **Comunicação HTTP:** Axios

---

## Pré-requisitos / dependências

Para executar o projeto, é necessário ter instalado:

- Node.js v22.19.0
- npm

As dependências do backend e do frontend devem ser instaladas separadamente com `npm install`.

---

## Como executar

Primeiro, acesse a pasta principal do projeto:

```bash
cd desafio-banco
```

---

## Backend (API)

Acesse a pasta do backend:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

Execute a API:

```bash
npm run dev
```

A API será executada em:

```txt
http://localhost:3000
```

Para verificar se o backend está rodando, acesse no navegador:

```txt
http://localhost:3000/accounts
```

---

## Frontend

Abra outro terminal e acesse novamente a pasta principal do projeto:

```bash
cd desafio-banco
```

Depois acesse a pasta do frontend:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Execute o frontend:

```bash
npm run dev
```

O frontend será executado em:

```txt
http://localhost:5173
```

---

## Execução rápida

Também é possível executar diretamente a partir da pasta onde está o projeto.

### Backend

```bash
cd desafio-banco/backend
npm install
npm run dev
```

### Frontend

Em outro terminal:

```bash
cd desafio-banco/frontend
npm install
npm run dev
```

---

## Exemplo de uso

Com backend e frontend rodando:

1. Acesse o frontend em `http://localhost:5173`.
2. Visualize as contas disponíveis na tela.
3. Selecione uma conta de origem.
4. Informe um valor.
5. Clique em uma das operações disponíveis:
   - Sacar
   - Depositar
   - Transferir

---

## Exemplo de saque em conta corrente

Ao realizar um saque em uma conta corrente, o sistema desconta o valor informado mais uma tarifa de R$ 1,00.

Exemplo:

```txt
Saldo inicial: R$ 1.000,00
Saque: R$ 100,00
Tarifa: R$ 1,00
Saldo final: R$ 899,00
```

---

## Exemplo de saque em conta poupança

Ao realizar um saque em uma conta poupança, não há cobrança de tarifa.

Exemplo:

```txt
Saldo inicial: R$ 800,00
Saque: R$ 100,00
Tarifa: R$ 0,00
Saldo final: R$ 700,00
```

---

## Regras de negócio implementadas

- Conta corrente cobra tarifa de R$ 1,00 por saque ou transferência.
- Conta corrente permite saldo negativo até R$ 500,00.
- Conta poupança não cobra tarifa.
- Conta poupança não permite saldo negativo.
- O saque foi implementado como operação obrigatória.
- A transferência foi implementada como funcionalidade opcional/diferencial.
- O depósito foi implementado como funcionalidade adicional.
- As regras de negócio ficam concentradas no backend.

---

## Endpoints da API

### Listar contas

```http
GET /accounts
```

### Buscar conta por ID

```http
GET /accounts/:id
```

### Realizar saque

```http
POST /accounts/:id/withdraw
```

Exemplo de corpo da requisição:

```json
{
  "amount": 100
}
```

### Realizar depósito

```http
POST /accounts/:id/deposit
```

Exemplo de corpo da requisição:

```json
{
  "amount": 100
}
```

### Realizar transferência

```http
POST /accounts/transfer
```

Exemplo de corpo da requisição:

```json
{
  "fromAccountId": 1,
  "toAccountId": 2,
  "amount": 50
}
```

---

## Observações

- Os dados das contas estão armazenados em memória no backend.
- Ao reiniciar o backend, os saldos voltam aos valores iniciais.
- A aplicação foi dividida em duas partes: backend e frontend.
- O frontend consome a API do backend para executar as operações.
- O projeto foi organizado com separação de responsabilidades entre routes, controllers, services, repositories e models.