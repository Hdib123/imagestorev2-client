import logo from "../logo.svg";
import "../App.css";
import React, { useState } from "react";
import Title from "../components/Title";
import { signup } from "../services/auth";
import "./auth.css";
import * as CONSTS from "../utils/consts";
import * as PATHS from "../utils/paths";
import { Link } from "react-router-dom";


function HomePage() {
  return (
    <div className="App">
            <Title />
            <Link className="nav-logoutbtn" to={PATHS.SIGNUPPAGE} className="authLink">
              Signup
            </Link>
            <Link className="nav-logoutbtn" to={PATHS.LOGINPAGE} className="authLink">
              Log In
            </Link>
    </div>
  );
}

export default HomePage;
