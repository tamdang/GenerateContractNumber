module.exports = function(app) {
  var maggi = require('../controllers/maggi.controller.js')
  app.post('/api/maggi', user.create)
  app.get('/api/maggi',user.getAll)
}
