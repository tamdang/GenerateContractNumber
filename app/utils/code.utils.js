var Code = require('../models/code.model')

//Generate new code will create a new code and save the latest code counter into database too
const generateNewContractNumber = isExternal => (
  new Promise((resolve, reject)=>{
    Code.findOne({isExternal, 'isDefault':true},(err,code)=>{
      if(err || !code){
        reject('Cannot get master code')
        return
      } 
      code.latestNumber = code.latestNumber + 1
      code.save((err,savedCode)=>{
        if(err || !savedCode){
          reject('Cannot save the new code')
          return
        }
        resolve(savedCode.masterCode + savedCode.latestNumber)
      })
    })
  })
)

exports.generateNewContractNumber = generateNewContractNumber