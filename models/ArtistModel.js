const { urlencoded } = require('express');
const mongoose = require('mongoose');

const socialSchema = mongoose.Schema({
    platform: String,
    url: String,
   });

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
  socials: [socialSchema],
  events: [{type: mongoose.Schema.Types.ObjectId, ref: 'events'}],
  genres: [{type: mongoose.Schema.Types.ObjectId, ref: 'genres'}],
});

const Artist = mongoose.model('artists', artistSchema);

module.exports = Artist;