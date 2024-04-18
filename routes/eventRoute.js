var express = require('express');
var router = express.Router();

const {
    createEvent,
    getEvents,
    // updateStatusEvent,
    // editEvent,
  } = require("../controllers/eventController");

// POST createEvent
router.post('/createEvent', createEvent)
router.get('/', getEvents)
module.exports = router;
