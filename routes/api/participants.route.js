var express = require('express')

var router = express.Router()

// Getting the Todo Controller that we just created

var ParticipantController = require('../../controllers/participant.controller');

// Map each API to the Controller Functions

//get array of all participants
router.get('/', ParticipantController.getParticipants)

//get array of all participants who already arrived
router.get('/current', ParticipantController.getCurrentParticipants)

//get count of participants in total
router.get('/count/total', ParticipantController.getParticipantsCount)

//get count of participants who already arrived
router.get('/count/current', ParticipantController.getParticipantsCurrentCount)

//get count of participants already recived their nametags
router.get('/count/nametag', ParticipantController.getParticipantsNametagCount)

//get count of male participants
router.get('/count/male', ParticipantController.getParticipantsMaleCount)

router.get('/count/country', ParticipantController.getParticipantsCountry)

router.get('/country', ParticipantController.getCountry)

router.get('/count/child', ParticipantController.getParticipantsChildreenCount)

router.get('/count/ov', ParticipantController.getParticipantsOVCount)

//get one participants with {:id} id
router.get('/:id', ParticipantController.getParticipant)

router.post('/', ParticipantController.createParticipant)

router.put('/', ParticipantController.updateParticipant)

router.delete('/:id',ParticipantController.removeParticipant)

// Export the Router

module.exports = router;