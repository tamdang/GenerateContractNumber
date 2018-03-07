var User = require('../models/user.model.js')
const {
  RECORD_LIMIT
} = require('../../setting/contants')

exports.create = function(req, res){
  const {fbId, firstName, lastName, middleName, role} = req.body

  var user = new User({fbId, firstName, lastName, middleName, role})
    code.save(function(err, user) {
    if(err) {
        res.status(500).send({message: "Some error occurred while creating the code."})
        return
    }
    res.send(user)
  })
}

exports.update = function(req, res){
  const {id} = req.params
  User.findById(id, function(err, user) {
    if(err) {
      res.status(500).send({message: "Could not find a user with id " + id})
      return
    }

    Object.keys(req.body).forEach(k => {
      user[k] = req.body[k]
    })

    User.save(function(err, user){
      if(err) {
        res.status(500).send({message: "Could not update user with id " + id})
        return
      } 
      res.send(user)
    })
  })
}

exports.delete = function(req, res){
  const {id} = req.params
  User.remove({_id: id}, function(err, data) {
    if(err) {
      res.status(500).send({message: "Could not delete user with id " + id});
      return
    } else {
      res.send({message: "User was deleted successfully!"})
    }
  })
}

exports.getById = function(red, res){
  const {id} = req.params
  User.findById(id,function(err,user){
    if(err) {
      res.status(500).send({message: "Could not retrieve user"})
      return
    } 
    res.send(user)
  })
}

exports.getAll = function(req, res) {
  User.find().limit(RECORD_LIMIT).exec(function(err, users){
    if(err) {
      res.status(500).send({message: "Could not retrieve users"})
      return
    } 
    res.send(users)
  })
}