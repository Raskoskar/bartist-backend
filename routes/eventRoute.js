var express = require('express');
var router = express.Router();

// Import des fonctions
const {
    createEvent,
    getEvents,
    displayEvents,
    deleteEvent,
    updateStatus,
    // updateStatusEvent,
    // editEvent,
  } = require("../controllers/eventController");

// POST createEvent
router.post('/createEvent', createEvent)

// GET displayEvents / le nom de la route est independante de ce qui a dans la bdd, donc on nomme comme on veu
router.get('/displayEvents/:token', displayEvents)

// DELETE deleteEvent / le nom de la route est independante de ce qui a dans la bdd, donc on nomme comme on veu
router.delete('/deleteEvent/:id', deleteEvent)

// PUT modifie le statut d'un evenement
router.put('/updateStatus/:status', updateStatus)

router.get('/', getEvents)

module.exports = router;
