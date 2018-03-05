var Receiver = require('../models/receiver.model.js');
var Session = require('../models/session.model.js');

const updateParentSession = (sessionId, lastReceivingTime) => {
  Session.findById(sessionId, function(err, session) {
    if(err) {
      console.log(err)
    } else {
      session.samplingDelivered = session.samplingDelivered + 1
      session.end = lastReceivingTime
      session.save(function(err, data){
        if(err) {
          console.log(err)
        } else {
          
        }
    });
    }
  });
}

exports.create = function(req, res) {
  const {sessionId, receiverNo, receivingTime, imgUrl} = req.body;
  // Create and Save a new receiver
  if(!sessionId || !receiverNo || !receivingTime || !imgUrl) {
    res.status(400).send({message: 
      `${sessionId?'':'sessionId'}${receiverNo?'':', receiverNo'}${receivingTime?'':', receivingTime'}${imgUrl?'':', imgUrl'} cannot be null`});
  }
  var receiver = new Receiver({sessionId, receiverNo, receivingTime, imgUrl});

    receiver.save(function(err, data) {
    if(err) {
        res.status(500).send({message: "Some error occurred while creating the receiver."});
    } else {
      updateParentSession(sessionId, receivingTime)
      res.send(data);
    }
  });
};

exports.findOne = function(req, res) {
  const {receiverId} = req.params;
  // Find a single receiver with a receiverId
  Receiver.findById(receiverId, function(err, data) {
    if(err) {
        res.status(500).send({message: "Could not retrieve receiver with id " + receiverId});
    } else {
        res.send(data);
    }
  });
};

exports.update = function(req, res) {
  const {receiverId} = req.params;
  // Update a receiver identified by the receiverId in the request
  Receiver.findById(receiverId, function(err, receiver) {
    if(err) {
        res.status(500).send({message: "Could not find a receiver with id " + receiverId});
    }

    Object.keys(req.body).forEach(k => {
      receiver[k] = req.body[k];
    });

    Receiver.save(function(err, data){
        if(err) {
            res.status(500).send({message: "Could not update receiver with id " + receiverId});
        } else {
            res.send(data);
        }
    });
  });
};

exports.delete = function(req, res) {
  // Delete a receiver with the specified receiverId in the request
  const {receiverId} = req.params;
  Receiver.remove({_id: receiverId}, function(err, data) {
    if(err) {
        res.status(500).send({message: "Could not delete receiver with id " + receiverId});
    } else {
        res.send({message: "Receiver deleted successfully!"})
    }
  });
};

exports.findAllBySessionId = function(req, res) {
  const {sessionId} = req.params;
  const RECORD_LIMIT = 50;
  // Find a receivers by a sessionId

  Receiver.find({sessionId: sessionId}).limit(RECORD_LIMIT).exec(function(err, data){
    if(err) {
      res.status(500).send({message: "Could not retrieve receivers of session with id " + sessionId});
    } else {
      res.send(data);
    }
  });
};