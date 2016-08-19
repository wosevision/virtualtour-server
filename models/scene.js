const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const AssetSchema = new Schema({
// 	type: { type: String, required: true },
// 	src: String,
// 	props: Schema.Types.Mixed,
// });

const SceneSchema = new Schema({
	code: { type: String, required: true, index: true },
	building: { type: String, required: true },
	name: String,
	assets: [{ type: Schema.Types.ObjectId, ref: 'Entity' }],
	entities: [{ type: Schema.Types.ObjectId, ref: 'Entity' }],
	script: Schema.Types.Mixed
});

// SceneSchema.add({ building: { type: String, required: true} });

SceneSchema.statics.findByCode = function (code, cb) {
	var query = code.split('_');
	if ( query[1] && query[1].match(/\d+/g) ) {
  	return this.findOne({ building: query[0], code: query[1] }, cb);
	} else {
  	return this.find({ building: query[0] }, cb);
	}
}

var autoPopulate = function(next) {
  this.populate('entities').populate('assets');
  next();
};

SceneSchema.pre('findOne', autoPopulate);

// export 'Animal' model so we can interact with it in other files
module.exports = mongoose.model('Scene',SceneSchema);