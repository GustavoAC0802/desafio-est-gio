import { Account } from "../models/Account";

let accounts: Account[] = [
  {
    id: 1,
    holder: "João Silva",
    type: "corrente",
    balance: 1000
  },
  {
    id: 2,
    holder: "Maria Souza",
    type: "poupanca",
    balance: 800
  },
  {
    id: 3,
    holder: "Carlos Oliveira",
    type: "corrente",
    balance: -200
  }
];

export class AccountRepository {
  findAll(): Account[] {
    return accounts;
  }

  findById(id: number): Account | undefined {
    return accounts.find(account => account.id === id);
  }

  update(updatedAccount: Account): Account {
    accounts = accounts.map(account =>
      account.id === updatedAccount.id ? updatedAccount : account
    );

    return updatedAccount;
  }
}