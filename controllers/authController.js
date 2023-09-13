const User = require('../models/authModel');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const secretKey = 'your_secret_key';


exports.signup = (req, res) => {
    const { username, email, password, role_id } = req.body;
  
    // Validate the email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: 'Please enter a valid email address' });
    }
  
    // Check for existing user with the same email
    User.findByEmail(email, (findError, existingUser) => {
      if (findError) {
        console.error('Error checking for existing user:', findError);
        return res.status(500).json({ message: 'An error occurred while checking for existing users' });
      }
  
      if (existingUser) {
        console.error('User with the same email already exists');
        return res.status(400).json({ message: 'User with the same email already exists' });
      }
  
      // Continue with user registration
      if (validator.isEmpty(username) || validator.isEmpty(email) || validator.isEmpty(password)) {
        return res.status(400).json({ message: 'Please enter all required fields' });
      }
  
      if (!validator.isStrongPassword(password)) {
        return res.status(400).json({ message: 'Please enter a strong password' });
      }
  
      const newUser = new User({
        username,
        email,
        password,
        role_id,
      });
  
      User.create(newUser, (error, user) => {
        if (error) {
          return res.status(500).json({
            message: 'An error occurred while creating a new user.',
            error,
          });
        }
        res.json({
          message: 'User created successfully!',
          user,
        });
      });
    });
  };

exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findByEmail(email, (error, user) => {
    if (error) {
      return res.status(500).json({
        message: 'An error occurred while retrieving the user.',
        error,
      });
    }
    if (!user) {
      return res.status(404).json({
        message: 'User not found.',
      });
    }
    if (user.password !== password) {
      return res.status(401).json({
        message: 'Invalid password.',
      });
    }

    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });

    res.json({
      message: 'Login successful!',
      token,
      user,
    });
  });
};

exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.role_id === 'admin') {
    return next(); 
  } else {
    return res.status(403).json({ message: 'Access denied. You are not an admin.' });
  }
};
