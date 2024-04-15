var express = require('express');
var router = express.Router();

const {
    signUp,
    signIn,
    getUser
  } = require("../controllers/userController");

/* GET users listing. */
router.get('/', getUser)

module.exports = router;
