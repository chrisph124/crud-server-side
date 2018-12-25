const mongoose = require('mongoose');

const CustomerSchema = mongoose.Schema({
  fistname: String,
  lastname: String,
  age: { type: Number, min: 18, max: 65, required: true }
})
const CustomerModel =  mongoose.model('customers', CustomerSchema)

module.exports = CustomerModel;