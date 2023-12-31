import "./Header.css";

import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/slices/userSlice";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faSignOut } from "@fortawesome/free-solid-svg-icons";
import imgLogo from "../../assets/images/argent-bank-logo.png";

export default function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

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
                <NavLink to="/profile">
                  <FontAwesomeIcon icon={faUserCircle} size="lg" />
                  {user.firstName}
                </NavLink>
              </li>

              <li>
                <NavLink onClick={handleLogout} to="/">
                  <FontAwesomeIcon icon={faSignOut} size="lg" />
                  Sign out
                </NavLink>
              </li>
            </>
          ) : (
            <li>
              <NavLink to="/login">
                <FontAwesomeIcon icon={faUserCircle} size="lg" /> Sign in
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
