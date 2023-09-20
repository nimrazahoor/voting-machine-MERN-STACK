import React from "react";

const Navbar = () => {
  const handleLogout = () => {
    sessionStorage.removeItem("jwt");
    sessionStorage.removeItem("userType");
    sessionStorage.removeItem("poll");
    alert("Logged Out");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="/">
        Voting App
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a className="nav-link" href="/">
              Register <span className="sr-only"></span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/login">
              Login
            </a>
          </li>
        </ul>
      </div>

      <button
        type="button"
        className="btn btn-primary ml-auto"
        onClick={handleLogout}
      >
        <a className="nav-link" href="/login">
          Logout
        </a>
      </button>
    </nav>
  );
};

export default Navbar;
