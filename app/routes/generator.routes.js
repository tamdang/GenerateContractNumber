module.exports = function(app) {
  var contractor = require('../controllers/generator.controller.js');
  app.get('/contractor', contractor.generateContractNumber);
}