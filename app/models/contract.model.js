var mongoose = require('mongoose');

var ContractSchema = mongoose.Schema({
  contractNumber: Number,
  accountManagerId: String,
  accountExecutiveId: String,
  client: String,
  brand: String,
  budget: Number,
  signDate: Date,
  start: Date,
  end: Date,
});

module.exports = mongoose.model('Contract', ContractSchema);