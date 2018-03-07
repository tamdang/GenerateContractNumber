var Code = require('../models/code.model.js');

exports.getAll = function(req, res) {
  Code.find().exec(function(err, data){
    if(err) {
      res.status(500).send({message: "Could not retrieve Code"})
    } else {
      res.send(data)
    }
  })
}

exports.update = function(req, res){
  const {id} = req.params;
  Code.findById(id, function(err, code) {
    if(err) {
        res.status(500).send({message: "Could not find a code with id " + id});
    }

    Object.keys(req.body).forEach(k => {
      code[k] = req.body[k]
    })

    Code.save(function(err, data){
        if(err) {
            res.status(500).send({message: "Could not update code with id " + id});
        } else {
            res.send(data);
        }
    })
  })
}

exports.create = function(req, res){
  const {masterCode, latestNumber, isExternal, isDefault} = req.body
  if(!masterCode || !latestNumber) {
    res.status(400).send({message: 
      `${masterCode?'':'masterCode'}${latestNumber?'':', latestNumber'} cannot be null`})
  }
  var code = new Code({masterCode, latestNumber, isExternal, isDefault})
    code.save(function(err, data) {
    if(err) {
        res.status(500).send({message: "Some error occurred while creating the code."});
    } else {
      res.send(data)
    }
  })

}

exports.delete = function(req, res) {
  const {id} = req.params;
  Code.remove({_id: id}, function(err, data) {
    if(err) {
        res.status(500).send({message: "Could not delete code with id " + id});
    } else {
        res.send({message: "Code was deleted successfully!"})
    }
  })
}