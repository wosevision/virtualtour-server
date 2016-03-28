var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// See http://mongoosejs.com/docs/schematypes.html

var HotspotSchema = new Schema({
	type: { type: String, required: true},
	text: String,
	URL: String,
	sceneId: String,
	targetPitch: Number,
	targetYaw: Number,
	pitch: Number,
	yaw: Number
})

HotspotSchema.statics.findByCode = function (code, cb) {
  return this.find({ sceneId: code }, cb);
}

// export 'Animal' model so we can interact with it in other files
module.exports = mongoose.model('Hotspot',HotspotSchema);