var Entity = require("../../models/entity.js");

module.exports = (req, res) => {

  console.log('CREATE ENTITY request: ', req.body);
  const entityObj = {};

  if (req.body.type) {
    entityObj.type = req.body.type;
    console.log('TYPE added: ', entityObj.type);
  }

  const entity = new Entity(entityObj);

  const attrs = [];
  for (var attr in req.body) {      
    if (req.body.hasOwnProperty(attr) && attr != 'type') attrs.push(attr);
  }
  attrsLength = attrs.length;
  if (attrsLength > 0) {
    entity.attrs = [];
    for (var i=0; i<attrsLength; i++) {
      entity.attrs.push({ prop: attrs[i], val: req.body[attrs[i]] });
      console.log('ATTR added: ', attrs[i], req.body[attrs[i]]);
    }
  }


  entity.save(function(err, data) {
    if (req.Entity) {
      const parent = req.Entity;
      parent.entities.push(entity._id)
      Entity.findByIdAndUpdate(parent._id, parent, function(e, d) {
        console.log('ENTITY added to: ', parent._id);
      });
    }
    if (err) {
      res.status(400).json(err);
    }
    console.log('ENTITY saved: ', data);
    res.status(200).json(data);
  });

};