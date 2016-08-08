const Entity = require("../models/entity.js");
const colors = require('colors/safe');

module.exports = function (req, newObj) {

	var entity = (newObj === true) ? new Entity() : {attrs: []};
	var attrs = [];

  Object.keys(req.body).forEach(function(attr) {
      switch (attr) {
        case 'type':
        case 'entities':
          entity[attr] = req.body[attr];
          console.log(colors.bgBlack.magenta('>> %s added >> ') + colors.bgBlack.cyan('%s'), attr, req.body.type);
          break;
        default:
        	newAttr = (req.body[attr]) ? { prop: attr, val: req.body[attr] } : { prop: attr };
          entity.attrs.push(newAttr);
          console.log(colors.bgBlack.magenta('>> attr added >> ') + colors.bgBlack.cyan('%s = %s'), attr, req.body[attr]);
          break;
      }
  });

  return entity;

}