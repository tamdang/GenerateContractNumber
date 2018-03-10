var GroupUser = require('../models/group_user.model')
var Group = require('../models/group.model')
var User = require('../models/user.model')
var mongoose = require('mongoose')
const {getFullName} = require('../../setting/setting')
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
        console.log(group)
        let ret = {
          'groupName': group.name,
          'colleagues': users.map(({firstName, lastName, middleName})=>
                        getFullName(firstName, lastName, middleName))
        }
        resolve(ret)
      })
    })
    .catch(err=>reject(err))
  })
)