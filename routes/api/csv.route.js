var express = require('express')

var router = express.Router()

// Getting the Todo Controller that we just created

var CSVController = require('../../controllers/csv.controller');


// Map each API to the Controller Functions

router.get('/participants',CSVController.getParticipantsCSV)

router.get('/nametag',CSVController.getParticipantNametagCSV)

router.get('/nametagoverview',CSVController.getParticipantNametagOverviewCSV)

router.get('/certificate/:id',CSVController.getParticipantCertificateCSV)

router.get('/list',CSVController.getParticipantsListCSV)

router.get('/class/:id',CSVController.getParticipantsClassCSV)

router.get('/bedroom/:id',CSVController.getParticipantsBedroomCSV)

router.get('/donations',CSVController.getDonationsCSV)

router.get('/noWorkgroup',CSVController.getMissingWorkgroupCSV)

router.get('/ov',CSVController.getOvCSV)

router.get('/thieu',CSVController.getThieuCSV)

router.get('/FastTrack',CSVController.getFastTrack)

// Export the Router

module.exports = router;