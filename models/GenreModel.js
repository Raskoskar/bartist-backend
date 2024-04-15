const { urlencoded } = require('express');
const mongoose = require('mongoose');

const genreSchema = mongoose.Schema({
  genres: [String],
});

const Genre = mongoose.model('genres', genreSchema);

module.exports = Genre;