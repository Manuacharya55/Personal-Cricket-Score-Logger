import { useContext, createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState();
  const [stat, setStat] = useState({
    batting: [],
    bowling: [],
  });

  useEffect(() => {
    const token = localStorage.getItem("authtoken");
    const isAdmin = localStorage.getItem("isAdmin");
  
    if (token) {
      setUserData({ token, isAdmin });
      setIsLoggedIn(true);
    } else {
      setUserData(null);
      setIsLoggedIn(false); // Ensure `isLoggedIn` is false if no token
    }
  }, []);

  const [isEditiing, setIsEditing] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const setToken = (token, isAdmin) => {
    localStorage.setItem("authtoken", token);
    localStorage.setItem("isAdmin", isAdmin);
    setIsLoggedIn(true);
  };

  const logOut = () => {
    localStorage.removeItem("authtoken");
    localStorage.removeItem("isAdmin");
    setUserData("");
    setIsLoggedIn(false);
  };
  return (
    <AuthContext.Provider
      value={{
        userData,
        setUserData,
        setToken,
        logOut,
        isLoggedIn,
        stat,
        setStat,
        isEditiing,
        setIsEditing,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
