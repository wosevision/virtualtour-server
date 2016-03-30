var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Hotspot = require("./hotspot.js");

// See http://mongoosejs.com/docs/schematypes.html

var PanoramaSchema = new Schema({
	code: {type: String, unique: true, index: true },
	links: [Schema.Types.ObjectId],
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
      tileResolution: Number,
      maxLevel: Number,
      cubeResolution: Number
  },
  hotSpots: [{type: Schema.Types.ObjectId, ref: 'Hotspot'}]
});

PanoramaSchema.statics.findByCode = function (code, cb) {
  return this.find({ code: code }, cb);
}

// export 'Animal' model so we can interact with it in other files
module.exports = mongoose.model('Panorama',PanoramaSchema);