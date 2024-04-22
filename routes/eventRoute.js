var express = require('express');
var router = express.Router();

// Import des fonctions
const {
    createEvent,
    getEvents,
    displayEvents,
    getEventById,
    deleteEvent,
    updateEventStatus,
    // editEvent,
  } = require("../controllers/eventController");

// POST createEvent
router.post('/createEvent', createEvent)

// GET displayEvents / le nom de la route est independante de ce qui a dans la bdd, donc on nomme comme on veu
router.get('/displayEvents/:token', displayEvents)

// DELETE deleteEvent / le nom de la route est independante de ce qui a dans la bdd, donc on nomme comme on veu
router.delete('/deleteEvent', deleteEvent)

// Post modifie le statut d'un evenement
router.post('/updateEventStatus', updateEventStatus)

router.get('/', getEvents)
router.get('/id/', getEventById)
module.exports = router;
