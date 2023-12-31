const axios = require("axios");

const signupApi = "http://localhost:3001/api/v1/user/signup";
const createAccountApi = "http://localhost:3001/api/v1/accounts";
const createTransactionApi = "http://localhost:3001/api/v1/transactions";

const data = [
  {
    user: {
      firstName: "Tony",
      lastName: "Stark",
      email: "tony@stark.com",
      password: "password123",
    },
    accounts: [
      {
        title: "Argent Bank Checking (x8349)",
        balance: "2082.79",
        currency: "USD",
      },
      {
        title: "Argent Bank Savings (x6712)",
        balance: "10928.42",
        currency: "USD",
      },
      {
        title: "Argent Bank Credit Card (x8349)",
        balance: "184.30",
        currency: "USD",
      },
    ],
    transactions: [
      {
        description: "Achat en ligne",
        amount: "200.00",
        currency: "EUR",
        date: "2023-10-15",
        type: "Débit",
        category: "Shopping",
      },
    ],
  },
  // Ajoutez plus d'utilisateurs et leurs données comme nécessaire
];

const createUser = async (user) => {
  try {
    const response = await axios.post(signupApi, user);
    console.log("Utilisateur créé :", response.data);
    return response.data.body.id;
  } catch (error) {
    console.error("Erreur lors de la création de l’utilisateur :", error);
  }
};

const createAccount = async (userId, title, balance, currency) => {
  try {
    const accountData = {
      userId,
      title,
      balance,
      currency,
    };
    const response = await axios.post(createAccountApi, accountData);
    console.log("Compte créé :", response.data);
    return response.data.body.id;
  } catch (error) {
    console.error("Erreur lors de la création du compte :", error);
  }
};

const createTransaction = async (accountId, transaction) => {
  try {
    const transactionData = {
      accountId,
      ...transaction,
    };
    const response = await axios.post(createTransactionApi, transactionData);
    console.log("Transaction créée :", response.data);
  } catch (error) {
    console.error("Erreur lors de la création de la transaction :", error);
  }
};

const run = async () => {
  for (const item of data) {
    const userId = await createUser(item.user);
    if (userId) {
      for (const account of item.accounts) {
        const accountId = await createAccount(
          userId,
          account.title,
          account.balance,
          account.currency,
        );
        if (accountId) {
          for (const transaction of item.transactions) {
            await createTransaction(accountId, transaction);
          }
        }
      }
    }
  }
};

run();
