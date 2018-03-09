var Contract = require('../models/contract.model')
var Code = require('../models/code.model')
var Setting = require('../models/setting.model')
var GroupUser = require('../models/group_user.model')
var Group = require('../models/group.model')
var crudUtil = require('./util.controller')
const {
  RECORD_LIMIT
} = require('../../setting/contants')

exports.create = function(req, res) {
  const {accountManagerId, accountExecutiveId, client, brand, budget, signDate, start, end} = req.body

  // Get the threshold to determine whether the contract number is internal or external
  Setting.find({key: 'threshold'}).exec(function(err, threshold){
    if(err) {
      res.status(500).send({message: "Could not retrieve the threshold"})
      return
    }
    let isExternal = budget > threshold
    // Find the code which can be internal or external and the default is true
    // to get masterCode and its latestNumber. Then update the contractNumber
    Code.findOne({isExternal: isExternal, isDefault: true}).exec(function(err, code){
      if(err) {
        res.status(500).send({message: "Could not retrieve the code"})
        return
      } 
      // Save latestNumber in the code
      code.latestNumber = latestNumber + 1
      code.save(function(err,code){
        if(err){
          res.status(500).send({message: "Could not save the new code"})
          return 
        }
        const {masterCode, latestNumber} = code
        let contractNumber = masterCode + ' ' + latestNumber
        // Create new contract, save it to database and then return it
        var contract = new Contract({contractNumber, accountManagerId, accountExecutiveId, client, brand, budget, signDate, start, end})
        contract.save(function(err, contract) {
          if(err) {
            res.status(500).send({message: "Some error occurred while creating the contract."})
            return
          } 
          res.send(contract)
        })
      })
    })
  })
}

exports.getById = crudUtil.getById({Contract})

exports.delete = crudUtil.deleteById({Contract})

exports.update = crudUtil.update({Contract})

exports.getByUserId = function(req, res) {
  const {userId} = req.params
  User.findById(userId,function(err,user){
    if(err){
      res.status(500).send({message: "Could not get user with id " + userId})
      return
    }
    // If user is super admin
    if(user.role==='sa'){
      Contract.find().limit(RECORD_LIMIT).exec(function(err,contracts){
        if(err){
          res.status(500).send({message: "Could not get contract of user " + userId})
          return
        }
        res.send(contracts)
      })
    }
    else{
      // Get group id that user belongs to
      GroupUser.findOne({userId:userId}).exec(function(err,groupUser){
        if(err){
          res.status(500).send({message: "Could not group of user with id " + userId})
          return
        } 
        // Get group of the group that user belongs to
        Group.getById(groupUser.groupId,function(err,group){
          if(err){
            res.status(500).send({message: "Could not group of user with id " + userId})
            return
          }
          // If user is the account manager of the group (s)he belongs to
          let amOrAE = group.amUserId===userId ? 'accountManagerId' : 'accountExecutiveId'
          Contract.find({[amOrAE]:userId}).limit(RECORD_LIMIT).exec(function(err,contracts){
            if(err){
              res.status(500).send({message: "Could not find contract of user with id " + userId})
              return
            }
            res.send(contracts)
          })
        })
      })
    }
  })
}
