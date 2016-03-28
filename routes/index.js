var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// our db models
var Panorama = require("../models/panorama.js");
var Hotspot = require("../models/hotspot.js");

/**
 * GET '/'
 * Default home route. Just relays a success message back.
 * @param  {Object} req
 * @return {Object} json
 */
router.get('/', function(req, res) {
  
  var jsonData = {
  	'name': 'virtualtour-server',
    'version': 1.0
  }

  // respond with json data
  res.status(200).json(jsonData)
});

// simple route to show an HTML page
router.get('/docs', function(req,res){
  res.render('docs.html')
})

// ********** PANORAMA **********

// /**
//  * POST '/panoramas'
//  * Receives a POST request of the new panorama config, saves to db, responds back
//  * @param  {Object} req. An object containing the different attributes of the Panorama
//  * @return {Object} JSON
//  */

router.post('/panoramas', function(req, res){

    console.log(req.body);

    // pull out the information from the req.body
    var code = req.body.code;
    var title = req.body.title;
    var hfov = req.body.hfov;
    var pitch = req.body.pitch;
    var yaw = req.body.yaw;
    var northOffset = req.body.northOffset;
    var type = req.body.type;
    var basePath = req.body.basePath || "./assets/img/"+req.body.code;
    var extension = req.body.extension;
    var tileResolution = req.body.tileResolution;
    var maxLevel = req.body.maxLevel;
    var cubeResolution = req.body.cubeResolution;

    // hold all this data in an object
    // this object should be structured the same way as your db model
    var panoObject = {
      code: code,
      title: title,
      hfov: hfov,
      pitch: pitch,
      yaw: yaw,
      northOffset: northOffset,
      type: type,
      multiRes: {
        basePath: basePath,
        extension: extension,
        tileResolution: tileResolution,
        maxLevel: maxLevel,
        cubeResolution: cubeResolution
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

// /**
//  * GET '/panoramas/:id'
//  * Receives a GET request specifying the panorama to get
//  * @param  {String} req.param('id'). The panoramaId
//  * @return {Object} JSON
//  */

router.get('/panoramas/:code', function(req, res){

  var requestedId = req.param('code');

  // mongoose method, see http://mongoosejs.com/docs/api.html#model_Model.findById
  Panorama.findByCode(requestedId, function(err,data){

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

// /**
//  * GET '/panoramas'
//  * Receives a GET request to get all panorama details
//  * @return {Object} JSON
//  */

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
 * GET '/api/delete/:id'
 * Receives a GET request specifying the panorama to delete
 * @param  {String} req.param('id'). The panoramaId
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
 * PUT '/panoramas/:id'
 * Receives a PUT request with data of the panorama to update, updates db, responds back
 * @param  {String} req.param('id'). The _id to update
 * @param  {Object} req. An object containing the data to update
 * @return {Object} JSON
 */
router.put('/panoramas/:id', function(req, res){

   var requestedId = req.param('id');


    console.log('the data to update is ' + JSON.stringify(req.body));

    // now, update that animal
    // mongoose method findByIdAndUpdate, see http://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate  
    Panorama.findByIdAndUpdate(requestedId, req.body, function(err,data){

      // if err or no pano found, respond with error 
      if (err) {
        var error = {message: 'Error retrieving panorama', error: err};
         return res.status(400).json(error);
      }

      console.log('updated the panorama!');
      console.log(data);

      return res.status(200).json(data);

    })

})

// ********** HOTSPOT **********

router.post('/hotspots', function(req, res){

    console.log(req.body);

    // pull out the information from the req.body
    var type = req.body.type;
    var text = req.body.text;
    var URL = req.body.url;
    var sceneId = req.body.sceneId;
    var targetPitch = req.body.targetPitch;
    var targetYaw = req.body.targetYaw;
    var pitch = req.body.pitch;
    var yaw = req.body.yaw;

    // hold all this data in an object
    // this object should be structured the same way as your db model
    var hotspotObject = {
      type: type,
      text: text,
      URL: URL,
      sceneId: sceneId,
      targetPitch: targetPitch,
      targetYaw: targetYaw,
      pitch: pitch,
      yaw: yaw
    };

    // create a new panorama model instance, passing in the object
    var hotspot = new Hotspot(hotspotObject);

    // now, save that panorama instance to the database
    // mongoose method, see http://mongoosejs.com/docs/api.html#model_Model-save    
    hotspot.save(function(err,data){
      // if err saving, respond back with error
      if (err){
        var error = {message: 'Error saving hotspot', error: err};
        return res.status(400).json(error);
      }

      console.log('Saved a new hotspot!');
      console.log(data);

      return res.status(200).json(data);

    })  
});

// /**
//  * GET '/hotspots'
//  * Receives a GET request to get all hotspots ever
//  * @return {Object} JSON
//  */

router.get('/hotspots', function(req, res){

  // mongoose method to find all, see http://mongoosejs.com/docs/api.html#model_Model.find
  Hotspot.find(function(err, data){

    // if err or no pano found, respond with error 
    if (err) {
      var error = {message: 'Error retrieving hotspots', error: err};
       return res.status(400).json(error);
    }
    if (data == null) {
      var error = {message: 'Hotspots not found'};
       return res.status(404).json(error);
    }

    return res.status(200).json(data);

  });

});

/**
 * GET '/hotspots/:sceneId'
 * Receives a GET request to return all hotspots in a given scene
 * @return {Object} JSON
 */
router.get('/hotspots/:sceneId', function(req, res){

  var requestedId = req.param('sceneId');

  // mongoose method, see http://mongoosejs.com/docs/api.html#model_Model.findById
  Hotspot.findByCode(requestedId, function(err,data){

    // if err or no pano found, respond with error 
    if (err) {
      var error = {message: 'Error retrieving hotspot', error: err};
       return res.status(400).json(error);
    }
    if (data == null) {
      var error = {message: 'Hotspot not found'};
       return res.status(404).json(error);
    }

    return res.status(200).json(data);
  
  });
});

/**
 * PUT '/hotspots/:id'
 * Receives a PUT request with data of the hotspot to update, updates db, responds back
 * @param  {String} req.param('id'). The _id to update
 * @param  {Object} req. An object containing the data to update
 * @return {Object} JSON
 */

router.put('/hotspots/:id', function(req, res){

   var requestedId = req.param('id');


    console.log('the data to update is ' + JSON.stringify(req.body));

    // now, update that animal
    // mongoose method findByIdAndUpdate, see http://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate  
    Hotspot.findByIdAndUpdate(requestedId, req.body, function(err,data){

      // if err or no pano found, respond with error 
      if (err) {
        var error = {message: 'Error retrieving hotspot', error: err};
         return res.status(400).json(error);
      }

      console.log('updated the hotspot!');
      console.log(data);

      return res.status(200).json(data);

    })

})

module.exports = router;