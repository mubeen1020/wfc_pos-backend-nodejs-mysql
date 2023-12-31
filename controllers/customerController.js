const Customer = require('../models/customerModel');

exports.createCustomer = (req, res) => {
  const newCustomerData = req.body;

  Customer.create(newCustomerData, (error, newCustomer) => {
    if (error) {
      return res.status(500).json({
        message: 'An error occurred while creating the customer.',
        error,
      });
    }
    res.json({
      message: 'Customer created successfully!',
      newCustomer,
    });
  });
};

exports.getAllCustomers = (req, res) => {
  Customer.getAll((error, customers) => {
    if (error) {
      return res.status(500).json({
        message: 'An error occurred while retrieving customers.',
        error,
      });
    }
    res.json({
      message: 'Retrieved customers successfully!',
      customers,
    });
  });
};

exports.getCustomerById = (req, res) => {
  const { id } = req.params;

  Customer.getById(id, (error, customer) => {
    if (error) {
      return res.status(500).json({
        message: 'An error occurred while retrieving the customer.',
        error,
      });
    }
    if (!customer) {
      return res.status(404).json({
        message: 'Customer not found.',
      });
    }
    res.json({
      message: 'Found customer by ID!',
      customer,
    });
  });
};

exports.updateCustomer = (req, res) => {
  const { id } = req.params;
  const updatedCustomerData = req.body;

  Customer.update(id, updatedCustomerData, (error, updatedCustomer) => {
    if (error) {
      return res.status(500).json({
        message: 'An error occurred while updating the customer.',
        error,
      });
    }
    res.json({
      message: 'Customer updated successfully!',
      updatedCustomer,
    });
  });
};


exports.deleteCustomer = (req, res) => {
  const { id } = req.params;

  Customer.delete(id, (error, deletedCustomer) => {
    if (error) {
      return res.status(500).json({
        message: 'An error occurred while deleting the customer.',
        error,
      });
    }
    res.json({
      message: 'Customer deleted successfully!',
      deletedCustomer,
    });
  });
};

exports.searchCustomers = (req, res) => {
    const query = req.query.query;
    Customer.search(query, (error, customers) => {
      if (error) {
        console.error('Error searching for customers:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      if (customers.length === 0) {
        return res.json({ message: 'Customer not found.' }).status(404);
      }
      return res.status(200).json(customers);
    });
  };
  
