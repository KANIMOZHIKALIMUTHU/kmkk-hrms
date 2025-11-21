import React, { useState, useEffect } from "react";
import API from "../services/api";
import "./TeamForm.css";

export default function TeamForm({ onSaved, editTeam }) {
  const [form, setForm] = useState({ name: "", description: "" });

  useEffect(() => {
    if (editTeam) {
      setForm({
        name: editTeam.name || "",
        description: editTeam.description || "",
      });
    } else {
      setForm({ name: "", description: "" });
    }
  }, [editTeam]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editTeam) {
      await API.put(`/teams/${editTeam.id}`, form);
    } else {
      await API.post("/teams", form);
    }
    onSaved();
  };

  return (
    <form onSubmit={handleSubmit} className="team-form">
      <input
        name="name"
        placeholder="Team Name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />
      <button type="submit">{editTeam ? "Update" : "Add"}</button>
    </form>
  );
}
