var Location = require("../../models/location.js");

module.exports = (req, res) => {

  console.log('CREATE LOCATION request: ', req.body);

  var locationObj = {};
  Object.assign(locationObj, req.body);
  if (!req.body.code || !req.body.downtown) {
    return res.status(400).json({message: 'Please provide a code and north/downtown value for the new location'});
  }
  locationObj.name = locationObj.name || 'Location ' + location.code;
  var location = new Location(locationObj);

  location.save(function(err, data) {
    if (err) {
      res.status(400).json(err);
    }
    console.log('LOCATION saved: ', data);
    res.status(201).json(data);
  });

};