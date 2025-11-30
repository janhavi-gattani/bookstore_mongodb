const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    default: 'https://via.placeholder.com/200x300?text=Book+Cover'
  },
  category: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Book', bookSchema);