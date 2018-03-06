var express = require('express');
var bodyParser = require('body-parser');

// create express app
var app = express();

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next()
})

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Configuring the database
var dbconfig = require('./config/database.config.js');

console.log('database_config',dbconfig.url);

const { Pool, Client } = require('pg')

const pool = new Pool({
  connectionString: dbconfig.url,
})

// define a simple route
app.get('/', function(req, res){
    pool.query('SELECT id, client, account_manager from contract', (err, data) => {
      console.log(err, data.rows)
      res.json({"message": data.rows});
      // pool.end()
    })
});

// Require Sessions routes
// require('./app/routes/session.routes.js')(app);
// require('./app/routes/receiver.routes.js')(app);
// require('./app/routes/file.routes.js')(app);
require('./app/routes/generator.routes.js')(app);


const PORT = process.env.PORT || 8080

// listen for requests
app.listen(PORT, function(){
    console.log("Server is listening on port "+PORT);
});

function up(){
  return 'abc'
}

module.exports.up = up