const mongoose = require("mongoose");
const objectId = mongoose.Schema.Types.ObjectId;

const blogModel = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  authorId: {
    type: String,
    required: true,
    ref: author,
  },
  tags: [String],
  category: {
    type: [String],
    required: true,
  },
  subcategory: [String],
  isDeleted: {
    type: Boolean,
    default: false,
  },
  publishedAt: Date,
  isPublished: {
    type: Boolean,
    default: false,
  },
},{timestamps:true});

module.exports = mongoose.model("blog", blogSchema);

//{ title: {mandatory}, body: {mandatory}, authorId: {mandatory, refs to author model}, tags: {array of string}, category: {string, mandatory, examples: [technology, entertainment, life style, food, fashion]}, subcategory: {array of string, examples[technology-[web development, mobile development, AI, ML etc]] }, createdAt, updatedAt, deletedAt: {when the document is deleted}, isDeleted: {boolean, default: false}, publishedAt: {when the blog is published}, isPublished: {boolean, default: false}}
