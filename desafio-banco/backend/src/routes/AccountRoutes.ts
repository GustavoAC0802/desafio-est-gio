import { Router } from "express";
import { AccountController } from "../controllers/AccountController";

const accountRoutes = Router();
const accountController = new AccountController();

accountRoutes.get("/accounts", accountController.listAccounts);
accountRoutes.get("/accounts/:id", accountController.getAccountById);
accountRoutes.post("/accounts/:id/withdraw", accountController.withdraw);
accountRoutes.post("/accounts/transfer", accountController.transfer);

export { accountRoutes };