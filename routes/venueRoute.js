var express = require('express');
var router = express.Router();

const {
    signUpVenue,
    signInVenue,
  } = require("../controllers/venueController");

// POST signup
router.post('/signUp', signUpVenue)

// POST signin
router.post('/signIn', signInVenue)

module.exports = router;

