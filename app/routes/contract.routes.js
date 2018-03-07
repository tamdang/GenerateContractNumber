module.exports = function(app) {
  var contract = require('../controllers/contract.controller.js')
  app.post('/api/contract', contract.create)
  app.get('/api/contract/:id', contract.getById)
  app.delete('/api/contract/:id', contract.delete)
  app.put('/api/contract/:id', contract.update)
  app.get('/api/contracts/:userId',contract.getByUserId)
}