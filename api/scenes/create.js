var Scene = require("../../models/scene.js");

module.exports = (req, res) => {

  console.log('CREATE SCENE request: ', req.body);
  
  var sceneObj = {};

  if (!req.body.code || !req.body.building) {
    return res.status(400).json({message: 'Incomplete scene details!'});
  }
  Object.assign(sceneObj, req.body)
  sceneObj.name = sceneObj.name || ( sceneObj.building.toUpperCase() + ' ' + sceneObj.code.toUpperCase() );

  var scene = new Scene(sceneObj);

  scene.save(function(err, data) {
    if (err) {
      res.status(400).json(err);
    }
    console.log('SCENE saved: ', data);
    res.status(201).json(data);
  });

};