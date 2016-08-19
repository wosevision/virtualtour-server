// var Scene = require("../../models/scene.js");

module.exports = (req, res) => {
  
  req.Building.remove(function (err, data) {
    if (err) {
      return res.status(400).json(err);
    }
    var message = {
      message: 'Successfully removed scene ID ' + req.Building._id,
      success: true,
      removed: data
    };
    res.status(200).json(message);
  });

};