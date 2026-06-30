import { Request, Response } from "express";
import { AccountService } from "../services/AccountService";

export class AccountController {
    private accountService = new AccountService();

    listAccounts = (req: Request, res: Response): Response => {
        const accounts = this.accountService.listAccounts();

        return res.status(200).json(accounts);
    };

    getAccountById = (req: Request, res: Response): Response => {
        try {
            const id = Number(req.params.id);
            const account = this.accountService.getAccountById(id);

            return res.status(200).json(account);
        } catch (error) {
            return res.status(404).json({
                message: error instanceof Error ? error.message : "Erro ao buscar conta."
            });
        }
    };

    withdraw = (req: Request, res: Response): Response => {
        try {
            const id = Number(req.params.id);
            const amount = Number(req.body.amount);

            const result = this.accountService.withdraw(id, amount);

            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({
                message:
                    error instanceof Error ? error.message : "Erro ao realizar saque."
            });
        }
    };

    transfer = (req: Request, res: Response): Response => {
        try {
            const fromAccountId = Number(req.body.fromAccountId);
            const toAccountId = Number(req.body.toAccountId);
            const amount = Number(req.body.amount);

            const result = this.accountService.transfer(
                fromAccountId,
                toAccountId,
                amount
            );

            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({
                message:
                    error instanceof Error
                        ? error.message
                        : "Erro ao realizar transferência."
            });
        }
    };

    deposit = (req: Request, res: Response): Response => {
        try {
            const id = Number(req.params.id);
            const amount = Number(req.body.amount);

            const result = this.accountService.deposit(id, amount);

            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({
                message:
                    error instanceof Error ? error.message : "Erro ao realizar depósito."
            });
        }
    };
}