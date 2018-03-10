var GroupUser = require('../models/group_user.model')
var Group = require('../models/group.model')
var User = require('../models/user.model')
var mongoose = require('mongoose')
const {getIdAndFullName} = require('./misc.utils')
const {
  RECORD_LIMIT
} = require('../../setting/contants')

const getUsersByGroupId = groupId => (
  new Promise((resolve, reject)=>{
    GroupUser.find({groupId}).limit(RECORD_LIMIT).exec((err,groupusers)=>{
      let userIds = groupusers.map(gu=>mongoose.Types.ObjectId(gu.userId))
      User.find({ '_id':{$in:userIds}}).exec((err,users)=>{
        if (err) reject(err)
        else resolve(users)
      })
    })
  })
)

exports.getUsersByGroupId = getUsersByGroupId

exports.getGroupFullInfo = groupId => (
  new Promise((resolve, reject)=>{
    getUsersByGroupId(groupId)
    .then(users=>{
      Group.findById(groupId,(err,group)=>{
        User.findById(group.amUserId,(err,accountManager)=>{
          let ret = {
            'groupName': group.name,
            'accountManager': getIdAndFullName(accountManager),
            'members': users.map(user=>getIdAndFullName(user))
          }
          resolve(ret)
        })
      })
    })
    .catch(err=>reject(err))
  })
)