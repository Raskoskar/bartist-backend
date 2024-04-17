var express = require("express");
var router = express.Router();

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
exports.createProfilVenue = async (req, res) => {
  if (!checkBody(req.body, ['name'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }
  // Check if token has been registered
  Venue.findOne({ token: req.params.token }).then(dataVenue => {
    if (dataVenue === null) {
      // Token doesn't exist in the database
      res.json({ result: false, error: 'Venue don`t exists' });      
    } else {
      // Complete profile with new data in venues
      dataVenue.name = req.body.name;
      dataVenue.type = req.body.type;
      dataVenue.address = req.body.adress;
      dataVenue.description = req.body.description;
      dataVenue.picture = req.body.picture;
      // data.events = req.body.evenementId;

      // Save the updated profile in the db
      dataVenue.save().then(newProfil => {
        res.json({ result: true, message: 'Profile created', newProfil });
      });
    }
  });
};