import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import * as PATHS from "../../utils/paths";
import * as CONSTS from "../../utils/consts";

const Navbar = (props) => {
  return (
    <nav>
      <Link to={PATHS.HOMEPAGE} className="nav__projectName">
        {CONSTS.CAPITALIZED_APP}
      </Link>

      <div className="nav__authLinks">
        {props.user ? (
          <>
            <Link to={PATHS.PROFILE_PAGE} className="profilebutton">Personal Image Gallery</Link>
            <Link to={PATHS.PROTECTEDPAGE} className="authLink">
            
            </Link>
            <button className="nav-logoutbtn" onClick={props.handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="nav-logoutbtn" to={PATHS.SIGNUPPAGE} className="authLink">
              Signup
            </Link>
            <Link className="nav-logoutbtn" to={PATHS.LOGINPAGE} className="authLink">
              Log In
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
