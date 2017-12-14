var {Agent} = require('./../models/agent.js');

module.exports.getConfiguration = (req, res) => {

  Agent.find({assignee: true})
    .then((agents) => {
      res.send(agents);
    })
    .catch((e) => {
      res.send(e);
    });
    
}
