var Scene = require("../../models/scene.js");

module.exports = (req, res) => {

  console.log('CREATE SCENE request: ', req.body);
  
  var sceneObj = {};

  if (!req.body.code) {
    return res.status(400).json({message: 'Please provide a code for the new scene'});
  }
  Object.assign(sceneObj, req.body)
  sceneObj.name = sceneObj.name || 'Scene ' + sceneObj.code;

  var scene = new Scene(sceneObj);

  scene.save(function(err, data) {
    if (err) {
      res.status(400).json(err);
    }
    console.log('SCENE saved: ', data);
    res.status(201).json(data);
  });

};