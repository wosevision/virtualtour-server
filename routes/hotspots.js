var mongoose = require('mongoose');
var Hotspot = require("../models/hotspot.js");

module.exports = function(router) {

  /**
   * POST '/hotspots'
   * Receives a POST request of the new hotspot config, saves to db, responds back
   * @param  {Object} req. An object containing the different attributes of the hotspot
   * @return {Object} JSON
   */
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

      });
  });

  /**
   * GET '/hotspots'
   * Receives a GET request to get all hotspots ever (probably for debugging)
   * @return {Object} JSON
   */
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
   * GET '/hotspots/:scene'
   * Receives a GET request to return all hotspots in a given scene
   * @return {Object} JSON
   */
  router.get('/hotspots/:scene', function(req, res){

    var requestedId = req.param('scene');

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
      Hotspot.findByIdAndUpdate(requestedId, req.body, {new: true}, function(err,data){

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
}