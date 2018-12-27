var express = require('express')

var router = express.Router()

var EventController = require('../../controllers/events.controller');


// Map each API to the Controller Functions

router.get('/', EventController.getEvents)

//get list of participants of one Events
router.get('/:events_id', EventController.getOneEvent)

router.post('/', EventController.createEvent)

router.put('/', EventController.updateEvent)

router.delete('/:id',EventController.removeEvent)


// Export the Router

module.exports = router;