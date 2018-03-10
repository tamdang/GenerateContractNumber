var User = require('../models/user.model.js')
var crudUtil = require('./util.crud')

var GroupUser = require('../models/group_user.model')

exports.create = crudUtil.create({User})
exports.getById = crudUtil.getById({User})
exports.getAll = crudUtil.getAll({User})
exports.update = crudUtil.update({User})
exports.delete = crudUtil.deleteById({User})

exports.getFullInfo = function getFullInfo(req, res){
  const {id} = req.params
  GroupUser.findOne({'userId':id},(err,groupUsers)=>{
    if(err){
      res.status(500).send({message: "Could not full info of user id: " + id})
      return
    }
    
  })
}