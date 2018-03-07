var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
  fbId: String,
  firstName: String,
  lastName: String,
  middleName: String,
  role: String
})

module.exports = mongoose.model('User', UserSchema)