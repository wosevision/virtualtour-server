const formatEntities = require('../../utils/formatEntities');
module.exports = (req, res) => {

  var scene = req.Scene;
  if (req.query.hasOwnProperty('lean')) {
  	var newScene = {
  		name: scene.name,
  		code: scene.code,
  		entities:formatEntities(scene.entities),
  		assets: formatEntities(scene.assets)
  	};
  	scene = newScene;
  }

  res.status(200).json({ scene });
};