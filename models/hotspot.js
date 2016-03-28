var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// See http://mongoosejs.com/docs/schematypes.html

var HotspotSchema = new Schema({
	type: String,
	text: String,
	URL: String,
	sceneId: String,
	targetPitch: Number,
	targetYaw: Number,
	pitch: Number,
	yaw: Number
})

// export 'Animal' model so we can interact with it in other files
module.exports = mongoose.model('Hotspot',HotspotSchema);