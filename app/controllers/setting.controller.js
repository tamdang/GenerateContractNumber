var Setting = require('../models/setting.model.js')

exports.create = require('./util.controller').create({Setting})
exports.update = require('./util.controller').update({Setting})
exports.deleteById = require('./util.controller').deleteById({Setting})
exports.getById = require('./util.controller').getById({Setting})
exports.getAll = require('./util.controller').getAll({Setting})

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