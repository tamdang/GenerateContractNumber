var GroupUser = require('../models/group_user.model')
var Group = require('../models/group.model')
var User = require('../models/user.model')
var mongoose = require('mongoose')
const getFullName = require('../../setting/setting')
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
          console.log('group',group)
          if(err){
            reject(err)
            return
          } 
          let ret = {
            'groupName': group.name,
            'accountManager': getFullName(firstName, lastName, middleName),
            'colleagues': users.map(({firstName, lastName, middleName})=>
                getFullName(firstName,lastName,middleName))
          }
          User.findOne({'_id':group.amUserId}, (err,accountManager)=>{
            console.log('accountManager', accountManager)
            if(err) reject(err)
            if(accountManager){
              const {firstName,lastName, middleName} = accountManager
              let ret = {
                'groupName': group.name,
                'accountManager': getFullName(firstName, lastName, middleName),
                'colleagues': users.map(({firstName, lastName, middleName})=>
                    getFullName(firstName,lastName,middleName))
              }
              resolve(ret)
              return
            }
            reject('something when wrong')
            return
          })
        })
      })
      .catch(err=>reject(err))
  })
)