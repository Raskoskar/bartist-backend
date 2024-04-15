var express = require('express');
var router = express.Router();

const {
    signUpArtist,
    signInArtist,
  } = require("../controllers/artistController");

  
/* GET artists listing. */
// router.get('/', getUser)
 router.post('/signUp', signUpArtist)
 router.post('/signIn', signInArtist)

module.exports = router;
