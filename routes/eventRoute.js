var express = require('express');
var router = express.Router();

// Import des fonctions
const {
    createEvent,
    displayEvents,
    getEvents,
    // updateStatusEvent,
    // editEvent,
  } = require("../controllers/eventController");

// POST createEvent
router.post('/createEvent', createEvent)

// GET displayEvent
router.get('/displayEvents/:token', displayEvents)

router.get('/', getEvents)
module.exports = router;
