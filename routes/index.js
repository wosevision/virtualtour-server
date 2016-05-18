const express = require('express');
const router = express.Router();

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

// API V1
// ********** PANORAMA **********
const panoramas = require("./panoramas.js")(router);
// ********** HOTSPOT ***********
const hotspots = require("./hotspots.js")(router);
// ********** LOCATION **********
//const locations = require("./locations.js")(router);


// API V2
// ********** ENTITY **********
const entities = require('./entities');
router.use('/entities', entities);
// ********** SCENE **********
const scenes = require('./scenes');
router.use('/scenes', scenes);
// ********** SCENE **********
const locations = require('./locations');
router.use('/locations', locations);


module.exports = router;