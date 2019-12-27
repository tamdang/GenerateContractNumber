var mongoose = require('mongoose');

var MaggiSchema = mongoose.Schema({
  name: String,
  birthDate: Date,
  changeCrush: Boolean,
  preferCooking: Boolean,
  preferTraditionalFood: Boolean
})

module.exports = mongoose.model('Maggi', MaggiSchema)
