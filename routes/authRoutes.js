const express = require('express');
const {
  signup,
  login,
  isAdmin, // Import isAdmin from the controller
} = require('../controllers/authController'); // Import the controller functions

const authrouter = express.Router();

authrouter.post('/register', signup); // Use signup instead of user
authrouter.post('/login', login); // Use login instead of login
authrouter.post('/admin', isAdmin); // Use isAdmin instead of createAdminUser

module.exports = authrouter;
