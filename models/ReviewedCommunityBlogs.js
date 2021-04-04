
const mongoose = require('mongoose')
const {Schema} = mongoose


const reviewedCommunityBlogsSchema = new Schema({

  title: String,
  author: String,
  body: String ,
  image: String,
  created : String,
  timestamp: String,
  summary: String,
  state: String,
  hitCount: { type: Number, default: 0 },
  tags: [{ type: String }],
  secret: String,
  featured: Boolean,
  instagram: String,
  coords: { lat: Number , lng: Number   }
})



module.exports = mongoose.model('reviewedCommunityBlogs', reviewedCommunityBlogsSchema) //model class
