const Entity = require("../models/entity.js");
const Scene = require("../models/scene.js");
const colors = require('colors/safe');

module.exports = {

  buildEntity: function (req, newObj) {

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

  },

  buildScene: function (req, newObj) {

    var scene = (newObj === true) ? new Scene() : {};
    var attrs = [];

    for (var attr in req.body) {      
      if (req.body.hasOwnProperty(attr)) {
        switch (attr) {
          case 'name':
            scene.name = req.body.name ? req.body.name : 'Scene ' + scene.code;
            console.log(colors.bgBlack.cyan('>> name added >> %s'), req.body.name);
            break;
          default:
            scene[attr] = req.body[attr];
            break;
        }
      }
    }

  }

};