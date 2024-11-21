import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const Navbar = () => {
  const { isLoggedIn, logOut } = useContext(AuthContext);

  return (
    <nav>
      <h1 id="logo">Score Tracker</h1>
      <>
        {isLoggedIn ? (
          <>
            <ul>
            <li>
              <NavLink to="/home">Home</NavLink>
            </li>
            <li>
              <NavLink to="/stat">Stats</NavLink>
            </li>
            <li>
              <NavLink to="/analytics">Analytics</NavLink>
            </li>
            <li>
              <NavLink to="/profile">Profile</NavLink>
            </li>
            </ul>
            <ul>
            <li>
              <button id="logout" onClick={logOut}>
                Log out
              </button>
            </li>
            </ul>
          </>
        ) : (
          <ul>
            <li>
              <NavLink to="/login" id="login">
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/register" id="register">
                Register
              </NavLink>
            </li>
          </ul>
        )}
      </>
    </nav>
  );
};

export default Navbar;
