var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var agentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  assigner: {
    type: Boolean,
    default: false
  },
  assignee: {
    type: Boolean,
    default: false
  },
  active: {
    type: Boolean,
    default: true
  }
});

var Agent = mongoose.model('Agent', agentSchema);

module.exports = {Agent};
