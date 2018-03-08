module.exports = function(app) {
  var group = require('../controllers/group.controller.js')
  app.post('/api/group', group.create)
  app.post('/api/group/:groupId', group.addUser)
  app.put('/api/group/:id', group.update)
  app.delete('/api/group/:groupId-:userId',group.removeUser)
  app.delete('/api/group/:id', group.delete)
  app.get('/api/group/:id',group.getById)
  app.get('/api/group',group.getAll)
  app.get('/api/group/getuser/:groupId',group.getUsers)
}