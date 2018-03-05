module.exports = function(app) {

  var sessions = require('../controllers/session.controller.js');

  // Create a new Note
  app.post('/sessions', sessions.create);

  // Retrieve all Notes
  app.get('/sessions', sessions.findAll);

  // Retrieve a single Note with noteId
  app.get('/sessions/:sessionId', sessions.findOne);

  // Update a Note with noteId
  app.put('/sessions/:sessionId', sessions.update);

  // Delete a Note with noteId
  app.delete('/sessions/:sessionId', sessions.delete);
}