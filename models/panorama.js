var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// See http://mongoosejs.com/docs/schematypes.html

var PanoramaSchema = new Schema({
	//name: String,
	type: {type: String, required: true, default: "panoramas"}, // this version requires this field to exist"type": "panoramas",
  id: String,
  attributes: {
    title: {type: String, required: true},
    hfov: Number,
    pitch: Number,
    yaw: Number,
    northOffset: Number,
    type: {type: String, default: "multires"},
    multiRes: {
      basePath: String,
        path: String,
        fallbackPath: String,
        extension: String,
        tileResolution: Number,
        maxLevel: Number,
        cubeResolution: Number
    }
  },
  links: {
    self: function() {
    	return "v1/"+this.type+"/"+this.id;
    }
  },
  "relationships": {
    "pois": {
      "links": {
        "self": "v1/pois/pc",
        "related": "v1/panoramas/pc/pois"
      },
      "data": { "type": "pois", "id": "pc" }
    },
    "hotspots": {
      "links": {
        "self": "v1/hotspots/pc",
        "related": "v1/pois/pc/hotspots"
      },
      "data": [
        { "type": "hotspots", "id": "5" },
        { "type": "hotspots", "id": "12" },
        { "type": "hotspots", "id": "22" },
        { "type": "hotspots", "id": "24" }
      ]
    }
  }
})

// export 'Animal' model so we can interact with it in other files
module.exports = mongoose.model('Panorama',PanoramaSchema);