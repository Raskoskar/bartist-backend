var express = require("express");
var router = express.Router();
const mongoose = require("mongoose")
const Venue = require("../models/VenueModel");
const { checkBody } = require("../utils/checkBody");

const uid2 = require("uid2");
const bcrypt = require("bcrypt");

const token = uid2(32);


// POST signup
exports.signUpVenue = async (req, res) => {
  if (!checkBody(req.body, ['email', 'password'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }
  // Check if the email has not already been registered
  Venue.findOne({ email: req.body.email }).then(data => {
    if (data === null) {
      const hash = bcrypt.hashSync(req.body.password, 10);

      const newVenue = new Venue({
        email: req.body.email,
        password: hash,
        token: uid2(32),
      });

      newVenue.save().then(newDoc => {
        res.json({ result: true, token: newDoc.token });
      });
    } else {
      // email already exists in database
      res.json({ result: false, error: 'Venue already exists' });
    }
  });
};

// POST signin
exports.signInVenue = async (req, res) => {
  if (!checkBody(req.body, ['email', 'password'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }

  // Check if the email has not already been registered
  Venue.findOne({ email: req.body.email }).then(data => {
    if (data && bcrypt.compareSync(req.body.password, data.password)) {
      res.json({ result: true, token: data.token });
    } else {
      res.json({ result: false, error: 'email not found or wrong password' });
    }
  });
};

// POST create profil
exports.createProfileVenue = async (req, res) => {
  if (!checkBody(req.body, ['name'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }
  // Check if token has been registered
  Venue.findOne({ token: req.params.token }).then(data => {
    if (data === null) {
      // Token doesn't exist in the database
      res.json({ result: false, error: 'Venue does not exist' });      
    } else {
      console.log(req.body.type)
      // Complete profile with new data in venues
      data.name = req.body.name;
      data.type = req.body.type;
      data.address = req.body.address;
      data.description = req.body.description;
      data.picture = req.body.picture;

      // Save the updated profile in the db
      data.save().then(newProfile => {
        res.json({ result: true, message: 'Profile Created', newProfile, type: req.body.type });
      });
    }
  });
};

// RECUPERATION INFOS D'UN VENUE
exports.getVenueById = (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ result: false, message: 'Invalid ID' });
  }

  Venue.findOne({ _id: id })
    .then(data => {
      if (data) {
        res.status(200).json({ result: true, venue: data });
      } else {
        res.status(404).json({ result: false, message: 'venue not found' });
      }
    })
    .catch(error => {
      console.error("Error fetching venue:", error);
      res.status(500).json({ result: false, message: 'Error' });
    });
};



exports.getVenueByToken = (req, res) => {
  try{
    Venue.findOne({ token: req.params.token }).then(data => {
      if (data) {
        res.status(200).json({ result: true, venue: data });
      } else {
        res.status(404).json({ result: false, message: 'User not found' });
      }
    });
  }catch(error){
    res.status(500).json({ result: false, message: 'Error' });
  }
};