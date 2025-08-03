const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  publishedDate: Date,
  isbn: String
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);
