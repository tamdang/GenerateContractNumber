var Code = require('../models/code.model.js');
var crudUtil = require('./util.crud')

exports.create = crudUtil.create({Code})
exports.getById = crudUtil.getById({Code})
exports.getAll = crudUtil.getAll({Code})
exports.update = crudUtil.update({Code})
exports.delete = crudUtil.deleteById({Code})