import React, { useContext, useEffect, useState } from "react";
import { NavLink, redirect, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
const URL = "http://localhost:4000/api/v1";
import { toast } from "react-toastify";
import axios from "axios";
const Register = () => {
  const { userData } = useContext(AuthContext);
  const navigate = useNavigate();
  const registerUser = async (obj) => {
    try {
      const response = await axios.post(`${URL}/register`, obj, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data.success === true) {
        toast.success("Registered Successfully");
        navigate("/login");
      } else {
        toast.error("couldnt register your account");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const [register, setRegister] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    currentClub: "",
  });
  useEffect(() => {
    if (localStorage.getItem("authtoken")) {
      navigate("/home"); // Redirect to /home if the token exists
    }
  }, [navigate]);
  const handleChange = (e) => {
    setRegister((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  return (
    <div className="form-container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          registerUser(register);
          navigate("/login");
        }}
      >
        <h2>Register</h2>
        <input
          type="text"
          id="username"
          placeholder="Enter your first name"
          required
          name="username"
          value={register.username}
          onChange={handleChange}
        />
        <input
          type="text"
          id="firstname"
          placeholder="Enter your first name"
          required
          name="firstname"
          value={register.firstname}
          onChange={handleChange}
        />

        <input
          type="text"
          id="lastname"
          placeholder="Enter your last name"
          required
          name="lastname"
          value={register.lastname}
          onChange={handleChange}
        />

        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          required
          name="email"
          value={register.email}
          onChange={handleChange}
        />

        <input
          type="password"
          id="password"
          placeholder="Create a password"
          required
          name="password"
          value={register.password}
          onChange={handleChange}
        />

        <input
          type="text"
          id="currentClub"
          placeholder="Enter your current club"
          required
          name="currentClub"
          value={register.currentClub}
          onChange={handleChange}
        />

        <button type="submit" className="form-button">
          Register
        </button>
        <div className="toggle-link">
          <p>
            Already have an account? <NavLink to="/login">Login</NavLink>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
