const express = require('express');
const router = express.Router();
const { EmployeeTeam, Employee, Team } = require('../models');

// GET all employee-team assignments
router.get('/', async (req, res) => {
  try {
    const assignments = await EmployeeTeam.findAll({
      include: [
        { model: Employee, attributes: ['first_name', 'last_name'] },
        { model: Team, attributes: ['name'] }
      ]
    });
    res.json(assignments);
  } catch (error) {
    console.error("Error fetching assignments:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET one assignment by ID
router.get('/:id', async (req, res) => {
  try {
    const assignment = await EmployeeTeam.findByPk(req.params.id, {
      include: [
        { model: Employee, attributes: ['first_name', 'last_name'] },
        { model: Team, attributes: ['name'] }
      ]
    });
    if (!assignment) {
      return res.status(404).json({ error: "Assignment not found" });
    }
    res.json(assignment);
  } catch (error) {
    console.error("Error fetching assignment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// CREATE: assign employee to a team
router.post('/', async (req, res) => {
  try {
    const { employee_id, team_id } = req.body;
    if (!employee_id || !team_id) {
      return res.status(400).json({ error: "employee_id and team_id are required" });
    }
    const exists = await EmployeeTeam.findOne({ where: { employee_id, team_id } });
    if (exists) {
      return res.status(409).json({ error: "Assignment already exists" });
    }
    const newAssignment = await EmployeeTeam.create({ employee_id, team_id });
    res.status(201).json(newAssignment);
  } catch (error) {
    console.error("Error creating assignment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// UPDATE assignment by ID
router.put('/:id', async (req, res) => {
  try {
    const assignment = await EmployeeTeam.findByPk(req.params.id);
    if (!assignment) {
      return res.status(404).json({ error: "Assignment not found" });
    }
    const { employee_id, team_id } = req.body;
    assignment.employee_id = employee_id ?? assignment.employee_id;
    assignment.team_id = team_id ?? assignment.team_id;
    await assignment.save();
    res.json(assignment);
  } catch (error) {
    console.error("Error updating assignment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE assignment by ID
router.delete('/:id', async (req, res) => {
  try {
    const assignment = await EmployeeTeam.findByPk(req.params.id);
    if (!assignment) {
      return res.status(404).json({ error: "Assignment not found" });
    }
    await assignment.destroy();
    res.json({ message: "Assignment deleted" });
  } catch (error) {
    console.error("Error deleting assignment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
