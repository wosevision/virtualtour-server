var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// See http://mongoosejs.com/docs/schematypes.html

var locationSchema = new Schema({	
	name: {type: String, required: true},
	category: {type: String, required: true, index: true },
	label: String,
	code: {type: String, required: true, unique: true, index: true },	
	desc: String,
	coords: [Number],
	coordsEntrance: [Number],
	icon: String,
	scenes: [{type: Schema.Types.ObjectId, ref: 'Panorama'}]
});

locationSchema.statics.findByCode = function (code, cb) {
  return this.find({ code: code }, cb);
}

// export 'Animal' model so we can interact with it in other files
module.exports = mongoose.model('Location',locationSchema);