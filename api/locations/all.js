var Location = require("../../models/location.js");

module.exports = (req, res) => {
	if (req.query.north === 'true' || req.query.downtown === 'false' || req.query.location === 'north' ) {
	  Location.find({downtown: false}, function(err, data) {
	    res.status(200).json(data);
	  });
	} else if (req.query.north === 'false' || req.query.downtown === 'true' || req.query.location === 'dt') {
	  Location.find({downtown: true}, function(err, data) {
	    res.status(200).json(data);
	  });
	} else {
	  Location.find(function(err, data) {
	    res.status(200).json(data);
	  });
	}

};