import React, { useState, useEffect } from "react";
import API from "../services/api";
import "./EmployeeForm.css";

function EmployeeForm({ onSaved, editEmployee }) {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
  if (editEmployee) {
    setForm({
      first_name: editEmployee.first_name || "",
      last_name: editEmployee.last_name || "",
      email: editEmployee.email || "",
      phone: editEmployee.phone || "",
    });
  } else {
    // clear form
    setForm({
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
    });
  }
}, [editEmployee]);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editEmployee) {
      await API.put(`/employees/${editEmployee.id}`, form);
    } else {
      await API.post("/employees", form);
    }
    onSaved();
  };

  return (
    <form onSubmit={handleSubmit} className="employee-form">
      <input name="first_name" placeholder="First Name" value={form.first_name} onChange={handleChange} required />
      <input name="last_name" placeholder="Last Name" value={form.last_name} onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required/>
      <button type="submit">{editEmployee ? "Update" : "Add"}</button>
    </form>
  );
}

export default EmployeeForm;
