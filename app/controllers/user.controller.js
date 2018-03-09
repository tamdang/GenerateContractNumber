var User = require('../models/user.model.js')
var crudUtil = require('./util.controller')

exports.create = crudUtil.create({User})
exports.getById = crudUtil.getById({User})
exports.getAll = crudUtil.getAll({User})
exports.update = crudUtil.update({User})
exports.delete = crudUtil.deleteById({User})