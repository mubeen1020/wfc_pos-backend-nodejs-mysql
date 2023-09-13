const express = require('express');
const userrolerouter = express.Router();
const userRoleController = require('../controllers/rolesController');

userrolerouter.post('/roles', userRoleController.createrole);
userrolerouter.get('/roles', userRoleController.getAllrole);
userrolerouter.put('/roles/:id', userRoleController.updaterole);
userrolerouter.delete('/roles/:id', userRoleController.deleterole);

module.exports = userrolerouter;
