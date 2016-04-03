var mongoose = require('mongoose');
var Location = require("../models/location.js");
var Panorama = require("../models/panorama.js");

module.exports = function(router) {

  /**
   * POST '/locations'
   * Receives a POST request of the new location config, saves to db, responds back
   * @param  {Object} req. An object containing the different attributes of the location
   * @return {Object} JSON
   */
  router.post('/locations', function(req, res){

      console.log(req.body);
      var coords = req.body.coords.split(',');
      var coordsEntrance = req.body.coordsEntrance.split(',');
      var scenes = req.body.scenes.split(',');
			var locationObject = {	
				name: req.body.name,
				category: req.body.category,
				label: req.body.label,
				code: req.body.code,	
				desc: req.body.desc,
				coords: coords,
				coordsEntrance: coordsEntrance,
				icon: req.body.icon,
				scenes: scenes
			};
      // create a new panorama model instance, passing in the object
      var location = new Location(locationObject);

      // now, save that panorama instance to the database
      // mongoose method, see http://mongoosejs.com/docs/api.html#model_Model-save    
      location.save(function(err,data){
        // if err saving, respond back with error
        if (err){
          var error = {message: 'Error saving location', error: err};
          return res.status(400).json(error);
        }
        return res.status(200).json(data);

      });
  });

  /**
   * GET '/locations'
   * Receives a GET request to get all locations
   * @return {Object} JSON
   */
  router.get('/locations', function(req, res){

    // mongoose method to find all, see http://mongoosejs.com/docs/api.html#model_Model.find
    Location.find().lean().populate('scenes', 'title code').exec(function(err, data){

      // if err or no locations found, respond with error 
      if (err) {
        var error = {message: 'Error retrieving location', error: err};
         return res.status(400).json(error);
      }
      if (data == null) {
        var error = {message: 'Location not found'};
         return res.status(404).json(error);
      }

      return res.status(200).json(data);

    });
  });

  /**
   * GET '/locations/:location'
   * Receives a GET request to return a given location
   * @return {Object} JSON
   */
  router.get('/locations/:location', function(req, res){

    var location = req.param('location');

    // mongoose method, see http://mongoosejs.com/docs/api.html#model_Model.findById
    Location.findByCode(location).lean().populate('scenes', 'title code').exec(function(err,data){

      // if err or no pano found, respond with error 
      if (err) {
        var error = {message: 'Error retrieving location', error: err};
         return res.status(400).json(error);
      }
      if (data == null) {
        var error = {message: 'Location not found'};
         return res.status(404).json(error);
      }

      return res.status(200).json(data);
    
    });
  });

  /**
   * POST '/locations/:id'
   * Receives a POST request with data of the location to update, updates db, responds back
   * @param  {String} req.param('id'). The _id to update
   * @param  {Object} req. An object containing the data to update
   * @return {Object} JSON
   */
  router.post('/locations/:id', function(req, res){

     var requestedId = req.param('id');


      console.log('the data to update is ' + JSON.stringify(req.body));

      // now, update that animal
      // mongoose method findByIdAndUpdate, see http://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate  
      Location.findByIdAndUpdate(requestedId, req.body, {new: true}, function(err,data){
        // if err or no pano found, respond with error 
        if (err) {
          var error = {message: 'Error retrieving hotspot', error: err};
           return res.status(400).json(error);
        }
        // if err or no pano found, respond with error 
        if (err) {
          var error = {message: 'Error retrieving hotspot', error: err};
           return res.status(400).json(error);
        }

        console.log('updated the hotspot!');
        console.log(data);

        return res.status(200).json(data);

      });


  });


  /**
   * DELETE '/locations/:id'
   * Receives a DELETE request specifying the location to delete
   * @param  {String} req.param('id'). The mongodb _id to delete
   * @return {Object} JSON
   */
  router.delete('/locations/:id', function(req, res){

    var requestedId = req.param('id');

    // Mongoose method to remove, http://mongoosejs.com/docs/api.html#model_Model.findByIdAndRemove
    Location.findByIdAndRemove(requestedId,function(err, data){

      // if err or no location found, respond with error 
      if (err) {
        var error = {message: 'Error deleting location', error: err};
         return res.status(400).json(error);
      }
      if (data == null) {
        var error = {message: 'Location not found'};
         return res.status(404).json(error);
      }

      // otherwise, respond back with success
      var jsonData = {
        message: 'Successfully deleted hotspot ID ' + requestedId
      }

      res.status(200).json(jsonData);

    });

  });
}