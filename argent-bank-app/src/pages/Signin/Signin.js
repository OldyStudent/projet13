import "./Signin.css";
import { SignInForm } from "../../components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loginThunk,
  USER_LOGIN_FULFILLED,
} from "../../store/thunks/loginThunk";

/**
 * Sign-in Page component.
 * It allows users to log in using their username and password
 * @returns {JSX.Element}: The JSX element representing the SignIn component
 */
export default function Signin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, error } = useSelector((state) => state.user);

  /**
   * Handles the login process when the user submits the login form
   * @param {string} username: The given username
   * @param {string} password: The given password
   */
  const handleLogin = async (username, password) => {
    if (!username || !password) {
      return;
    }

    const action = await dispatch(loginThunk({ username, password }));
    if (action.type === USER_LOGIN_FULFILLED) {
      navigate("/profile");
    }
  };

  return (
    <main className="Signin">
      <SignInForm
        handleLogin={handleLogin}
        isLoading={isLoading}
        errorMessage={error}
      />
    </main>
  );
}
