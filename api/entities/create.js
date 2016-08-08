const Entity = require("../../models/entity.js");
const buildEntity = require("../../utils/buildEntity.js");
const colors = require('colors/safe');

module.exports = (req, res) => {

  console.log(colors.bgMagenta.cyan('CREATE ENTITY request'), req.body);

  var entity = buildEntity(req, true);

  entity.save(function(err, data) {
    if (req.Entity) {
      var parent = req.Entity;
      parent.entities.push(entity._id)
      Entity.findByIdAndUpdate(parent._id, parent, function(e, d) {
        console.log(colors.bgBlack.cyan('ENTITY added to children of: %s'), parent._id);
      });
    }
    if (err) {
      res.status(400).json(err);
    }
    console.log(colors.rainbow('ENTITY SAVED!'), data);
    res.status(201).json(data);
  });

};