/* eslint no-param-reassign: 0 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const Entity = require("../models/entity.js");
// const Scene = require("../models/entity.js");

module.exports = type => {
  return (req, res, next, value) => {
    mongoose.model(type).findByCode(value, function(err, data) {
    	if (err) {
  			res.status(400).json(err);
    	}
	   	if (data) {
	   		//console.log(data);
	      req[type] = data;
	   		//console.log(req[type]);
	      next();
	    } else {
	      res.status(404).send(`Invalid ${type} ID`);
	    }
    });
  };
};