var express = require('express')

var router = express.Router()

// Getting the Todo Controller that we just created

var ParticipantController = require('../../controllers/participant.controller');

// Map each API to the Controller Functions

//get array of all participants
router.get('/', ParticipantController.getParticipants)

//get array of all participants who already arrived
router.get('/current', ParticipantController.getCurrentParticipants)

//Count of participants in total
router.get('/count/total', ParticipantController.getParticipantsCount)

//Count of participants who already arrived
router.get('/count/current', ParticipantController.getParticipantsCurrentCount)

//Count of participants already recived their nametags
router.get('/count/nametag', ParticipantController.getParticipantsNametagCount)

//get one participants with {:id} id
router.get('/:id', ParticipantController.getParticipant)

router.post('/', ParticipantController.createParticipant)

router.put('/', ParticipantController.updateParticipant)

router.delete('/:id',ParticipantController.removeParticipant)

// Export the Router

module.exports = router;