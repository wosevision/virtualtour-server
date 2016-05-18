const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const AssetSchema = new Schema({
// 	type: { type: String, required: true },
// 	src: String,
// 	props: Schema.Types.Mixed,
// });

const SceneSchema = new Schema({
	code: { type: String, required: true, unique: true, index: true },
	name: String,
	assets: [{ type: Schema.Types.ObjectId, ref: 'Entity' }],
	entities: [{ type: Schema.Types.ObjectId, ref: 'Entity' }],
	script: Schema.Types.Mixed
});

SceneSchema.statics.findByCode = function (code, cb) {
  return this.findOne({ code: code }, cb);
}

var autoPopulate = function(next) {
  this.populate('entities').populate('assets');
  next();
};

SceneSchema.pre('findOne', autoPopulate);

// export 'Animal' model so we can interact with it in other files
module.exports = mongoose.model('Scene',SceneSchema);