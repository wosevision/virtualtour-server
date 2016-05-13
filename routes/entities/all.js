var Entity = require("../../models/entity.js");

module.exports = (req, res) => {

  const entities = Entity.find()/*.lean()*/.exec(function(err, data) {

    res.status(200).json(data);

  });

};