/* eslint no-param-reassign: 0 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Entity = require("../models/entity.js");

module.exports = entity => {
  return (req, res, next, value) => {
  	console.log(req, value);
    Entity.findById(value).exec(function(err, data) {
    	if (err) {
  			res.status(400).json(err);
    	}
	   	if (data) {
	      req[entity] = data;
	      console.log(req);
	      next();
	    } else {
	      res.status(404).send(`Invalid ${entity} ID`);
	    }
    });
  };
};