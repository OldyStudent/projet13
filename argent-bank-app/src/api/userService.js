import axios from "axios";

const BASE_URL = "http://localhost:3001/api/v1";

const login = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/login`, {
      email,
      password,
    });
    return response.data.body;
  } catch (error) {
    const status = error.response?.status;
    switch (status) {
      case 400:
        throw new Error("Erreur : Les identifiants sont invalides.");
      case 500:
        throw new Error(
          "Erreur interne du serveur, veuillez réessayer plus tard.",
        );
      default:
        throw new Error(
          "Une erreur inconnue s’est produite. Veuillez réessayer plus tard",
        );
    }
  }
};

const getUserProfile = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Token introuvable !");
      return;
    }

    const response = await axios.post(`${BASE_URL}/user/profile`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.body;
  } catch (error) {
    const status = error.response?.status;
    switch (status) {
      case 400:
        throw new Error("Erreur : Token manquant.");
      case 401:
        localStorage.removeItem("token");
        throw new Error("Erreur : Token invalide");
      case 500:
        throw new Error(
          "Erreur interne du serveur, veuillez réessayer plus tard.",
        );
      default:
        throw new Error(
          "Problème de connexion réseau. Veuillez réessayer plus tard",
        );
    }
  }
};

const updateUserProfile = async (firstName, lastName) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("token introuvable !");
      return;
    }

    const response = await axios.put(
      `${BASE_URL}/user/profile`,
      { firstName, lastName },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data.body;
  } catch (error) {
    const status = error.response?.status;
    switch (status) {
      case 400:
        throw new Error("Erreur : Token invalide ou manquant.");
      case 500:
        throw new Error(
          "Erreur interne du serveur, veuillez réessayer plus tard.",
        );
      default:
        throw new Error(
          "Problème de connexion réseau. Veuillez réessayer plus tard",
        );
    }
  }
};

export const userService = {
  login,
  getUserProfile,
  updateUserProfile,
};
