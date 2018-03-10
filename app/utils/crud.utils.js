const {
  RECORD_LIMIT
} = require('../../setting/contants')

exports.getById = function(modelObject){
  const modelName = Object.keys(modelObject)[0]
  const model = modelObject[modelName]
  return function(req, res){
    const {id} = req.params
    model.findById(id,function(err, data){
      if(err) {
        res.status(500).send({message: "Could not retrieve " + modelName})
        return
      } 
      res.send(data)
    })
  }
}

exports.deleteById = function(modelObject){
  const modelName = Object.keys(modelObject)[0]
  const model = modelObject[modelName]
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

exports.getAll = function(modelObject){
  const modelName = Object.keys(modelObject)[0]
  const model = modelObject[modelName]
  return function (req, res) {
    model.find().limit(RECORD_LIMIT).exec(function(err, data){
      if(err) {
        res.status(500).send({message: "Could not retrieve "+modelName})
        return
      } 
      res.send(data)
    })
  }
}

exports.update = function(modelObject){
  //modelObject is the json with name of the model and the model as the value of the name
  //This is needed in order to display the message to user because we don't know 
  //how to get the model name
  const modelName = Object.keys(modelObject)[0]
  const model = modelObject[modelName]
  return function(req, res){
    const {id} = req.params
    model.findByIdAndUpdate(id,req.body,function(err,data){
      if(err) {
        res.status(500).send({message: "Could not update a " + modelName + " with id " + id})
        return
      }
      model.findById(id,(err,data)=>{
        if(err) {
          res.status(500).send({message: "Could not update a " + modelName + " with id " + id})
          return
        }
        res.send(data)
      })
    })
  }
}

exports.create = function(modelObject){
  const modelName = Object.keys(modelObject)[0]
  const model = modelObject[modelName]
  return function(req, res){
    var newModel = new model(req.body)
      newModel.save(function(err, data) {
      if(err) {
        res.status(500).send({message: "Some error occurred while creating the "+modelName})
        return
      }
      res.send(data)
    })
  }
}