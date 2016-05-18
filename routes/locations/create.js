var Location = require("../../models/location.js");

module.exports = (req, res) => {

  function ensureArray(val) {
    return Array.isArray(val) ? val : val.split(',');
  }

  console.log('CREATE LOCATION request: ', req.body);
  var locationObj = {};

  if (req.body.code&&req.body.downtown) {
    locationObj.code = req.body.code;
    locationObj.downtown = req.body.downtown;
  } else {
    return res.status(400).json({message: 'Please provide a code and north/downtown value for the new location'});
  }

  var location = new Location(locationObj);
  location.name = req.body.name ? req.body.name : 'Location ' + location.code;

  if (req.body.label) {
    location.label = req.body.label;
  }
  if (req.body.desc) {
    location.desc = req.body.desc;
  }
  if (req.body.coords) {
    location.coords = ensureArray(req.body.coords);
  }
  if (req.body.coordsEntrance) {
    location.coordsEntrance = ensureArray(req.body.coordsEntrance);
  }
  if (req.body.scenes) {
    locationObj.scenes = ensureArray(req.body.scenes);
  }

  location.save(function(err, data) {
    if (err) {
      res.status(400).json(err);
    }
    console.log('LOCATION saved: ', data);
    res.status(200).json(data);
  });

};

// var LocationSchema = new Schema({ 
//   name: String,
//   label: String,
//   code: {type: String, required: true, unique: true, index: true }, 
//   desc: String,
//   coords: [Number],
//   coordsEntrance: [Number],
//   downtown: Boolean,
//   locations: [{type: Schema.Types.ObjectId, ref: 'Scene'}]
// });