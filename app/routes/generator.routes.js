module.exports = function(app) {
  var contractor = require('../controllers/contract.controller.js');
  app.get('/api/contract', contractor.generateContractNumber);
}