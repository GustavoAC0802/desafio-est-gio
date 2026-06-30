import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "./service/api";
import type { Account } from "./types/account";
import "./App.css";

interface ApiErrorResponse {
  message: string;
}

type MessageType = "success" | "error" | "";

function App() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccountId, setSelectedAccountId] = useState("");
  const [toAccountId, setToAccountId] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<MessageType>("");

  async function loadAccounts() {
    try {
      const response = await api.get<Account[]>("/accounts");
      setAccounts(response.data);
    } catch {
      setMessage("Erro ao carregar contas. Verifique se o backend está rodando.");
      setMessageType("error");
    }
  }

  useEffect(() => {
    async function fetchAccounts() {
      try {
        const response = await api.get<Account[]>("/accounts");

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setAccounts(response.data);
      } catch {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMessage("Erro ao carregar contas. Verifique se o backend está rodando.");

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMessageType("error");
      }
    }

    void fetchAccounts();
  }, []);

  function getErrorMessage(error: unknown, defaultMessage: string) {
    if (axios.isAxiosError<ApiErrorResponse>(error)) {
      return error.response?.data?.message || defaultMessage;
    }

    return defaultMessage;
  }

  async function handleWithdraw() {
    try {
      setMessage("");
      setMessageType("");

      await api.post(`/accounts/${selectedAccountId}/withdraw`, {
        amount: Number(amount)
      });

      setMessage("Saque realizado com sucesso.");
      setMessageType("success");
      setAmount("");
      await loadAccounts();
    } catch (error: unknown) {
      setMessage(getErrorMessage(error, "Erro ao realizar saque."));
      setMessageType("error");
    }
  }

  async function handleDeposit() {
    try {
      setMessage("");
      setMessageType("");

      await api.post(`/accounts/${selectedAccountId}/deposit`, {
        amount: Number(amount)
      });

      setMessage("Depósito realizado com sucesso.");
      setMessageType("success");
      setAmount("");
      await loadAccounts();
    } catch (error: unknown) {
      setMessage(getErrorMessage(error, "Erro ao realizar depósito."));
      setMessageType("error");
    }
  }

  async function handleTransfer() {
    try {
      setMessage("");
      setMessageType("");

      await api.post("/accounts/transfer", {
        fromAccountId: Number(selectedAccountId),
        toAccountId: Number(toAccountId),
        amount: Number(amount)
      });

      setMessage("Transferência realizada com sucesso.");
      setMessageType("success");
      setAmount("");
      setToAccountId("");
      await loadAccounts();
    } catch (error: unknown) {
      setMessage(getErrorMessage(error, "Erro ao realizar transferência."));
      setMessageType("error");
    }
  }

  function formatCurrency(value: number) {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });
  }

  function getAccountTypeLabel(type: string) {
    return type === "corrente" ? "Conta Corrente" : "Conta Poupança";
  }

  return (
    <main className="container">
      <header className="header">
        <span className="tag">Desafio Técnico — Banco</span>
        <h1>Banco Digital</h1>
        <p>Aplicação fullstack para operações bancárias.</p>
      </header>

      <div className="content">
        <section className="accounts-section">
          <div className="section-header">
            <h2>Contas</h2>
            <p>Visualize os saldos e tipos de conta disponíveis.</p>
          </div>

          <div className="cards">
            {accounts.map((account) => (
              <div className="card" key={account.id}>
                <div className="card-top">
                  <h3>{account.holder}</h3>
                  <span className={`badge ${account.type}`}>
                    {getAccountTypeLabel(account.type)}
                  </span>
                </div>

                <p className="account-id">ID da conta: {account.id}</p>

                <p className={account.balance < 0 ? "negative" : "balance"}>
                  {formatCurrency(account.balance)}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="operation-box">
          <div className="section-header">
            <h2>Operações</h2>
            <p>Selecione a conta, informe o valor e execute a operação.</p>
          </div>

          <label htmlFor="originAccount">Conta de origem</label>
          <select
            id="originAccount"
            value={selectedAccountId}
            onChange={(event) => setSelectedAccountId(event.target.value)}
          >
            <option value="">Selecione uma conta</option>
            {accounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.id} - {account.holder} ({account.type})
              </option>
            ))}
          </select>

          <label htmlFor="amount">Valor</label>
          <input
            id="amount"
            type="number"
            min="0"
            placeholder="Digite o valor"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />

          <div className="buttons">
            <button
              className="btn primary"
              onClick={handleWithdraw}
              disabled={!selectedAccountId || !amount}
            >
              Sacar
            </button>

            <button
              className="btn secondary"
              onClick={handleDeposit}
              disabled={!selectedAccountId || !amount}
            >
              Depositar
            </button>
          </div>

          <div className="transfer-area">
            <h3>Transferência</h3>

            <label htmlFor="destinationAccount">Conta de destino</label>
            <select
              id="destinationAccount"
              value={toAccountId}
              onChange={(event) => setToAccountId(event.target.value)}
            >
              <option value="">Selecione a conta de destino</option>
              {accounts.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.id} - {account.holder} ({account.type})
                </option>
              ))}
            </select>

            <button
              className="btn transfer-button"
              onClick={handleTransfer}
              disabled={!selectedAccountId || !toAccountId || !amount}
            >
              Transferir
            </button>
          </div>

          {message && (
            <p className={`message ${messageType === "error" ? "error" : "success"}`}>
              {message}
            </p>
          )}
        </section>
      </div>
    </main>
  );
}

export default App;