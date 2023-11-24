const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  rating: { type: Number, default: 0 },
  feedback: { type: String, default: '' },
});

const Addbook = mongoose.Schema({
  cover: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  publishDate: {
    type: Date,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  tags: {
    type: [String],
  },
  ratings: [ratingSchema], 
});

module.exports = mongoose.model("Books", Addbook);
