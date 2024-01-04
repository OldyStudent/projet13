import "./SignInForm.css";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

/**
 * SignIn Form Component
 * @param {function} handleLogin: Function to handle the login when the form is submitted
 * @param {boolean} isLoading: Indicates if a connection request is in progress
 * @param {string} error: The error message to display if a problem occurs
 * @returns {JSX.Element}: The JSX element representing the SignInForm component
 */

export default function SignInForm({ handleLogin, isLoading, error }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  /**
   * Handles the SignIn form submission.
   * @param {Event} e: The form submission event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(username.trim(), password.trim());
  };

  return (
    <section className="SignInForm">
      <FontAwesomeIcon icon={faUserCircle} size="xl" />
      <h1 className="SignInForm__title">Sign in</h1>

      {error && <div className="SignInForm__error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="SignInForm__input-wrapper">
          <label htmlFor="username">Username</label>
          <input
            type="description"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="SignInForm__input-wrapper">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="SignInForm__input-remember">
          <input type="checkbox" id="remember-me" />
          <label htmlFor="remember-me">Remember me</label>
        </div>

        <button
          type="submit"
          className="SignInForm__button"
          disabled={isLoading}
        >
          {isLoading ? "Connection in progress..." : "Sign in"}
        </button>
      </form>
    </section>
  );
}
