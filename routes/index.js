var express = require('express');
var router = express.Router();

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
var panoramas = require("./panoramas.js")(router);

// ********** HOTSPOT **********
var hotspots = require("./hotspots.js")(router);

// ********** LOCATION **********
var locations = require("./locations.js")(router);


module.exports = router;