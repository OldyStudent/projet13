import "./Signin.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { userService } from "../../api/userService";

export default function Signin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const tUsername = username.trim();
    const tPassword = password.trim();

    if (!tUsername || !tPassword) {
      setError("Veuillez renseigner tous les champs.");
      return;
    }

    try {
      const loginData = await userService.login(tUsername, tPassword);
      localStorage.setItem("token", loginData.token);

      const userData = await userService.getUserProfile();
      dispatch(setUser(userData));
      navigate("/profile");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="Signin">
      <section className="sign-in-content">
        <FontAwesomeIcon icon={faUserCircle} size="lg" />
        <h1 className="Signin__title">Sign in</h1>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>

          <button type="submit" className="Signin__button" disabled={isLoading}>
            Sign in
          </button>
        </form>
      </section>
    </main>
  );
}
