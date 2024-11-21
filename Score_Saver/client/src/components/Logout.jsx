import {useState,useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Logout = () => {
const {logOut} = useContext(AuthContext);
useEffect(()=>{
    logOut();
    navigate("/");
  },[logOut, navigate]);

  return <></>;
};

export default Logout;
