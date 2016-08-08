var Entity = require("../../models/entity.js");
var formatEntities = require('../../utils/formatEntities');

module.exports = (req, res) => {
  Entity.find()/*.lean()*/.exec(function(err, data) {
  	var entities = req.query.hasOwnProperty('lean') ? formatEntities(data) : data;
    res.status(200).json(entities);
  });

};