import React, { useState, useContext, useEffect } from "react";
import { NavLink, redirect, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
const URL = "http://localhost:4000/api/v1";
import axios from "axios";

const Login = () => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { setToken, setUserData } = useContext(AuthContext);
  const handleChange = (e) => {
    setLogin((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${URL}/login`, login, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data.success === true) {
        setToken(response.data.jwttoken,response.data.user.isAdmin)
        setUserData({
          token: response.data.jwttoken,
          isAdmin: response.data.user.isAdmin,
        });
        toast.success("Login Successfully");
        navigate("/home");
      } else {
        toast.error("couldnt Login your account");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("authtoken")) {
      navigate("/home"); // Redirect to /home if the token exists
    }
  }, [navigate]);
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="text"
          id="email"
          placeholder="Enter your email address"
          required
          name="email"
          value={login.email}
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          required
          name="password"
          value={login.password}
          onChange={handleChange}
        />
        <button type="submit" className="form-button">
          Login
        </button>
        <div className="toggle-link">
          <p>
            Don't have an account? <NavLink to="/register">Register</NavLink>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
