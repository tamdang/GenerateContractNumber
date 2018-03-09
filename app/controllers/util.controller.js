exports.getById = getById
exports.deleteById = deleteById
exports.getAll = getAll

const {
  RECORD_LIMIT
} = require('../../setting/contants')

const getNameFromFound = (found) => found[0].split('\(')[1].trimLeft()

function getById(model){
  var re = /getById\(\s*\w+/
  console.log('getById', arguments.callee.caller)
  let modelName = getNameFromFound(arguments.callee.caller.toString().match(re))

  return function(req, res){
    const {id} = req.params
    model.findById(id,function(err, setting){
      if(err) {
        res.status(500).send({message: "Could not retrieve " + modelName})
        return
      } 
      res.send({[modelName]: setting})
    })
  }
}

function deleteById(model){
  var re = /deleteById\(\s*\w+/
  let modelName = getNameFromFound(arguments.callee.caller.toString().match(re))
  return function(req, res){
    const {id} = req.params
    model.remove({_id: id}, function(err, data) {
      if(err) {
        res.status(500).send({message: "Could not delete " + modelName + "with id " + id});
        return
      } else {
        res.send({message: modelName+" was deleted successfully!"})
      }
    })
  }
}

function getAll(model){
  var re = /getAll\(\s*\w+/
  let modelName = getNameFromFound(arguments.callee.caller.toString().match(re))
  return function (req, res) {
    model.find().limit(RECORD_LIMIT).exec(function(err, models){
      if(err) {
        res.status(500).send({message: "Could not retrieve "+modelName})
        return
      } 
      res.send(models)
    })
  }
}