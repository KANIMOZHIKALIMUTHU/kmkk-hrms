require('dotenv').config();
console.log('DATABASE_URL:', process.env.DATABASE_URL);

const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const {
  Organisation, User, Employee, Team, EmployeeTeam, Log
} = require('./models'); // Presume your models file exports these

const authRoutes = require('./routes/auth');
const employeeRoutes = require('./routes/employees');
const teamRoutes = require('./routes/teams');
const employeeTeamRoutes = require('./routes/employeeTeam');

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', // React dev server
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/employee-team', employeeTeamRoutes);

const PORT = process.env.PORT || 5000;

// Main Sequelize initialization: cloud/Postgres with SSL for production, local details for dev
const sequelize =
  process.env.DATABASE_URL
    ? new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        protocol: 'postgres',
        dialectOptions: { ssl: { require: true, rejectUnauthorized: false } }
      })
    : new Sequelize('database_development', 'postgres', 'yourlocalpassword', {
        host: '127.0.0.1',
        dialect: 'postgres'
      });

// Attach models if needed for relations (if not handled in ./models)
// Organisation.init(sequelize); etc.

// Sequelize connection and app startup
sequelize.authenticate()
  .then(() => {
    console.log('Database connected');
    return sequelize.sync();
  })
  .then(() => {
    console.log('Database tables synced');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
