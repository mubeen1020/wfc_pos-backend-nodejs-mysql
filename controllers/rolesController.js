const Userrole = require("../models/rolesModel");


exports.createrole = (req, res) => {
  const { role } = req.body;

  const newRole = new Userrole({
    role,
  });

  Userrole.create(newRole, (error, newrole) => {
    if (error) {
      return res.status(500).json({
        message: 'An error occurred while creating a new role.',
        error,
      });
    }
    res.json({
      message: 'Role created successfully!',
      newrole,
    });
  });
};

exports.getAllrole = (req, res) => {
  Userrole.getAll((error, fishCuts) => {
    if (error) {
      return res.status(500).json({
        message: 'An error occurred while retrieving role.',
        error,
      });
    }
    res.json({
      message: 'Retrieved Role successfully!',
      fishCuts,
    });
  });
};

exports.updaterole = (req, res) => {
    const roleId = req.params.id;
    const { role } = req.body;
  
    Userrole.update(roleId, role, (error, updatedRole) => {
      if (error) {
        return res.status(500).json({
          message: 'An error occurred while updating the role.',
          error,
        });
      }
      res.json({
        message: 'Role updated successfully!',
        updatedRole,
      });
    });
  };
  
  
  exports.deleterole = (req, res) => {
    const roleId = req.params.id;
  
    Userrole.delete(roleId, (error, deletedRole) => {
      if (error) {
        return res.status(500).json({
          message: 'An error occurred while deleting the role.',
          error,
        });
      }
      res.json({
        message: 'Role deleted successfully!',
        deletedRole,
      });
    });
  };