var Building = require("../../models/building.js");

module.exports = (req, res) => {

  console.log('UPDATE LOCATION request: ', req.body);
  //console.log('UPDATE to object: ', req.Building);

  // function ensureArray(val) {
  //   return Array.isArray(val) ? val : val.split(',');
  // }

  var buildingObj = {};
  Object.assign(buildingObj, req.body);
  
  //console.log('UPDATE LOCATION final: ', req.Building._id);

  Building.findByIdAndUpdate(req.Building._id, buildingObj, { new: true }, function(err, data) {
    if (err) {
      res.status(400).json(err);
    }
    console.log('LOCATION saved: ', data);
    res.status(200).json(data);
  });

};