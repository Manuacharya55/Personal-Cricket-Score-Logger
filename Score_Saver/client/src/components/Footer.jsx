import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Footer = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <footer>
      <h1 id="logo">Score Tracker</h1>

      {isLoggedIn ? (
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
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
      ) : (
        ""
      )}
    </footer>
  );
};

export default Footer;
