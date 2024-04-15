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
        // name: req.body.name,
        // type: req.body.type,
        // adresse: req.body.adresse,
        // description: req.body.description,
        // image_profil: req.body.image,
        // evenement: req.body.evenementId,
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
