var mongoose = require('mongoose');

var GroupUserSchema = mongoose.Schema({
  groupId: String,
  userId: String,
})

module.exports = mongoose.model('GroupUser', GroupUserSchema)