const Entity = require("../models/entity.js");
const Scene = require("../models/scene.js");
const colors = require('colors/safe');

module.exports = {

  buildEntity: function (req, newObj) {

  	var entity = (newObj === true) ? new Entity() : {};
  	var attrs = [];

    for (var attr in req.body) {      
      if (req.body.hasOwnProperty(attr)) {
        switch (attr) {
          case 'type':
            entity.type = req.body.type;
            console.log(colors.bgBlack.cyan('TYPE added: %s'), req.body.type);
            break;
          case 'entities':
            entity.entities = req.body.entities;
            console.log(colors.bgBlack.cyan('ENTITY added: %s'), req.body.entities);
            break;
          default:
            attrs.push(attr);
            break;
        }
      }
    }

    var attrsLength = attrs.length;
    if (attrsLength > 0) {
      entity.attrs = [];
      for (var i=0; i<attrsLength; i++) {
        var prop = attrs[i];
        var val = req.body[attrs[i]];
        if (val) {
          entity.attrs.push({ prop: prop, val: val });
        } else {
          entity.attrs.push({ prop: prop });
        }
        console.log(colors.bgBlack.cyan('ATTR added: %s=%s'), attrs[i], req.body[attrs[i]]);
      }
    }

    return entity;

  },

  buildScene: function (req, newObj) {

    var scene = (newObj === true) ? new Scene() : {};
    var attrs = [];

    for (var attr in req.body) {      
      if (req.body.hasOwnProperty(attr)) {
        switch (attr) {
          case 'name':
            scene.name = req.body.name ? req.body.name : 'Scene ' + scene.code;
            console.log(colors.bgBlack.cyan('NAME added: %s'), req.body.name);
            break;
          default:
            scene[attr] = req.body[attr];
            break;
        }
      }
    }

  }

};