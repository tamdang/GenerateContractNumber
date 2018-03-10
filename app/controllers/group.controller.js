var Group = require('../models/group.model.js')
var GroupUser = require('../models/group_user.model')
var User = require('../models/user.model')
var mongoose = require('mongoose')
var crudUtil = require('./util.crud')
const {getGroupFullInfo} = require('./util.groupuser')
const {
  RECORD_LIMIT
} = require('../../setting/contants')

exports.create = crudUtil.create({Group})
exports.update = crudUtil.update({Group})
exports.delete = crudUtil.deleteById({Group})
exports.getAll = crudUtil.getAll({Group})
exports.getById = crudUtil.getById({Group})

exports.addUser = function(req, res){
  const {userId} = req.body
  const {groupId} = req.params

  var groupUser = new GroupUser({groupId, userId})
    groupUser.save(function(err, groupUser) {
    if(err) {
      res.status(500).send({message: "Some error occurred while adding the user."})
      return
    }
    res.send(groupUser)
  })
}

exports.removeUser = function(req, res){
  const {groupId, userId} = req.params
  GroupUser.findOneAndRemove({groupId, userId}).exec(function(err,data){
    if(err){
      res.status(500).send({message: "Some error occured while getting the group user"})
      return
    }
    res.send({message: "User was removed from group successfully!"})
  })
}

exports.getUsers = function(req, res){
  const {groupId} = req.params
  GroupUser.find({groupId}).limit(RECORD_LIMIT).exec(function(err,groupusers){
    let userIds = groupusers.map(gu=>mongoose.Types.ObjectId(gu.userId))
    User.find({ '_id':{$in:userIds}}).exec(function(err,users){
      if(err) {
        res.status(500).send({message: "Could not retrieve users"})
        return
      } 
      res.send(users)
    })
  })
}

exports.getGroupFullInfo = (req, res)=>{
  const {id} = req.params
  getGroupFullInfo(id)
    .then(groupFullInfo=>{
      res.send(groupFullInfo)
    })
    .catch(err=>res.status(500).send({message: "Some error occur while getting the data"}))
}