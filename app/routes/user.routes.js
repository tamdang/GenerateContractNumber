module.exports = function(app) {
  var user = require('../controllers/user.controller.js')
  app.post('/api/user', user.create)
  app.put('/api/user/:id', user.update)
  app.delete('/api/user/:id', user.delete)
  app.get('/api/user/:id',user.getById)
  app.get('/api/user',user.getAll)
}