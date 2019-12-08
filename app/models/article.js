// Require necessary NPM Packages
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    body: {type: String, default: 'You\'re the best man'}
},{timestamps:true})

// Define the Article Schema
const articleSchema = new mongoose.Schema({
    title:{type: String, required: true},
    content: String,
    author: {type: String, required: true},
    published: {type: Boolean, default: true},
    publishedOn: {type: Date, default: Date.now},
}, {
    timestamps: true, 
});

// Compile our Model based on the Schema
const Article = mongoose.model('Article', articleSchema);
const Comment = mongoose.model('Comment', commentSchema)


// Export our Model for use.
module.exports = {Article, Comment}