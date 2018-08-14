var express = require('express')

var router = express.Router()

// Getting the Todo Controller that we just created

var BedroomController = require('../../controllers/bedrooms.controller');


// Map each API to the Controller FUnctions

router.get('/', BedroomController.getBedrooms)

//get lists of all participants sorted by bedrooms
router.get('/participants', BedroomController.getParticipantsBedrooms)

router.get('/today/:bedroom_id', BedroomController.getOneBedroomToday)

//get list of participants of one bedroom
router.get('/:bedroom_id', BedroomController.getOneBedroom)

router.post('/', BedroomController.createBedroom)

router.put('/', BedroomController.updateBedroom)

router.delete('/:id',BedroomController.removeBedroom)


// Export the Router

module.exports = router;