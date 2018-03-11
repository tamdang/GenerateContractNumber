var Contract = require('../models/contract.model')
var Code = require('../models/code.model')
var Setting = require('../models/setting.model')
var GroupUser = require('../models/group_user.model')
var Group = require('../models/group.model')
var User = require('../models/user.model')
var crudUtil = require('../utils/crud.utils')
var {generateNewContractNumber} = require('../utils/code.utils')
var {getGroupByUserId} = require('../utils/groupuser.utils')
const {
  RECORD_LIMIT,
  SUPER_USER,
  ACCOUNT_MANAGER,
  ACCOUNT_EXECUTIVE,
} = require('../../setting/contants')

exports.create = function(req, res) {
  const {accountManagerId, accountExecutiveId, client, 
    brand, budget, signDate, start, end, description} = req.body

  // Get the threshold to determine whether the contract number is internal or external
  Setting.findOne({key: 'threshold'}).exec(function(err, threshold){
    if(err || !threshold) {
      res.status(500).send({message: "Could not retrieve the threshold"})
      return
    }

    let isExternal = budget > threshold.value

    generateNewContractNumber(isExternal)
      .then(contractNumber=>{
        var contract = new Contract({contractNumber, accountManagerId, accountExecutiveId, 
                                    client, brand, budget, signDate, start, end, description})
        contract.save((err, contract)=>{
          if(err || !contract) {
            res.status(500).send({message: "Some error occurred while creating the contract."})
            return
          } 
          res.send(contract)
        })
      })
      .catch(err=>{
        res.status(500).send({message: err})
      })
  })
}

exports.getById = crudUtil.getById({Contract})

exports.delete = crudUtil.deleteById({Contract})

exports.update = crudUtil.update({Contract})

exports.getAll = crudUtil.getAll({Contract})

exports.getByUserId = function(req, res) {
  const {userId} = req.params
  getGroupByUserId(userId)
    .then(groupAndRole=>{
      const {group, role} = groupAndRole
      let querryCondition = null
      if(role===SUPER_USER){
        querryCondition = {}
      }
      else if(role===ACCOUNT_MANAGER){
        querryCondition = {"accountManagerId":userId}
      }
      else{
        querryCondition = {"accountExecutiveId":userId}
      }
      Contract.find(querryCondition).limit(RECORD_LIMIT).exec(function(err,contracts){
        if(err){
          res.status(500).send({message: "Could not get any contract."})
          return
        }
        res.send(contracts)
      })
    })
    .catch(err=>{
      res.status(500).send({message: "Could not get any contract."})
    })
}
