var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// See http://mongoosejs.com/docs/schematypes.html

var BuildingSchema = new Schema({	
	name: String,
	label: String,
	code: {type: String, required: true, unique: true, index: true },	
	desc: String,
	coords: [Number],
	coordsEntrance: [Number],
	downtown: {type: Boolean, required: true, default: false}
});

BuildingSchema.statics.findByCode = function (code, cb) {
  return this.findOne({ code: code }, cb);
}

// var autoPopulate = function(next) {
//   this.populate('scenes');
//   next();
// };

// BuildingSchema.pre('findOne', autoPopulate);

// export 'Animal' model so we can interact with it in other files
module.exports = mongoose.model('Building', BuildingSchema);