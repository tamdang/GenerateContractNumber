var Group = require('../models/group.model.js')
var GroupUser = require('../models/group_user.model')
const {
  RECORD_LIMIT
} = require('../../setting/contants')

exports.create = function(req, res){
  const {name, amUserId} = req.body

  var group = new Group({name, amUserId})
    group.save(function(err, group) {
    if(err) {
      res.status(500).send({message: "Some error occurred while creating the group."})
      return
    }
    res.send(group)
  })
}

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

exports.removeUser = function(red, res){
  const {groupId, userid} = req.params
  GroupUser.find({groupid,userid}).exec(function(err, groupUser){
    if(err){
      res.status(500).send({message: "Some error occured while getting the group user"})
      return
    }
    GroupUser.remove({id: groupUser._id}, function(err, data){
      if(err) {
        res.status(500).send({message: "Could not remove user from group."});
        return
      } else {
        res.send({message: "User was removed from group successfully!"})
      }
    })
  })

}

exports.delete = function(req, res){
  const {id} = req.params
  Group.remove({_id: id}, function(err, data) {
    if(err) {
      res.status(500).send({message: "Could not delete group with id " + id});
      return
    } else {
      res.send({message: "Group was deleted successfully!"})
    }
  })
}

exports.getById = function(red, res){
  const {id} = req.params
  Group.findById(id,function(err,group){
    if(err) {
      res.status(500).send({message: "Could not retrieve group"})
      return
    } 
    res.send(group)
  })
}

exports.getAll = function(req, res) {
  Group.find().limit(RECORD_LIMIT).exec(function(err, groups){
    if(err) {
      res.status(500).send({message: "Could not retrieve group"})
      return
    } 
    res.send(groups)
  })
}