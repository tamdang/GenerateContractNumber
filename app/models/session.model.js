var mongoose = require('mongoose');

var SessionSchema = mongoose.Schema({
  supervisor: String,
  location: String,
  province: String,
  address: String,
  geolocation: {
    longitude: String,
    latitude:  String
  },
  start: Date,
  end: Date,
  brand: String,
  status: String,
  samplingDelivered: Number,
  comment: String,
});

module.exports = mongoose.model('Session', SessionSchema);