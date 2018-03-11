var User = require('../models/user.model.js')
var crudUtil = require('../utils/crud.utils')
var GroupUser = require('../models/group_user.model')
const {getGroupFullInfo} = require('../utils/groupuser.utils')

exports.create = crudUtil.create({User})
exports.getById = crudUtil.getById({User})
exports.getAll = crudUtil.getAll({User})
exports.update = crudUtil.update({User})
exports.delete = crudUtil.deleteById({User})

exports.getInfoToCreateContractByUserId = (req, res) => {
  const {id} = req.params
  GroupUser.findOne({'userId':id},(err,groupUsers)=>{
    if(err||!groupUsers){
      res.status(500).send({message: "Could not full info of user id: " + id})
      return
    }
    getGroupFullInfo(groupUsers.groupId)
      .then(fullInfo=>{
        const {accountManager, members} = fullInfo
        // if user id is NOT the account manager of the group
        // then members will contain only the user being request, not other ones
        if(id!=accountManager.id){
          fullInfo.members = fullInfo.members.filter(m=>m.id==id)
        }
        res.send(fullInfo)
      })
      .catch(err=>res.status(500).send({message: "Could not get full info to create a contract"}))
  })
}