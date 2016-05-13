var Entity = require("../../models/entity.js");

module.exports = (req, res) => {
  
  Entity.findByIdAndRemove(req.entity._id, function(err, data){

    // if err or no pano found, respond with error 
    if (err) {
      return res.status(400).json(err);
    }
    // otherwise, respond back with success
    var message = {
      message: 'Successfully removed entity ID ' + req.entity._id,
      success: true,
      removed: data
    }

    res.status(200).json(message);

  });

};