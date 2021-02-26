const mongoose = require('mongoose')
const {Schema} = mongoose



const blogSchema = new Schema({
  //creating a subdocument collection 128
  title: String,
  body: String ,
  image: String,
  created : String,
  timestamp: String,
  summary: String,
  state: String,
  hitCount: { type: Number, default: 0 },
  tags: [{ type: String }],

  author: String, //mainly for featured blogs
  timeUpdated: String //for featured blogs 
})



module.exports = mongoose.model('blog', blogSchema) //model class
