var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Hotspot = require("./hotspot.js");

// See http://mongoosejs.com/docs/schematypes.html

var PanoramaSchema = new Schema({
	code: {type: String, unique: true, index: true },
	links: [Schema.Types.ObjectId],
  group: String,
  title: String,
  hfov: Number,
  pitch: Number,
  yaw: Number,
  northOffset: { type: Number, default: 0 },
  type: { type: String, default: "multires" },
  multiRes: {
    basePath: {type: String, required: true},
      path: { type: String, default: "/%l/%s%y_%x" },
      fallbackPath: { type: String, default: "/fallback/%s" },
      extension: { type: String, default: "jpg" },
      tileResolution: {type: Number, default: 512},
      maxLevel:  {type: Number, default: 4},
      cubeResolution: Number
  },
  hotSpots: [ {type: Schema.Types.ObjectId, ref: 'Hotspot'} ]
});

PanoramaSchema.statics.findByCode = function (code, cb) {
  return this.find({ code: code }, cb);
}

PanoramaSchema.statics.addHotspot = function (id, hotspot, cb) {
  this.findById(id, function(err,data) {
    // if err or no pano found, respond with error 
    if (err) {
      return err;
    }
    hotSpotsArray = data.hotSpots;
    hotSpotsArray.push(hotspot);
    return this.update({ hotSpots: hotSpotsArray }, cb);
  });
}

// export 'Animal' model so we can interact with it in other files
module.exports = mongoose.model('Panorama',PanoramaSchema);