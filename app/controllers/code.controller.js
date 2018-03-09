var Code = require('../models/code.model.js');
var utilCRUD = require('./util.controller')

exports.getAll = utilCRUD.getAll({Code})
exports.update = utilCRUD.update({Code})
exports.create = utilCRUD.create({Code})
exports.delete = utilCRUD.deleteById({Code})
exports.getById = utilCRUD.getById({Code})