var {Incident} = require('./../models/incident.js');

module.exports.postIncident = (req, res) => {

  Incident.findOne({incNumber: req.body.incNumber}).then((inc) => {

    if(inc){
      res.status(202).send(incident);
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
