module.exports = function(app) {

  var file = require('../controllers/file.controller.js');

  // Upload a new File
  app.post('/files', file.create);

  // Retrieve all session details
  app.get('/files', file.uploadForm);

  // Retrieve all session details
  app.get('/files/:filePath', file.getFile);

  // Delete a Note with noteId
  app.delete('/files/:filePath', file.delete);
}