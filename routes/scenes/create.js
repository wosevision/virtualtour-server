var Scene = require("../../models/scene.js");

module.exports = (req, res) => {

  console.log('CREATE SCENE request: ', req.body);
  var sceneObj = {};

  if (req.body.code) {
    sceneObj.code = req.body.code;
  } else {
    return res.status(400).json({message: 'Please provide a code for the new scene'});
  }

  var scene = new Scene(sceneObj);
  scene.name = req.body.name ? req.body.name : 'Scene ' + scene.code;

  if (req.body.script) {
    scene.script = req.body.script;
  }
  if (req.body.assets) {
    scene.assets = req.body.assets;
  }
  if (req.body.entities) {
    scene.entities = req.body.entities;
  }

  scene.save(function(err, data) {
    if (err) {
      res.status(400).json(err);
    }
    console.log('SCENE saved: ', data);
    res.status(200).json(data);
  });

};