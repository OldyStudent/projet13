import "./Header.css";

import imgLogo from "../../assets/images/argent-bank-logo.png";
import { faUserCircle, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/slices/userSlice";
import { NavButton } from "../index";
import { Link } from "react-router-dom";

export default function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  /** Handles user logout. */
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logoutUser());
  };

  return (
    <header className="Header">
      <nav className="Header__nav">
        <Link to="/">
          <img
            src={imgLogo}
            alt="Argent Bank Logo"
            className="Header__nav__logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>

        <ul className="Header__nav__menu">
          {user ? (
            <>
              <li>
                <NavButton
                  to="/profile"
                  icon={faUserCircle}
                  label={user.firstName}
                />
              </li>

              <li>
                <NavButton
                  to="/"
                  icon={faSignOut}
                  label="Sign out"
                  onClick={handleLogout}
                />
              </li>
            </>
          ) : (
            <li>
              <NavButton to="/login" icon={faUserCircle} label="Sign in" />
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
