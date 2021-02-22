
const mongoose = require('mongoose')
const {Schema} = mongoose


const communityBlogSchema = new Schema({
  //creating a subdocument collection 128
  title: String,
  author: String,
  communityBody: String ,
  image: String,
  created : String,
  timestamp: String,
  summary: String,
  state: String,
  hitCount: { type: Number, default: 0 },
  tags: [{ type: String }],
  secret: String,
  featured: Boolean
})



module.exports = mongoose.model('communityBlog', communityBlogSchema) //model class
