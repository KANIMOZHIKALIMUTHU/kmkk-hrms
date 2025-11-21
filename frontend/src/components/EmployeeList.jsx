import React, { useState, useEffect } from "react";
import API from "../services/api";
import EmployeeForm from "./EmployeeForm";
import "./EmployeeList.css";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [editing, setEditing] = useState(null);

  const fetchEmployees = async () => {
    const res = await API.get("/employees");
    setEmployees(res.data);
  };

  const deleteEmployee = async (id) => {
    await API.delete(`/employees/${id}`);
    fetchEmployees();
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="employee-list-container">
      <h3>Employees</h3>
      <EmployeeForm onSaved={fetchEmployees} editEmployee={editing} />
      <div className="employee-table-wrapper">
        <table className="employee-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(emp => (
              <tr key={emp.id}>
                <td>{emp.first_name}</td>
                <td>{emp.last_name}</td>
                <td>{emp.email}</td>
                <td className="employee-actions">
                  <button onClick={() => setEditing(emp)}>Edit</button>
                  <button onClick={() => deleteEmployee(emp.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
