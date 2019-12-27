var Maggi = require('../models/maggi.model')
var crudUtil = require('../utils/crud.utils')

exports.create = crudUtil.create({Maggi})
exports.getAll = crudUtil.getAll({Maggi})
