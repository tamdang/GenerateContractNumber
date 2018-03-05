var Session = require('../models/session.model.js');

exports.create = function(req, res) {
  const {supervisor, location, province, address, 
    geolocation, start, end, brand, status, samplingDelivered, comment} = req.body;
  // Create and Save a new Note
  if(!supervisor || !geolocation || !location) {
    res.status(400).send({message: `${supervisor?'':'supervisor'}${geolocation?'':', geolocation'}${location?'':', location'} cannot be null`});
  }
  var session = new Session({supervisor, location, province, address, 
    geolocation, start, end, brand, status, samplingDelivered, comment});

  session.save(function(err, data) {
    if(err) {
        res.status(500).send({message: "Some error occurred while creating the session."});
    } else {
        res.send(data);
    }
  });
};

exports.findAll = function(req, res) {
  // Retrieve and return all notes from the database.
  Session.find(function(err, sessions){
      if(err) {
          res.status(500).send({message: "Some error occurred while retrieving sessions."});
      } else {
          res.send(sessions);
      }
  });
};

exports.findOne = function(req, res) {
  const {sessionId} = req.params;
  // Find a single note with a noteId
  Session.findById(sessionId, function(err, data) {
    if(err) {
        res.status(500).send({message: "Could not retrieve session with id " + sessionId});
    } else {
        res.send(data);
    }
  });
};

exports.update = function(req, res) {
  const {sessionId} = req.params;
  // Update a note identified by the noteId in the request
  Session.findById(sessionId, function(err, session) {
    if(err) {
        res.status(500).send({message: "Could not find a session with id " + sessionId});
    }

    Object.keys(req.body).forEach(k => {
      session[k] = req.body[k];
    });

    session.save(function(err, data){
        if(err) {
            res.status(500).send({message: "Could not update session with id " + sessionId});
        } else {
            res.send(data);
        }
    });
  });
};

exports.delete = function(req, res) {
  // Delete a note with the specified noteId in the request
  const {sessionId} = req.params;
  Session.remove({_id: sessionId}, function(err, data) {
    if(err) {
        res.status(500).send({message: "Could not delete session with id " + sessionId});
    } else {
        res.send({message: "Session deleted successfully!"})
    }
  });
};