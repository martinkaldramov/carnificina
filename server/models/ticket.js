var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var incidentSchema = new Schema({
  incNumber: {
    type: String,
    required: true
  },
  assignedAt: {
    type: Date,
    required: true
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
  prevAssignee: {
    type: String,
    default: null
  }
});

var Incident = mongoose.model('Incident', incidentSchema);

module.exports = {Todo};
