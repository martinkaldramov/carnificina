var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var {ObjectID} = require('mongodb'); // eslint-disable-line

var {Agent} = require('./models/agent.js');
const incController = require('./controllers/incident_controller');

var app = express();

app.use('/static', express.static(path.join(__dirname + '/../static')));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/../index.html'));
});

app.post('/incidents', (req, res) => {
  incController.incidentAssign(req, res);
});

app.post('/incidents-reassign', (req, res) => {
    incController.incidentReassign(req, res);
});

app.get('/incidents', (req, res) => {
  incController.incidentList(req, res);
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
  console.log('Listening on port 3000'); // eslint-disable-line
});

module.exports = {app};
