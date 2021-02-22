

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
   topic:String,
   comment:String,
   email: String,
   created : String,
});
module.exports = mongoose.model('comment', commentSchema);
