var express = require('express')

var router = express.Router()

// Getting the Todo Controller that we just created

var ParticipantController = require('../../controllers/participant.controller');

// Map each API to the Controller Functions

router.get('/', ParticipantController.getParticipants)

router.get('/:id', ParticipantController.getParticipant)

router.post('/', ParticipantController.createParticipant)

router.put('/', ParticipantController.updateParticipant)

router.delete('/:id',ParticipantController.removeParticipant)

// Export the Router

module.exports = router;