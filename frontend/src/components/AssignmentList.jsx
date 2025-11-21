import React, { useEffect, useState } from "react";
import API from "../services/api";
import "./AssignmentList.css";

export default function AssignmentList() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    setLoading(true);
    try {
      const res = await API.get("/employee-team");
      setAssignments(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      setAssignments([]);
    }
    setLoading(false);
  };

  const handleRemove = async (id) => {
    try {
      await API.delete(`/employee-team/${id}`);
      setAssignments(assignments.filter(a => a.id !== id));
    } catch (error) {
      alert("Failed to remove assignment");
    }
  };

  return (
    <div className="assignment-list-container">
      <h3>Employee-Team Assignments</h3>
      {loading ? (
        <p>Loading...</p>
      ) : assignments.length === 0 ? (
        <p>No assignments found.</p>
      ) : (
        <table className="assignment-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Team</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map(a => (
              <tr key={a.id}>
                <td>
                  {a.Employee
                    ? `${a.Employee.first_name} ${a.Employee.last_name}`
                    : "N/A"}
                </td>
                <td>{a.Team?.name || "N/A"}</td>
                <td className="assignment-actions">
                  <button onClick={() => handleRemove(a.id)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
