import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import "./Login-Register.css";

export default function Register() {
  const [orgName, setOrgName] = useState("");
  const [adminName, setAdminName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Basic validation
    if (!orgName || !adminName || !email || !password) {
      setError("Please fill all fields");
      return;
    }

    // Email format validation (simple)
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setError("Invalid email format");
      return;
    }

    try {
      const response = await API.post("/auth/register", {
        orgName,
        adminName,
        email,
        password,
      });

      if (response.data.token) {
        setSuccess(true);
        // Clear form
        setOrgName("");
        setAdminName("");
        setEmail("");
        setPassword("");
        // Redirect to login after a short delay or immediately
        navigate("/login");
      }
    } catch (err) {
    // Set the received error message or fallback
    const message = err.response?.data?.error || err.response?.data?.message || "Registration failed";
    setError(message);
  }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Register Organisation & Admin</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">Registration successful!</p>}
      <form onSubmit={handleSubmit} className="form-input">
        <input
          type="text"
          placeholder="Organisation Name"
          value={orgName}
          onChange={(e) => setOrgName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Admin Full Name"
          value={adminName}
          onChange={(e) => setAdminName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="form-button" type="submit">
          Register
        </button>
      </form>

      <div className="form-footer">
        Already have an account?{" "}
        <Link to="/login" className="link">
          Login
        </Link>
      </div>
    </div>
  );
}
