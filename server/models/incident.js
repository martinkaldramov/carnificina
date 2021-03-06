var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var incidentSchema = new Schema({
  incNumber: {
    type: String,
    required: true
  },
  assignedAt: {
    type: Date,
    default: new Date()
  },
  assignedBy: {
    type: String,
    required: true
  },
  assignedTo: {
    type: String,
    required: true
  },
  assignmentType: {
    type: String,
    default: 'rotation'
  },
  queue: {
    type: String,
    required: true
  },
  track: {
    type: Boolean,
    default: true
  }
});

var Incident = mongoose.model('Incident', incidentSchema);

module.exports = {Incident};
