module.exports = function(app) {
  var group = require('../controllers/group.controller.js')
  app.post('/api/group', group.create)
  app.post('/api/group/:groupId', group.addUser)
  app.delete('/api/group/:groupId:userid',group.removeUser)
  app.delete('/api/group/:id', group.delete)
  app.get('/api/group/:id',group.getById)
  app.get('/api/group',group.getAll)
}