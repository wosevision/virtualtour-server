var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// See http://mongoosejs.com/docs/schematypes.html

var LocationSchema = new Schema({	
	name: String,
	label: String,
	code: {type: String, required: true, unique: true, index: true },	
	desc: String,
	coords: [Number],
	coordsEntrance: [Number],
	downtown: {type: Boolean, required: true, default: false},
	scenes: [{type: Schema.Types.ObjectId, ref: 'Scene'}]
});

LocationSchema.statics.findByCode = function (code, cb) {
  return this.findOne({ code: code }, cb);
}

var autoPopulate = function(next) {
  this.populate('scenes');
  next();
};

LocationSchema.pre('findOne', autoPopulate);

// export 'Animal' model so we can interact with it in other files
module.exports = mongoose.model('Location', LocationSchema);