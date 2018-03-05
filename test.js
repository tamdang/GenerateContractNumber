const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:32771';
const dbName = 'myproject';

// Load method categories.
var _ = require('lodash');

(function(){
  const str = 'http://10.0.1.11:3000/'
  console.log(str.replace(/[0-9]+.[0-9]+.[0-9]+.[0-9]+/,'localhost'))
})();
