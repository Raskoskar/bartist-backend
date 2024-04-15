const { urlencoded } = require('express');
const mongoose = require('mongoose');

const artistSchema = mongoose.Schema({
  email: String,
  password: String,
  token: String,
  name: String,
  description: String,
  type: String,
  members: Number,
  picture: String,
  medias: [String],
  genres: [String],
  socials: {
    youtube: String,
    soundcloud: String,
    facebook: String,
    deezer: String,
    spotify: String,
  },
  events: [{type: mongoose.Schema.Types.ObjectId, ref: 'events'}],
});

const Artist = mongoose.model('artists', artistSchema);

module.exports = Artist;