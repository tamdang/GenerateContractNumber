var mongoose = require('mongoose');

var CodeSchema = mongoose.Schema({
  masterCode: String,
  latestNumber: Number,
  isExternal: Boolean,
  isDefault: Boolean,
})

module.exports = mongoose.model('Code', CodeSchema)