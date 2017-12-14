const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const {ObjectID} = require('mongodb'); // eslint-disable-line
const incController = require('./controllers/incident_controller');
const configuration = require('./controllers/configuration_controller');

const app = express();

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
  configuration.getConfiguration(req, res);
});

app.listen(3000, () => {
  console.log('Listening on port 3000'); // eslint-disable-line
});

module.exports = {app};
