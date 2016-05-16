/* eslint no-param-reassign: 0 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const Entity = require("../models/entity.js");
// const Scene = require("../models/entity.js");

module.exports = type => {
  return (req, res, next, value) => {
    mongoose.model(type).findById(value).exec(function(err, data) {
    	if (err) {
  			res.status(400).json(err);
    	}
	   	if (data) {
	      req[type] = data;
	      next();
	    } else {
	      res.status(404).send(`Invalid ${type} ID`);
	    }
    });
  };
};