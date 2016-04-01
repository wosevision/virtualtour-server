var mongoose = require('mongoose');
var Panorama = require("../models/panorama.js");

module.exports = function(router) {

	/**
	 * POST '/panoramas'
	 * Receives a POST request of the new panorama config, saves to db, responds back
	 * @param  {Object} req. An object containing the different attributes of the Panorama
	 * @return {Object} JSON
	 */
	router.post('/panoramas', function(req, res){

	    console.log(req.body);

	    // hold all this data in an object
	    // this object should be structured the same way as your db model
	    var panoObject = {
	      code: req.body.code || mongoose.Types.ObjectId(),
	      title: req.body.title,
	      hfov: req.body.hfov || 100,
	      pitch: req.body.pitch || 10,
	      yaw: req.body.yaw || 50,
	      northOffset: req.body.northOffset || 0,
	      type: req.body.type || "multires",
	      multiRes: {
	        basePath: req.body.basePath || "./assets/img/"+req.body.code,
	        extension: req.body.extension || "jpg",
	        tileResolution: req.body.tileResolution || 512,
	        maxLevel: req.body.maxLevel || 4,
	        cubeResolution: req.body.cubeResolution
	      }
	    };

	    // create a new panorama model instance, passing in the object
	    var panorama = new Panorama(panoObject);

	    // now, save that panorama instance to the database
	    // mongoose method, see http://mongoosejs.com/docs/api.html#model_Model-save    
	    panorama.save(function(err,data){
	      // if err saving, respond back with error
	      if (err){
	        var error = {message: 'Error saving panorama', error: err};
	        return res.status(400).json(error);
	      }

	      console.log('Saved a new panorama!');
	      console.log(data);

	      return res.status(200).json(data);

	    });
	});

	/**
	 * GET '/panoramas/:id'
	 * Receives a GET request specifying the panorama to get
	 * @param  {String} req.param('id'). The panoramaId
	 * @return {Object} JSON
	 */
	router.get('/panoramas/:code', function(req, res){

	  var code = req.param('code');

	  // mongoose method, see http://mongoosejs.com/docs/api.html#model_Model.findById
	  Panorama.findByCode(code).populate('hotSpots').exec(function(err,data){

	    // if err or no pano found, respond with error 
	    if (err) {
	      var error = {message: 'Error retrieving panorama', error: err};
	       return res.status(400).json(error);
	    }
	    if (data == null) {
	      var error = {message: 'Panorama not found'};
	       return res.status(404).json(error);
	    }

	    return res.status(200).json(data);
	  
	  });
	});

	/**
	 * GET '/panoramas'
	 * Receives a GET request to get all panorama details
	 * @return {Object} JSON
	 */

	router.get('/panoramas', function(req, res){

	  // mongoose method to find all, see http://mongoosejs.com/docs/api.html#model_Model.find
	  Panorama.find().populate('hotSpots').exec(function(err, data){

	    // if err or no pano found, respond with error 
	    if (err) {
	      var error = {message: 'Error retrieving panorama', error: err};
	       return res.status(400).json(error);
	    }
	    if (data == null) {
	      var error = {message: 'Panorama not found'};
	       return res.status(404).json(error);
	    }

	    return res.status(200).json(data);

	  });
	});

	/**
	 * DELETE '/panoramas/:id'
	 * Receives a DELETE request specifying the panorama to delete
	 * @param  {String} req.param('id'). The mongodb _id to delete
	 * @return {Object} JSON
	 */
	router.delete('/panoramas/:id', function(req, res){

	  var requestedId = req.param('id');

	  // Mongoose method to remove, http://mongoosejs.com/docs/api.html#model_Model.findByIdAndRemove
	  Panorama.findByIdAndRemove(requestedId,function(err, data){

	    // if err or no pano found, respond with error 
	    if (err) {
	      var error = {message: 'Error deleting panorama', error: err};
	       return res.status(400).json(error);
	    }
	    if (data == null) {
	      var error = {message: 'Panorama not found'};
	       return res.status(404).json(error);
	    }

	    // otherwise, respond back with success
	    var jsonData = {
	      message: 'Successfully deleted panorama ID ' + requestedId
	    }

	    res.status(200).json(jsonData);

	  });

	});


	/**
	 * POST '/panoramas/:id'
	 * Receives a POST request with data of the pano to update, updates db, returns modified pano
	 * @param  {String} req.param('id'). The mongodb _id to update
	 * @param  {Object} req. An object containing the data to update
	 * @return {Object} JSON
	 */
	router.post('/panoramas/:id', function(req, res){

	   var requestedId = req.param('id');


	    console.log('the data to update is ' + JSON.stringify(req.body));

	    // now, update that animal
	    // mongoose method findByIdAndUpdate, see http://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate  
	    Panorama.findByIdAndUpdate(requestedId, req.body, {new:true}, function(err,data){

	      // if err or no pano found, respond with error 
	      if (err) {
	        var error = {message: 'Error retrieving panorama', error: err};
	         return res.status(400).json(error);
	      }

	      console.log('updated the panorama!');
	      console.log(data);

	      return res.status(200).json(data);

	    });

	});
}