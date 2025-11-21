import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import "./Login-Register.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // get login function from context

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await API.post("/auth/login", { email, password });
      if (response.data.token) {
        login(response.data.token); // update context token state
        navigate("/dashboard");     // redirect after login success
      } else {
        setError("Login failed: No token received");
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message || "Login failed");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Login to your account</h2>
      {error && <p className="error">{error}</p>}    {/* display error message */}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-input"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="form-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="form-button">
          Login
        </button>
      </form>
      <div className="form-footer">
        Don't have an account? <Link to="/register">Register</Link>
      </div>
    </div>
  );
}
