import axios from "axios";

const BASE_URL = "http://localhost:3001/api/v1";

/**
 * Log in a user with the provided email and password
 * @param {string} email: User email
 * @param {string} password: User password
 * @returns {Promise<object>}: A promise with the connection token if successful
 * @throws {Error}: Error if login fails with given error message
 */
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
        throw new Error("Erreur : identifiants incorrects.");
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

/**
 * Get the user's profile data
 * @returns {Promise<object>}: A promise with the user's profile data if successful
 * @throws {Error}: Error if retrieving the profile fails with given error message
 */
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

/**
 * Update the user's profile with the provided first name and last name.
 * @param {string} firstName: User first name
 * @param {string} lastName: User last name
 * @returns {Promise<object>}: A promise with the user's profile data if successful
 * @throws {Error}: Error if updating the profile fails with given error message
 */
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
