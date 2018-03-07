var mongoose = require('mongoose');

var GroupSchema = mongoose.Schema({
  name: String,
  amUserId: String,
})

module.exports = mongoose.model('Group', GroupSchema)