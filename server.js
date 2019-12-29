var express = require('express')
var bodyParser = require('body-parser')


// create express app
var app = express();

app.use(express.static('public'))

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next()
})

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Configuring the database
var dbConfig = require('./config/database.config.js');
var mongoose = require('mongoose');

mongoose.connect(dbConfig.url, {
    
})

mongoose.connection.on('error', function(err) {
  console.log(err)
  console.log('Could not connect to the database. Exiting now...');
  process.exit();
})

mongoose.connection.once('open', function() {
  console.log("Successfully connected to the database");
})

// define a simple route
// app.get('/', function(req, res){
//   res.json({"message": "Welcome to Contract Management System application."});
// });

require('./app/routes/contract.routes.js')(app)
require('./app/routes/code.routes.js')(app)
require('./app/routes/group.routes.js')(app)
require('./app/routes/user.routes.js')(app)
require('./app/routes/setting.routes.js')(app)
require('./app/routes/maggi.routes.js')(app)

const PORT = process.env.PORT || 8080

// listen for requests
app.listen(PORT, function(){
  console.log("Server is listening on port "+PORT);
});

function up(){
  return 'abc'
}

module.exports.up = up
