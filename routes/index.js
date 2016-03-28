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

    })  
});

// /**
//  * GET '/panoramas/:id'
//  * Receives a GET request specifying the panorama to get
//  * @param  {String} req.param('id'). The panoramaId
//  * @return {Object} JSON
//  */

router.get('/panoramas/:id', function(req, res){

  var requestedId = req.param('id');

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
  
  })
})

// /**
//  * GET '/panoramas'
//  * Receives a GET request to get all panorama details
//  * @return {Object} JSON
//  */

router.get('/panoramas', function(req, res){

  // mongoose method to find all, see http://mongoosejs.com/docs/api.html#model_Model.find
  Panorama.find(function(err, data){

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

  })

})

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

  })

})

// /**
//  * POST '/api/update/:id'
//  * Receives a POST request with data of the animal to update, updates db, responds back
//  * @param  {String} req.param('id'). The animalId to update
//  * @param  {Object} req. An object containing the different attributes of the Animal
//  * @return {Object} JSON
//  */

// router.post('/api/update/:id', function(req, res){

//    var requestedId = req.param('id');

//    var dataToUpdate = {}; // a blank object of data to update

//     // pull out the information from the req.body and add it to the object to update
//     var name, age, weight, color, url; 

//     // we only want to update any field if it actually is contained within the req.body
//     // otherwise, leave it alone.
//     if(req.body.name) {
//       name = req.body.name;
//       // add to object that holds updated data
//       dataToUpdate['name'] = name;
//     }
//     if(req.body.age) {
//       age = req.body.age;
//       // add to object that holds updated data
//       dataToUpdate['age'] = age;
//     }
//     if(req.body.weight) {
//       weight = req.body.weight;
//       // add to object that holds updated data
//       dataToUpdate['description'] = {};
//       dataToUpdate['description']['weight'] = weight;
//     }
//     if(req.body.color) {
//       color = req.body.color;
//       // add to object that holds updated data
//       if(!dataToUpdate['description']) dataToUpdate['description'] = {};
//       dataToUpdate['description']['color'] = color;
//     }
//     if(req.body.url) {
//       url = req.body.url;
//       // add to object that holds updated data
//       dataToUpdate['url'] = url;
//     }

//     var tags = []; // blank array to hold tags
//     if(req.body.tags){
//       tags = req.body.tags.split(","); // split string into array
//       // add to object that holds updated data
//       dataToUpdate['tags'] = tags;
//     }


//     console.log('the data to update is ' + JSON.stringify(dataToUpdate));

//     // now, update that animal
//     // mongoose method findByIdAndUpdate, see http://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate  
//     Animal.findByIdAndUpdate(requestedId, dataToUpdate, function(err,data){
//       // if err saving, respond back with error
//       if (err){
//         var error = {status:'ERROR', message: 'Error updating animal'};
//         return res.json(error);
//       }

//       console.log('updated the animal!');
//       console.log(data);

//       // now return the json data of the new person
//       var jsonData = {
//         status: 'OK',
//         animal: data
//       }

//       return res.json(jsonData);

//     })

// })

module.exports = router;