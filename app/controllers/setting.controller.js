var Setting = require('../models/setting.model.js')
var utilCRUD = require('./util.controller')

exports.create = utilCRUD.create({Setting})
exports.update = utilCRUD.update({Setting})
exports.deleteById = utilCRUD.deleteById({Setting})
exports.getById = utilCRUD.getById({Setting})
exports.getAll = utilCRUD.getAll({Setting})

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