const Entity = require("../../models/entity.js");
const buildEntity = require("../../utils/buildEntity.js");
const colors = require('colors/safe');

module.exports = (req, res) => {

  console.log(colors.bgMagenta.cyan('UPDATE ENTITY request:'), req.body);
  
  var entityObj = buildEntity(req);

  Entity.findByIdAndUpdate(req.Entity._id, entityObj, { new: true }, function(err, data) {
    if (err) {
      res.status(400).json(err);
    }
    console.log(colors.rainbow('ENTITY SAVED!'), data);
    res.status(200).json(data);
  });

};