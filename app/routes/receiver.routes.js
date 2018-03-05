module.exports = function(app) {

  var receiver = require('../controllers/receiver.controller.js');

  // Create a new receiver
  app.post('/receiver', receiver.create);

  // Retrieve a single receiver
  app.get('/receiver/:receiverId', receiver.findOne);
  
  // Update a receiver
  app.put('/receiver/:receiverId', receiver.update);

  // Delete a session detail with session detail id
  app.delete('/receiver/:receiverId', receiver.delete);

  // Retrieve all receivers of a session
  app.get('/receivers/:sessionId', receiver.findAllBySessionId);

}