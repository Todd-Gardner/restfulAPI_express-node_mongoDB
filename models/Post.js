const mongoose = require("mongoose");

//Schema - how you want data to look
const PostSchema = mongoose.Schema({
  title: {
    //validation
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  image: String,
});

module.exports = mongoose.model("Posts", PostSchema); //saves to 'Posts' in DB, using this schema
