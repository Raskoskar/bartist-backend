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
router.get('/', getEvents)
router.get('/displayEvents', displayEvents)
module.exports = router;
