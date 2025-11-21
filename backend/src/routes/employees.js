const express = require('express');
const router = express.Router();
const { Employee } = require('../models');

// GET all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET an employee by ID
router.get('/:id', async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json(employee);
  } catch (error) {
    console.error("Error fetching employee:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// CREATE a new employee
router.post('/', async (req, res) => {
  try {
    const { first_name, last_name, email, phone } = req.body;
    if (!first_name || !last_name || !email || !phone) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const employee = await Employee.create({ first_name, last_name, email, phone });
    res.status(201).json(employee);
  } catch (error) {
    console.error("Error creating employee:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// UPDATE an employee by ID (PUT)
router.put('/:id', async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    const { first_name, last_name, email, phone, organisation_id } = req.body;
    // Update only included fields
    employee.first_name = first_name ?? employee.first_name;
    employee.last_name = last_name ?? employee.last_name;
    employee.email = email ?? employee.email;
    employee.phone = phone ?? employee.phone;
    await employee.save();
    res.json(employee);
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE an employee by ID
router.delete('/:id', async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    await employee.destroy();
    res.json({ message: "Employee deleted" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
