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

  Incident.findOne({incNumber: id}).then((err, incident) => {

    if(err)
      return err;

    console.log(incident);

    if(incident){
      incident.set({
        assignedTo: assignee,
        assignedAt: timeNow,
      });
      incident.history.push({
         assgnedAt: timeNow,
         assignedBy: ssigner,
         assignedTo: assignee
      });
      incident.save();
      res.send(`${incident[0].incNumber}  already assigned to ${incident[0].assignedTo}. New assignee is ${assignee}`);  
    }else{
      var incident = new Incident({
        incNumber: req.body.incNumber,
        assignedBy: req.body.assignedBy,
        assignedTo: req.body.assignedTo,
      });

      incident.save().then((doc) => {
        res.send(doc);
      }, (e) => {
        res.status(400).send(e);
      });
    } 
 }); 
});

app.get('/incidents', (req, res) => {
  Incident.find({incNumber: "INC12334TEST3"}).then((incidents) => {
    if(incidents.length > 0)
      res.send({incidents});  
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
