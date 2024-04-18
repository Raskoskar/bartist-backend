var express = require("express");
var router = express.Router();

const {
  displayAllBookings,
} = require("../controllers/bookingController");

router.post("/displayAllBookings", displayAllBookings);

module.exports = router;
