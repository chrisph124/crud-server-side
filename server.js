const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./app/config/mongodb.config.js');
const mongoose = require('mongoose');

const Customer = require('./app/models/customer.model.js');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {useNewUrlParser: true})
.then(() => {
  console.log("Successfully connected to MongoDB.");

  Customer.deleteMany({}, function(err) {

     if(err){
        console.log(err);
        process.exit();
     }
     initial();
    });

}).catch(err => {
  console.log('Could not connect to MongoDB.');
  process.exit();
});

const cors = require('cors')
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

require('./app/routes/customer.routes.js')(app);

// Create a Server
const server = app.listen(3000, function () {

  let host = server.address().address
  let port = server.address().port

  console.log("App listening at http://%s:%s", host, port)
})

function initial(){

    let customers = [
      {
        firstname: "Joe",
        lastname: "Thomas",
        age: 36
      }
    ]

    for (let i = 0; i < customers.length; i++) {
      const customer = new Customer(customers[i]);
      customer.save();
  }
}