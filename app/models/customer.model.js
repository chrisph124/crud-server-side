const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

const CustomerSchema = mongoose.Schema({
  firstname: String,
  lastname: String,
  age: { type: Number, min: 18, max: 65, required: true }
})
const CustomerModel =  mongoose.model('customers', CustomerSchema)

module.exports = CustomerModel;