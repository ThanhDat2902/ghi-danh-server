var express = require('express')

var router = express.Router()
var participants = require('./api/participants.route')
var bedrooms = require('./api/bedrooms.route')
var classes = require('./api/classes.route')
var csv = require('./api/csv.route')
var event = require('./api/event.route')

router.use('/event', event);
router.use('/participants', participants);
router.use('/bedrooms', bedrooms);
router.use('/classes', classes);
router.use('/csv', csv);

module.exports = router;