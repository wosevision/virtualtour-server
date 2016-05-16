var Entity = require("../../models/entity.js");

module.exports = (req, res) => {

  console.log('UPDATE ENTITY request: ', req.body);
  const entityObj = {};

  if (req.body.type) {
    entityObj.type = req.body.type;
  }

  const attrs = [];
  for (var attr in req.body) {      
    if (req.body.hasOwnProperty(attr) && attr != 'type') attrs.push(attr);
  }
  attrsLength = attrs.length;
  if (attrsLength > 0) {
    entityObj.attrs = [];
    for (var i=0; i<attrsLength; i++) {
      entityObj.attrs.push({ prop: attrs[i], val: req.body[attrs[i]] });
      console.log('ATTR added: ', attrs[i], req.body[attrs[i]]);
    }
  }

  Entity.findByIdAndUpdate(req.Entity._id, entityObj, { new: true }, function(err, data) {
    if (err) {
      res.status(400).json(err);
    }
    console.log('ENTITY saved: ', data);
    res.status(200).json(data);
  });

};