const express = require('express');
const router = express.Router();

const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(cookieParser());

router.use(cors());

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
});

// API V2
// ********** ENTITY **********
const entities = require('./entities');
router.use('/entities', entities);
// *********** SCENE ***********
const scenes = require('./scenes');
router.use('/scenes', scenes);
// ********** LOCATION **********
const locations = require('./locations');
router.use('/locations', locations);
// ********** PANORAMA **********
const panoramas = require('./panoramas');
router.use('/panoramas', panoramas);


module.exports = router;