var express = require('express');
var bodyParser = require('body-parser');

// create express app
var app = express();

// app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   next()
// })

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Configuring the database
var dbConfig = require('./config/database.config.js');
var mongoose = require('mongoose');

mongoose.connect(dbConfig.url, {
    
});

mongoose.connection.on('error', function() {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
})

mongoose.connection.once('open', function() {
    console.log("Successfully connected to the database");
})

// define a simple route
app.get('/', function(req, res){
    res.json({"message": "Welcome to Contract Management application."});
});

// Require Sessions routes
// require('./app/routes/session.routes.js')(app);
// require('./app/routes/receiver.routes.js')(app);
// require('./app/routes/file.routes.js')(app);
require('./app/routes/generator.routes.js')(app);

// listen for requests
app.listen(8080, function(){
    console.log("Server is listening on port 8080");
});