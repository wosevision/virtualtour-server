var Location = require("../../models/location.js");

module.exports = (req, res) => {

  console.log('UPDATE LOCATION request: ', req.body);
  //console.log('UPDATE to object: ', req.Location);
  var locationObj = {};

  function ensureArray(val) {
    return Array.isArray(val) ? val : val.split(',');
  }

  if (req.body.code) {
    locationObj.code = req.body.code;
  }
  if (req.body.downtown) {
    locationObj.downtown = req.body.downtown;
  }
  if (req.body.name) {
    locationObj.name = req.body.name;
  }
  if (req.body.label) {
    locationObj.label = req.body.label;
  }
  if (req.body.desc) {
    locationObj.desc = req.body.desc;
  }
  if (req.body.coords) {
    locationObj.coords = ensureArray(req.body.coords);
  }
  if (req.body.coordsEntrance) {
    locationObj.coordsEntrance = ensureArray(req.body.coordsEntrance);
  }
  if (req.body.scenes) {
    locationObj.scenes = ensureArray(req.body.scenes);
  }
  //console.log('UPDATE LOCATION final: ', req.Location._id);

  Location.findByIdAndUpdate(req.Location._id, locationObj, { new: true }, function(err, data) {
    if (err) {
      res.status(400).json(err);
    }
    console.log('LOCATION saved: ', data);
    res.status(200).json(data);
  });

};