import React from "react";
import { useNavigate } from "react-router-dom";
import "./LogoutButton.css";

export default function LogoutButton({ isLoggedIn }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="logout-container">
      {isLoggedIn ? (
        <button className="logout-btn" onClick={logout}>Logout</button>
      ) : (
        <>
          <button className="nav-btn" onClick={() => navigate("/login")}>Login</button>
          <button className="nav-btn" onClick={() => navigate("/register")}>Register</button>
        </>
      )}
    </nav>
  );
}
