var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Incident} = require('./models/incident.js');
var {Agent} = require('./models/agent.js');

var app = express();

app.use('/static', express.static(path.join(__dirname + '/../static')));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/../index.html'));
});

app.post('/incidents', (req, res) => {
  var id = req.body.incNumber,
      assignee = req.body.assignedTo,
      assigner = req.body.assignedBy,
      timeNow = new Date();

  console.log(id);

  Incident.findOne({incNumber: id}).then((incident) => {

    console.log(incident);

    if(incident){
      console.log("processing the found incident part of the code");
      console.log(`${incident.incNumber}  already assigned to ${incident.assignedTo}. New assignee is ${assignee} \n`);
      incident.assignedTo = req.body.assignedTo;
      incident.assignedAt = new Date();
      incident.assignedBy = req.body.assignedBy;
      incident.assignmentType = "re-assigned";
      incident.history.push({
         assgnedAt: new Date(),
         assignedBy: req.body.assignedBy,
         assignedTo: req.body.assignedTo,
         assignmentType: "re-assigned" 
      });
      incident.save().then((inc) => {
        res.send(inc);  
      }).catch((e) => {
        res.send(e);  
      });
    }else{
      console.log("Inc not found part of code");
      var incident = new Incident({
        incNumber: req.body.incNumber,
        assignedBy: req.body.assignedBy,
        assignedTo: req.body.assignedTo,
        history: [{
          assgnedAt: new Date(),
          assignedBy: req.body.assignedBy,
          assignedTo: req.body.assignedTo,
          assignmentType: "rotation" 
        }]
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
});

app.get('/incidents', (req, res) => {
  Incident.find({}).then((incidents) => {
    res.send(incidents);
  }).catch((e) => {
    res.send(e);  
  });  
});

app.get('/configuration', (req, res) => {

  Agent.find({assignee: true})
    .then((agents) => {
      res.send(agents);
    })
    .catch((e) => {
      res.send(e);
    });

});

app.listen(3000, () => {
  console.log('Listening on port 3000');  
});

module.exports = {app};
