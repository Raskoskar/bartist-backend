var express = require("express");
var router = express.Router();

const {
  signUpVenue,
  signInVenue,
  createProfileVenue,
  getVenue,
} = require("../controllers/venueController");

// GET un venue
router.get("/:token", getVenue);
// POST signup
router.post("/signUp", signUpVenue);

// POST signin
router.post("/signIn", signInVenue);

// POST create profil
router.post("/createProfile/:token", createProfileVenue);

module.exports = router;
