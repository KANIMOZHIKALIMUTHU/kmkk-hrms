import React, { useState } from "react";
import EmployeeList from "../components/EmployeeList";
import TeamList from "../components/TeamList";
import AssignmentManager from "../components/AssignmentManager";
import AssignmentList from "../components/AssignmentList";
import LogoutButton from "../pages/LogoutButton";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("employees");
  const isLoggedIn = !!localStorage.getItem("token");
  const navigate = useNavigate();

  return (
    <div className="dashboard-main">
      <div className="dashboard-topbar">
        <h1 className="dashboard-title">Human Resource Management Dashboard</h1>
        <div className="dashboard-auth-actions">
          {isLoggedIn ? (
            <LogoutButton isLoggedIn={true} />
          ) : (
            <>
              <button className="auth-btn" onClick={() => navigate("/login")}>Login</button>
              <button className="auth-btn" onClick={() => navigate("/register")}>Register</button>
            </>
          )}
        </div>
      </div>

      <nav className="dashboard-menu">
        <button className={activeTab === "employees" ? "active" : ""} onClick={() => setActiveTab("employees")}>Employees</button>
        <button className={activeTab === "teams" ? "active" : ""} onClick={() => setActiveTab("teams")}>Teams</button>
        <button className={activeTab === "assignment" ? "active" : ""} onClick={() => setActiveTab("assignment")}>Assign</button>
        <button className={activeTab === "assignmentList" ? "active" : ""} onClick={() => setActiveTab("assignmentList")}>Assignment List</button>
      </nav>

      <div className="dashboard-content">
        {activeTab === "employees" && <EmployeeList />}
        {activeTab === "teams" && <TeamList />}
        {activeTab === "assignment" && <AssignmentManager />}
        {activeTab === "assignmentList" && <AssignmentList />}
      </div>
    </div>
  );
}
