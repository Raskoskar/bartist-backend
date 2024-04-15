const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  token: String, 
  likedMovies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie' // Référence à des documents Movie existants
  }],
  playlists: [{
    name: String,
    genre: [String],
    movies: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Movie' // Référence à des documents Movie dans chaque playlist
    }]
  }],
  recos: [{
    movie: {type: mongoose.Schema.Types.ObjectId, ref: "Movie"},
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  }]
});

const User = mongoose.model('users', userSchema);

module.exports = User;
