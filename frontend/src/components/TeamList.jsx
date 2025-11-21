import React, { useState, useEffect } from "react";
import API from "../services/api";
import TeamForm from "./TeamForm";
import "./TeamList.css";

export default function TeamList() {
  const [teams, setTeams] = useState([]);
  const [editing, setEditing] = useState(null);

  const fetchTeams = async () => {
    const res = await API.get("/teams");
    // Ensure res.data is an array
    setTeams(Array.isArray(res.data) ? res.data : []);
  };

  const deleteTeam = async (id) => {
    await API.delete(`/teams/${id}`);
    fetchTeams();
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  return (
  <div className="team-list-container">
    <h3>Teams</h3>
    <TeamForm onSaved={fetchTeams} editTeam={editing} />
    <div className="team-table-wrapper">
      <table className="team-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team.id}>
              <td>{team.name}</td>
              <td>{team.description}</td>
              <td className="team-actions">
                <button onClick={() => setEditing(team)}>Edit</button>
                <button onClick={() => deleteTeam(team.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

}
