var express = require('express')

var router = express.Router()

// Getting the Todo Controller that we just created

var ClassesController = require('../../controllers/classes.controller');

// Map each API to the Controller Functions

//get lists of all classes
router.get('/', ClassesController.getClasses)

//get lists of all participants sorted by classes
router.get('/participants', ClassesController.getParticipantsClasses)

//get list of participants of one class
router.get('/:class_id', ClassesController.getOneClass)


// Export the Router

module.exports = router;