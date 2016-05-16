var Scene = require("../../models/scene.js");

module.exports = (req, res) => {

  Scene.find()/*.lean()*/.exec(function(err, data) {

    res.status(200).json(data);

  });

};