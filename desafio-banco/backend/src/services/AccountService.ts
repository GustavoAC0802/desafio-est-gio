import { Account } from "../models/Account";
import { AccountRepository } from "../repositories/AccountRepository";

interface WithdrawResult {
    message: string;
    fee: number;
    totalDebit: number;
    account: Account;
}

interface TransferResult {
    message: string;
    fee: number;
    totalDebit: number;
    fromAccount: Account;
    toAccount: Account;
}

export class AccountService {
    private accountRepository = new AccountRepository();

    listAccounts(): Account[] {
        return this.accountRepository.findAll();
    }

    getAccountById(id: number): Account {
        const account = this.accountRepository.findById(id);

        if (!account) {
            throw new Error("Conta não encontrada.");
        }

        return account;
    }

    withdraw(accountId: number, amount: number): WithdrawResult {
        if (!amount || amount <= 0) {
            throw new Error("O valor do saque deve ser maior que zero.");
        }

        const account = this.getAccountById(accountId);

        const fee = account.type === "corrente" ? 1 : 0;
        const totalDebit = amount + fee;

        this.validateDebit(account, totalDebit);

        account.balance -= totalDebit;

        const updatedAccount = this.accountRepository.update(account);

        return {
            message: "Saque realizado com sucesso.",
            fee,
            totalDebit,
            account: updatedAccount
        };
    }

    transfer(
        fromAccountId: number,
        toAccountId: number,
        amount: number
    ): TransferResult {
        if (!amount || amount <= 0) {
            throw new Error("O valor da transferência deve ser maior que zero.");
        }

        if (fromAccountId === toAccountId) {
            throw new Error("Não é possível transferir para a mesma conta.");
        }

        const fromAccount = this.getAccountById(fromAccountId);
        const toAccount = this.getAccountById(toAccountId);

        const fee = fromAccount.type === "corrente" ? 1 : 0;
        const totalDebit = amount + fee;

        this.validateDebit(fromAccount, totalDebit);

        fromAccount.balance -= totalDebit;
        toAccount.balance += amount;

        const updatedFromAccount = this.accountRepository.update(fromAccount);
        const updatedToAccount = this.accountRepository.update(toAccount);

        return {
            message: "Transferência realizada com sucesso.",
            fee,
            totalDebit,
            fromAccount: updatedFromAccount,
            toAccount: updatedToAccount
        };
    }

    private validateDebit(account: Account, totalDebit: number): void {
        if (account.type === "poupanca" && account.balance < totalDebit) {
            throw new Error(
                "Saldo insuficiente. Conta poupança não permite saldo negativo."
            );
        }

        if (account.type === "corrente" && account.balance - totalDebit < -500) {
            throw new Error(
                "Saldo insuficiente. Conta corrente permite saldo negativo apenas até R$ 500,00."
            );
        }
    }

    deposit(accountId: number, amount: number) {
        if (!amount || amount <= 0) {
            throw new Error("O valor do depósito deve ser maior que zero.");
        }

        const account = this.getAccountById(accountId);

        account.balance += amount;

        const updatedAccount = this.accountRepository.update(account);

        return {
            message: "Depósito realizado com sucesso.",
            amount,
            account: updatedAccount
        };
    }
}