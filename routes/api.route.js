var express = require('express')

var router = express.Router()
var participants = require('./api/participants.route')
var bedrooms = require('./api/bedrooms.route')
var csv = require('./api/csv.route')
var event = require('./api/event.route')
var classes = require('./api/class.route')

router.use('/class', classes);
router.use('/event', event);
router.use('/participants', participants);
router.use('/bedrooms', bedrooms);
router.use('/classes', classes);
router.use('/csv', csv);

module.exports = router;