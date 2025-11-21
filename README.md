# Employee-Team Management Dashboard

## Project Description
This is a full-stack web application built with React (frontend) and Node.js/Express (backend) that enables managing employees, teams, and their assignments within an organization. It features secure user authentication, organization registration, employee and team CRUD operations, and assignment management with protected routes.

## Features
1. User registration and login with JWT-based authentication.

2. Organization registration with admin user creation.

3. Manage employees and teams (create, read, update, delete).

4. Assign employees to teams.

5. Secure dashboard accessible only when logged in.

6. Form validation and error handling.

## Tech Stack
Frontend: React, React Router, Axios, Context API, CSS

Backend: Node.js, Express, Sequelize ORM, bcrypt, JWT

Database: PostgreSQL (or any SQL-based DB)

Authentication: JSON Web Tokens (JWT)

## Project Structure

/backend
  /models         # Sequelize models (User, Organisation, Employee, Team, etc.)
  /routes         # Express routes (auth, employee, team, assignment)
/frontend
  /src
    /pages        # React pages (Login, Register, Dashboard, AssignmentManager, AssignmentList)
    /context      # React context for auth state management
    /services     # API call helpers (Axios instance)
    /styles       # CSS files
App.jsx           # Main app with routing and private route logic

## Installation & Setup

### Backend
Configure your database and add connection info in environment variables.

Run migrations or sync Sequelize models.

Set environment variables (e.g., JWT_SECRET, database credentials).

1. Install dependencies:
cd backend
npm install

2. Start the backend server:
node src/index.js

### Frontend

1. Navigate to frontend folder:
cd frontend

2. Install dependencies:
npm install

3. Start the React development server:
npm start

## Usage
Access the frontend app at http://localhost:3000.

Register a new organization and admin.

Login with created admin credentials.

Manage employees, teams, and assignments from the dashboard.

Use Logout to end sessions securely.

## Environment Variables
The following variables are required:

JWT_SECRET - Secret key for signing JSON web tokens.

Database credentials (e.g., DB_HOST, DB_USER, DB_PASS, DB_NAME).

Backend server port (default: 5000).

