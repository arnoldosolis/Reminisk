import React from "react";
import { Link } from "react-router-dom";
import "../Components/Navbar.css";

function Navbar() {
  return (
    <div className="Navbar">
      <div className="leftSide">
        <div className="links">
          <ul>
            <li>
              <Link to="/" className="navbarLinks">
                Home
              </Link>
            </li>
            <li>
              <Link to="/" className="navbarLinks">
                Survery
              </Link>
            </li>
            <Link to="/" className="navbarLinks">
              Journal Log
            </Link>
            <li>
              <Link to="/" className="navbarLinks">
                Map-It
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="rightSide">
        <div className="links">
        <ul>
          <li>
            <Link to="/" className="navbarLinks">
              Profile
            </Link>
          </li>
        </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
