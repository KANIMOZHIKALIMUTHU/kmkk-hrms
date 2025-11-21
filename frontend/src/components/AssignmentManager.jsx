import React, { useState, useEffect } from "react";
import API from "../services/api";
import "./AssignmentManager.css";

export default function AssignmentManager() {
  const [employees, setEmployees] = useState([]);
  const [teams, setTeams] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");

  useEffect(() => {
    async function fetchData() {
      const empRes = await API.get("/employees");
      const teamRes = await API.get("/teams");
      setEmployees(empRes.data);
      setTeams(teamRes.data);
    }
    fetchData();
  }, []);

  const assign = async () => {
    if (!selectedEmployee || !selectedTeam) {
      alert("Select employee and team");
      return;
    }
    try {
      await API.post("/employee-team", {
        employee_id: selectedEmployee,
        team_id: selectedTeam,
      });
      alert("Employee assigned to team successfully");
      setSelectedEmployee("");
      setSelectedTeam("");
    } catch (err) {
      alert("Failed to assign: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="assignment-manager-container">
      <h3>Assign Employee to Team</h3>
      <form className="assignment-form" onSubmit={(e) => { e.preventDefault(); assign(); }}>
        <label>
          Employee:
          <select
            className="assignment-select"
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
          >
            <option value="">Select Employee</option>
            {employees.map((e) => (
              <option key={e.id} value={e.id}>
                {e.first_name} {e.last_name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Team:
          <select
            className="assignment-select"
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
          >
            <option value="">Select Team</option>
            {teams.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </label>
        <button className="assignment-button" type="submit">
          Assign
        </button>
      </form>
    </div>
  );
}
