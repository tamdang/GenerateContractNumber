var Setting = require('../models/setting.model.js')
var crudUtil = require('./util.controller')

exports.create = crudUtil.create({Setting})
exports.update = crudUtil.update({Setting})
exports.deleteById = crudUtil.deleteById({Setting})
exports.getById = crudUtil.getById({Setting})
exports.getAll = crudUtil.getAll({Setting})

exports.getByKey = function(req, res){
  const {key} = req.params
  Setting.findOne({'key':key}).exec(function(err, setting){
    if(err || !setting) {
      res.status(500).send({message: "Could not retrieve setting"})
      return
    }
    res.send({'value':setting['value']})
  })
}