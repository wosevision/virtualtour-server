var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// See http://mongoosejs.com/docs/schematypes.html

var HotspotSchema = new Schema({
	parent: Schema.Types.ObjectId,
	type: String,
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

HotspotSchema.post('save', function(doc) {
	var Panorama = require("./panorama.js");
  console.log('%s has been saved', doc._id);

        // Panorama.findByIdAndUpdate(doc.parent, { $push: { hotSpots: doc._id } }, {new:true, upsert:true}, function(err,data){
        //   // if err or no pano found, respond with error 
        //   if (err) {
        //     console.log({message: 'Error saving hotspot to panorama', error: err});
        //   }
        //   console.log('Updated panorama '+doc.parent+' with new hotspot '+doc._id+' and saved');
        // });

        Panorama.addHotspot(doc.parent, doc._id, function(err,data){
          // if err or no pano found, respond with error 
          if (err) {
            console.log({message: 'Error saving hotspot to panorama', error: err});
          }
          console.log('Updated panorama '+doc.parent+' with new hotspot '+doc._id+' and saved');
        });
});

// export 'Animal' model so we can interact with it in other files
module.exports = mongoose.model('Hotspot',HotspotSchema);