module.exports = function(app) {
  var setting = require('../controllers/user.controller.js')
  app.post('/api/setting', setting.create)
  app.put('/api/setting/:id', setting.update)
  app.delete('/api/setting/:id', setting.delete)
  app.get('/api/setting/:id',setting.getById)
  app.get('/api/setting',setting.getAll)
}