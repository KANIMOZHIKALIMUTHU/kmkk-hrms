const express = require('express');
const router = express.Router();
const { Team } = require('../models');

// GET all teams
router.get('/', async (req, res) => {
  try {
    const teams = await Team.findAll();
    res.json(teams);
  } catch (error) {
    console.error("Error fetching teams:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET a single team by ID
router.get('/:id', async (req, res) => {
  try {
    const team = await Team.findByPk(req.params.id);
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }
    res.json(team);
  } catch (error) {
    console.error("Error fetching team:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// CREATE a new team (name & description required)
router.post('/', async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }
    const team = await Team.create({ name, description });
    res.status(201).json(team);
  } catch (error) {
    console.error("Error creating team:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// UPDATE a team by ID
router.put('/:id', async (req, res) => {
  try {
    const team = await Team.findByPk(req.params.id);
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }
    const { name, description } = req.body;
    team.name = name ?? team.name;
    team.description = description ?? team.description;
    await team.save();
    res.json(team);
  } catch (error) {
    console.error("Error updating team:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE a team by ID
router.delete('/:id', async (req, res) => {
  try {
    const team = await Team.findByPk(req.params.id);
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }
    await team.destroy();
    res.json({ message: "Team deleted" });
  } catch (error) {
    console.error("Error deleting team:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
