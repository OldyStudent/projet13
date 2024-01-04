import "./Signin.css";
import { useState } from "react";
import { userService } from "../../api/userService";
import { SignInForm } from "../../components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/userSlice";

export default function Signin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (username, password) => {
    setError("");
    setIsLoading(true);

    if (!username || !password) {
      setError("Veuillez renseigner tous les champs.");
      setIsLoading(false);
      return;
    }

    try {
      const loginData = await userService.login(username, password);
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
      <SignInForm
        handleLogin={handleLogin}
        isLoading={isLoading}
        error={error}
      />
    </main>
  );
}
