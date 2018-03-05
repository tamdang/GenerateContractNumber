var mongoose = require('mongoose');

var ReceiverSchema = mongoose.Schema({
  sessionId: { type: String, index: true },
  receiverNo: Number,  
  receivingTime: Date,
  imgUrl: String,
});

module.exports = mongoose.model('Receiver', ReceiverSchema);