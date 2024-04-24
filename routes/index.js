var express = require('express');
var router = express.Router();

const {
  uploadFile,
} = require("../controllers/cloudinaryController");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Post uplod fichier/img
router.post('/uploadFile', uploadFile)

module.exports = router;
