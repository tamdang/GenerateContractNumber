var Setting = require('../models/setting.model.js')
const {
  RECORD_LIMIT
} = require('../../setting/contants')

exports.create = function(req, res){
  const {key, value} = req.body
  var setting = new Setting({key, value})
    setting.save(function(err, setting) {
    if(err) {
      res.status(500).send({message: "Some error occurred while creating the setting."})
      return
    }
    res.send(setting)
  })
}

exports.update = function(req, res){
  const {id} = req.params
  const {key, value} = req.body
  Setting.findByIdAndUpdate(id,{key,value},function(err,setting){
    if(err) {
      res.status(500).send({message: "Could not update a setting with id " + id})
      return
    }
    res.send(setting)
  })
}

exports.deleteById = require('./util.controller').deleteById(Setting)
exports.getById = require('./util.controller').getById(Setting)
exports.getAll = require('./util.controller').getAll(Setting)

exports.getByKey = function(req, res){
  const {key} = req.params
  Setting.findOne({'key':key}).exec(function(err, setting){
    if(err) {
      res.status(500).send({message: "Could not retrieve setting"})
      return
    } 
    res.send({'value':setting['value']})
  })
}