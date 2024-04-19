var express = require('express');
var router = express.Router();

// Import des fonctions
const {
    createEvent,
    displayEvents,
    // updateStatusEvent,
    // editEvent,
  } = require("../controllers/eventController");

// POST createEvent
router.post('/createEvent', createEvent)

// GET displayEvent
router.get('/displayEvents/:token', displayEvents)

module.exports = router;
