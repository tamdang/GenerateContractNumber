var mongoose = require('mongoose');

var ContractSchema = mongoose.Schema({
  contractNumber: String,
  accountManagerId: String,
  accountExecutiveId: String,
  client: String,
  brand: String,
  budget: Number,
  signDate: Date,
  start: Date,
  end: Date,
  description: String,
});

module.exports = mongoose.model('Contract', ContractSchema);