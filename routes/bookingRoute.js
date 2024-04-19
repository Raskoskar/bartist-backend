var express = require("express");
var router = express.Router();

const {
  createBooking,
  displayAllBookings,
  updateBookingStatus,
} = require("../controllers/bookingController");

router.post("/createBooking", createBooking);
router.post("/displayAllBookings", displayAllBookings);
router.post("/updateBookingStatus", updateBookingStatus);


module.exports = router;
