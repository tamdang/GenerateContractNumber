module.exports = function(app) {
  var maggi = require('../controllers/maggi.controller.js')
  app.post('/api/maggi', maggi.create)
  app.get('/api/maggi',maggi.getAll)
}
