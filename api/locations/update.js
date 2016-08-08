var Location = require("../../models/location.js");

module.exports = (req, res) => {

  console.log('UPDATE LOCATION request: ', req.body);
  //console.log('UPDATE to object: ', req.Location);

  // function ensureArray(val) {
  //   return Array.isArray(val) ? val : val.split(',');
  // }

  var locationObj = {};
  Object.assign(locationObj, req.body);
  
  //console.log('UPDATE LOCATION final: ', req.Location._id);

  Location.findByIdAndUpdate(req.Location._id, locationObj, { new: true }, function(err, data) {
    if (err) {
      res.status(400).json(err);
    }
    console.log('LOCATION saved: ', data);
    res.status(200).json(data);
  });

};