const { urlencoded } = require('express');
const mongoose = require('mongoose');

// const artistSchema = mongoose.Schema({
//     hour: Number,
//     artist: {type: mongoose.Schema.Types.ObjectId, ref: 'artists'},
// })

const socialsSchema = mongoose.Schema({
    facebook: String,
    instagram: String,
})

const eventSchema = mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  hour_start: String,
  picture: String,
  status: String,
  socials: socialsSchema,
  venue: {type: mongoose.Schema.Types.ObjectId, ref: 'venues'},
  genres: [String],
//   artists: [artistSchema],
});

const Event = mongoose.model('events', eventSchema);

module.exports = Event;
