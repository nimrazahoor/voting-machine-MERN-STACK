import React from "react";
import "../Navbar/Navbar.css";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const handleLogout = () => {
    sessionStorage.removeItem("jwt");
    sessionStorage.removeItem("userType");
    alert("Logged Out");
    return <a href="/login">Login</a>;
  };
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <button className="submit-button">
          <a href="/login">Login</a>
        </button>
        <button className="submit-button" onClick={handleLogout}>
          Logout
        </button>
      </ul>
    </nav>
  );
};

export default Navbar;
