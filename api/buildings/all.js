var Building = require("../../models/building.js");

module.exports = (req, res) => {
	if (req.query.north === 'true' || req.query.downtown === 'false' || req.query.location === 'north' ) {
	  Building.find({downtown: false}, function(err, data) {
	    res.status(200).json(data);
	  });
	} else if (req.query.north === 'false' || req.query.downtown === 'true' || req.query.location === 'dt') {
	  Building.find({downtown: true}, function(err, data) {
	    res.status(200).json(data);
	  });
	} else {
	  Building.find(function(err, data) {
	    res.status(200).json(data);
	  });
	}

};