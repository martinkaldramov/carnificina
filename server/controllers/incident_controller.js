var {Incident} = require('./../models/incident.js');

module.exports.incidentAssign = (req, res) => {

  Incident.findOne({incNumber: req.body.incNumber}).then((inc) => {

    if(inc){
      res.send(202, inc);
    }else{
      var incident = new Incident({
        incNumber: req.body.incNumber,
        assignedBy: req.body.assignedBy,
        assignedTo: req.body.assignedTo,
        queue: req.body.queue
      });

      incident.save().then((inc) => {
        res.send(inc);
      }).catch((e) => {
        res.send(e);
      });
    }
 }).catch((e) => {
   res.send(e);
 });
}

module.exports.incidentReassign = (req, res) => {

  Incident.findOne({incNumber: req.body.incNumber}).then((incident) => {

    incident.incNumber = req.body.incNumber;
    incident.assignedTo = req.body.assignedTo;
    incident.assignedAt = new Date();
    incident.assignedBy = req.body.assignedBy;
    incident.assignmentType = "re-assigned";
    incident.save().then((inc) => {
      res.send(inc);
    }).catch((e) => {
      res.send(e);
    });

  })
  .catch((e) => {
    res.send(e);
  });

}

module.exports.incidentList = (req, res) => {
  Incident.find({}).then((incidents) => {
    res.send(incidents);
  }).catch((e) => {
    res.send(e);
  });
}
