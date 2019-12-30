var mongoose = require('mongoose');

var MaggiSchema = mongoose.Schema({
  name: String,
  birthDate: Date,
  changeCrush: Number, //0 --> no value selected, 1 --> ok to change, 2 --> not ok to change
  preferCooking: Number, //0 --> no value selected, 1 --> prefer cooking, 2 --> not prefer cooking
  preferTraditionalFood: Number //0 --> no value selected, 1 --> prefer traditional food, 2 --> not prefer traditional food
})

module.exports = mongoose.model('Maggi', MaggiSchema)
