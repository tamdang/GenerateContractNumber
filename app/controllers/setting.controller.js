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

exports.delete = function(req, res){
  const {id} = req.params
  Setting.remove({_id: id}, function(err, data) {
    if(err) {
      res.status(500).send({message: "Could not delete setting with id " + id});
      return
    } else {
      res.send({message: "Setting was deleted successfully!"})
    }
  })
}

exports.getById = function(red, res){
  const {id} = req.params
  Setting.findById(id,function(err, setting){
    if(err) {
      res.status(500).send({message: "Could not retrieve setting"})
      return
    } 
    res.send(setting)
  })
}

exports.getAll = function(req, res) {
  Setting.find().limit(RECORD_LIMIT).exec(function(err, settings){
    if(err) {
      res.status(500).send({message: "Could not retrieve settings"})
      return
    } 
    res.send(settings)
  })
}

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