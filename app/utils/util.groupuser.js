var GroupUser = require('../models/group_user.model')
var Group = require('../models/group.model')
var User = require('../models/user.model')
var mongoose = require('mongoose')
const getFullName = require('../../setting/setting')
const {
  RECORD_LIMIT
} = require('../../setting/contants')

exports.getUsersByGroupId = groupId => {
  return new Promise((resolve, reject)=>{
    GroupUser.find({groupId}).limit(RECORD_LIMIT).exec((err,groupusers)=>{
      let userIds = groupusers.map(gu=>mongoose.Types.ObjectId(gu.groupId))
      User.find({'_id':{$in:userIds}},(err,users)=>{
        if (err) reject(err)
        return resolve(users)
      })
    })
  })
}

exports.getGroupFullInfo = groupId => {
  return new Promise((resolve, reject)=>{
    getUsersByGroupId(groupId)
      .then(users=>{
        Group.findById(groupId,(err,group)=>{
          if(err) reject(err)
          User.findById(group.amUserId, (err,{firstName, lastName, middleName})=>{
            if(err) reject(err)
            let ret = {
              'groupName': group.name,
              'accountManager': getFullName(firstName, lastName, middleName),
              'colleagues': users.map(({firstName, lastName, middleName})=>
                  getFullName(firstName,lastName,middleName))
            }
            resolve(ret)
          })
        })
      })
      .catch(err=>reject(err))
  })
}