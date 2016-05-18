var Scene = require("../../models/scene.js");

module.exports = (req, res) => {
  
  req.Scene.remove(function (err, data) {
    if (err) {
      return res.status(400).json(err);
    }
    var message = {
      message: 'Successfully removed scene ID ' + req.Scene._id,
      success: true,
      removed: data
    };
    res.status(200).json(message);
  });

};