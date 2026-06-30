import express from "express";
import cors from "cors";
import { accountRoutes } from "./routes/AccountRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "API do Desafio Técnico Banco está rodando."
  });
});

app.use(accountRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});