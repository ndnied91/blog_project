

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tagSchema = new mongoose.Schema({
tags: [{ type: String }]
})


module.exports = mongoose.model('Tags', tagSchema);
