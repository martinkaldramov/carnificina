var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Incident} = require('./models/incident.js');
var {Agent} = require('./models/agent.js');

var app = express();

app.use(bodyParser.json());

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
  Incident.findOne({incNumber: "INC1233445566"}).then((incident) => {
    if(incident)
      res.send({incident});  
    else
      res.send("No incident with this ID found :\(");
  }, (e) => {
    res.status(400).send(e);
  });  
});

// app.get('/todos/:id', (req, res) => {
//   var id = req.params.id;
// 
//   if(!ObjectID.isValid(id))
//     return res.status(404).send("");  
//   
//   Todo.findById(id).then((todo) => {
//     if(todo)
//       res.send(todo);
// 
//     res.status(404).send("Todo Item not found in the database");
//   }).catch((e) => {
//     res.status(404).send();  
//   });
// });

app.listen(3000, () => {
  console.log('Listening on port 3000');  
});

module.exports = {app};
