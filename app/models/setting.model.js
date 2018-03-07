var mongoose = require('mongoose')

var SettingSchema = mongoose.Schema({
  key: String,
  value: String,
})

module.exports = mongoose.model('Setting', SettingSchema)