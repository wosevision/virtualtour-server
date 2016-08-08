const formatEntities = require('../../utils/formatEntities');

module.exports = (req, res) => {
  var entity = req.query.hasOwnProperty('lean') ? formatEntities([req.Entity]) : req.Entity;

  res.status(200).json(entity);
};