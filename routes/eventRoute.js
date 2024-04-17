var express = require('express');
var router = express.Router();

const {
    createEvent,
    // updateStatusEvent,
    // editEvent,
  } = require("../controllers/eventController");

// POST createEvent
router.post('/createEvent', createEvent)

module.exports = router;
