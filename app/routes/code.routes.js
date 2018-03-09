module.exports = function(app) {
  var code = require('../controllers/code.controller.js')
  app.post('/api/code', code.create)
  app.put('/api/code/:id', code.update)
  app.delete('/api/code/:id', code.delete)
  app.get('/api/code',code.getAll)
  app.get('/api/code/:id',code.getById)
}