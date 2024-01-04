import "./Signin.css";
import { useState } from "react";
import { SignInForm } from "../../components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginThunk } from "../../store/thunks/loginThunk";

/**
 * Sign-in Page component.
 * It allows users to log in using their username and password
 * @returns {JSX.Element}: The JSX element representing the SignIn component
 */
export default function Signin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  /**
   * Handles the login process when the user submits the login form
   * @param {string} username: The given username
   * @param {string} password: The given password
   */
  const handleLogin = async (username, password) => {
    setError("");
    setIsLoading(true);

    if (!username || !password) {
      setError("Veuillez renseigner tous les champs.");
      setIsLoading(false);
      return;
    }

    const errorMessage = await dispatch(loginThunk(username, password));
    setIsLoading(false);

    if (errorMessage) {
      setError(errorMessage);
    } else {
      navigate("/profile");
    }
  };

  return (
    <main className="Signin">
      <SignInForm
        handleLogin={handleLogin}
        isLoading={isLoading}
        error={error}
      />
    </main>
  );
}
