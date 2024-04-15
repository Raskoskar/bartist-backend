var express = require('express');
var router = express.Router();

const {
    signUpVenue,
    signInVenue,
    createProfilVenue,
  } = require("../controllers/venueController");

// POST signup
router.post('/signUp', signUpVenue)

// POST signin
router.post('/signIn', signInVenue)

// POST create profil
router.post('/createprofil/:token', createProfilVenue)

module.exports = router;

