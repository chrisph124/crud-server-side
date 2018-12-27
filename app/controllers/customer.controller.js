const Customers = require('../models/customer.model.js');

//POST a customer
function createNewCustomer(req, res) {
  //Create a new customer
  console.log('Da vaoo!!!');
  const customer = new Customers(req.body);
  console.log(req.body);

  //Save a customer in the MongoDB
  customer.save()
  .then(data => {
    res.json(data)
    console.log('Added successfully!!');
    console.log(data);
  })
  .catch(err => {
    res.status(500).json({
      msg: err.message
    })
  })
}

//Fetch all customers
function findAll(req, res) {
  Customers.find()
  .then(customers => {
    res.json(customers)
    console.log(res.json(customers));
  })
  .catch(err => {
    res.status(500).send({
      msg: err.message
    })
  })
}

//Fetch a single customer by ID
function findOne(req, res) {
  Customers.findById(req.params.customerID)
  .then(customer => {
    if(!customer) {
      return res.status(404).json({
        msg: "Customer not found with ID: " + req.params.customerID
      })
    }
    res.json(customer)
  })
  .catch(err => {
    if(err.kind === "ObjectID") {
      return res.status(404).json({
        msg: "Customer not found with ID: " + req.params.customerID
      })
    }
    return res.status(500).json({
      msg: "Error retrieving customer with ID: " + req.params.customerID
    })
  })
}

//Update a customer
function updateCustomer(req, res) {
  Customers.findByIdAndUpdate(req.body._id, req.body, {new: true})
  .then(customer => {
    if(!customer){
      return res.status(404).json({
        msg: "Customer not found with ID: " + req.params.customerID
      })
    }
    res.json(customer)
  })
  .catch(err => {
    if(err.kind === "ObjectId") {
      return res.status(404).json({
        msg: "Customer not found with ID: " + req.params.customerID
      })
    }
    return res.status(500).json({
      msg: "Error updating customer with ID: " + req.params.customerID
    })
  })
}

//Delete a customer
function deleteCustomer(req, res) {
  Customers.findByIdAndRemove(req.params.customerID)
  .then(customer => {
    if(!customer) {
      res.status(404).json({
        msg: "Customer not found with ID: " + req.params.customerID
      })
    }
    res.json({msg: "Customer deleted succesfully!"})
  })
  .catch(err => {
    if(err.kind === "ObjectId" || err.name === "NotFound") {
      return res.status(404).json({
        msg: "Customer not found with id " + req.params.customerID
      })
    }
    return res.status(500).json({
      msg: "Coud not delete customer with ID: " + req.params.customerID
    })
  })
};

module.exports = {
  createNewCustomer,
  findAll,
  findOne,
  updateCustomer,
  deleteCustomer
};
