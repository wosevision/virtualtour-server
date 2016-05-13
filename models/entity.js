const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AttributeSchema = new Schema({
	prop: { type: String, required: true },
	val: Schema.Types.Mixed,
	type: String
});

const EntitySchema = new Schema({
	type: String,
	attrs: [AttributeSchema],
	entities: [{ type: Schema.Types.ObjectId, ref: 'Entity' }]
});

var autoPopulate = function(next) {
  this.populate('entities');
  next();
};

EntitySchema
	.pre('remove', function(next) {
    // Remove all the assignment docs that reference the removed person.
    this.model('Entity').findAndUpdate({ entities: this._id}, {$pull: {entities: this._id}}, next);
	})
	.pre('findOne', autoPopulate)
	.pre('find', autoPopulate);

// export 'Animal' model so we can interact with it in other files
module.exports = mongoose.model('Entity',EntitySchema);