var express = require('express')

var router = express.Router()

// Getting the Todo Controller that we just created

var CSVController = require('../../controllers/csv.controller');


// Map each API to the Controller Functions

router.get('/participants',CSVController.getParticipantsCSV)

router.get('/nametag',CSVController.getParticipantNametagCSV)

router.get('/certificate/:id',CSVController.getParticipantCertificateCSV)

router.get('/list',CSVController.getParticipantsListCSV)

router.get('/class/:id',CSVController.getParticipantsClassCSV)

router.get('/bedroom/:id',CSVController.getParticipantsBedroomCSV)

router.get('/donations',CSVController.getDonationsCSV)

// Export the Router

module.exports = router;