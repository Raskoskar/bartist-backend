var express = require('express');
var router = express.Router();

// Import des fonctions
const {
    createEvent,
<<<<<<< HEAD
    displayEvents,
=======
    getEvents,
>>>>>>> 99d80be11436260746cfdfc3124f15908f1ceaf9
    // updateStatusEvent,
    // editEvent,
  } = require("../controllers/eventController");

// POST createEvent
router.post('/createEvent', createEvent)
<<<<<<< HEAD

// GET displayEvent
router.get('/displayEvents/:token', displayEvents)

=======
router.get('/', getEvents)
>>>>>>> 99d80be11436260746cfdfc3124f15908f1ceaf9
module.exports = router;
