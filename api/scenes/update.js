var Scene = require("../../models/scene.js");

module.exports = (req, res) => {

  console.log('UPDATE SCENE request: ', req.body);
  const sceneObj = {};

  if (req.body.code) {
    sceneObj.code = req.body.code;
  }
  if (req.body.name) {
    sceneObj.name = req.body.name;
  }
  if (req.body.assets) {
    sceneObj.assets = req.body.assets;
  }
  if (req.body.entities) {
    sceneObj.entities = req.body.entities;
  }

  Scene.findByIdAndUpdate(req.Scene._id, sceneObj, { new: true }, function(err, data) {
    if (err) {
      res.status(400).json(err);
    }
    console.log('SCENE saved: ', data);
    res.status(200).json(data);
  });

};