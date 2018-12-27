module.exports = function(app) {
  const customers = require('../controllers/customer.controller.js')

  //Create a new customer
  app.post('/api/customers', customers.createNewCustomer)

  //Retrieve all customers
  app.get('/api/customers', customers.findAll)

  //Retrieve a single customer by ID
  app.get('/api/customers/:customerID', customers.findOne)

  //Update a customer with ID
  app.put('/api/customers', customers.updateCustomer)

  //Delete a customer with ID
  app.delete('/api/customers/:customerID', customers.deleteCustomer)
}