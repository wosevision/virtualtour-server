const formatEntities = require('../../utils/formatEntities');
module.exports = (req, res) => {

  if (!Array.isArray(req.Scene)) {
  	var scene = req.query.hasOwnProperty('lean') ?
  	{
  		name: req.Scene.name,
  		building: req.Scene.building,
  		code: req.Scene.code,
  		entities:formatEntities(req.Scene.entities),
  		assets: formatEntities(req.Scene.assets)
  	}
  	: req.Scene;
  	res.status(200).json(scene);
  } else {
  	var scenes = req.Scene;
  	res.status(200).json({scenes});
  }

};