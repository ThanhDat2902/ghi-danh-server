var express = require('express')

var router = express.Router()

// Getting the Todo Controller that we just created

var ClassController = require('../../controllers/classes.controller');


// Map each API to the Controller FUnctions

router.get('/', ClassController.getClasses)

router.get('/:event_id', ClassController.getEventClasses)

router.post('/', ClassController.createClass)

router.put('/', ClassController.updateClass)

router.delete('/:id',ClassController.removeClass)


// Export the Router

module.exports = router;