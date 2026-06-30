export type AccountType = "corrente" | "poupanca";

export interface Account {
  id: number;
  holder: string;
  type: AccountType;
  balance: number;
}