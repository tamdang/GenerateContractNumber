module.exports = function(app) {
  var setting = require('../controllers/setting.controller.js')
  app.post('/api/setting', setting.create)
  app.put('/api/setting/:id', setting.update)
  app.delete('/api/setting/:id', setting.deleteById)
  app.get('/api/setting/:id',setting.getById)
  app.get('/api/setting',setting.getAll)
  app.get('/api/setting/key/:key',setting.getByKey)
}