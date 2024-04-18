var express = require("express");
var router = express.Router();

const {
  getArtist,
  getArtists,
  signUpArtist,
  signInArtist,
  createProfileArtist,
} = require("../controllers/artistController");

/* GET artists listing. */
// router.get('/', getUser)
router.get("/", getArtists);
router.get("/:token", getArtist);
router.post("/signUp", signUpArtist);
router.post("/signIn", signInArtist);
router.post("/createProfile/:token", createProfileArtist);

module.exports = router;
