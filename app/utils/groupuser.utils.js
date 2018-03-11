var GroupUser = require('../models/group_user.model')
var Group = require('../models/group.model')
var User = require('../models/user.model')
var mongoose = require('mongoose')
const {getIdAndFullName} = require('./misc.utils')
const {
  RECORD_LIMIT,
  SUPER_USER,
  ACCOUNT_MANAGER,
  ACCOUNT_EXECUTIVE,
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

const buildGroupAndRole = (group, role) => ({
  'group': group,
  'role': role
})

// Return a promise with 2 parameters passed into the resolve: 
// 1. GroupId that user belongs to. If User is Super User, group parameter = super user
// 2. Role of that user in the group that (s)he belongs to
exports.getGroupByUserId = userId => (
  new Promise((resolve,reject)=>{
    User.findById(userId,(err,user)=>{
      if(err || !user){
        reject("Cannot get user")
        return
      }
      if(user.role.trim().toUpperCase()===SUPER_USER){
        resolve(buildGroupAndRole(SUPER_USER,SUPER_USER))
        return
      }
      GroupUser.findOne({userId},(err,groupuser)=>{
        if(err || !groupuser){
          reject("User does not belong to any group")
          return
        }
        Group.findById(groupuser.groupId,(err,group)=>{
          if(err || !group){
            reject("User does not belong to any group")
            return
          }
          let role = group.amUserId === userId ? ACCOUNT_MANAGER : ACCOUNT_EXECUTIVE
          resolve(buildGroupAndRole(group,role))
        })
      })
    })
  })
)