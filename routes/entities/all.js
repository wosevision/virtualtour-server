var Entity = require("../../models/entity.js");

module.exports = (req, res) => {

  Entity.find()/*.lean()*/.exec(function(err, data) {

    res.status(200).json(data);

  });

};