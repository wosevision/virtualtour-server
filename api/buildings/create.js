const Building = require("../../models/building.js");
const colors = require('colors/safe');

module.exports = (req, res) => {

  console.log(colors.bgMagenta.cyan('CREATE BUILDING request'), req.body);

  var buildingObj = {};
  Object.assign(buildingObj, req.body);
  if (!req.body.code || !req.body.downtown) {
    return res.status(400).json({message: 'Please provide a code and north/downtown value for the new building'});
  }
  buildingObj.name = buildingObj.name || 'Building ' + building.code;
  var building = new Building(buildingObj);

  building.save(function(err, data) {
    if (err) {
      res.status(400).json(err);
    }
    console.log(colors.rainbow('BUILDING SAVED!'), data);
    res.status(201).json(data);
  });

};