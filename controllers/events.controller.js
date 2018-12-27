// Accessing the Service that we just created

var EventService = require('../services/event.service')
var ParticipantsService = require('../services/participants.service')


// Saving the context of this module inside the _the variable

_this = this


// Async Controller function to get the To do List

exports.getEvents = async function(req, res, next){

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 1000; 

    try{
    
        var events = await EventService.getEvents({}, page, limit)
        
        // Return the rooms list with the appropriate HTTP Status Code and Message.
        
        return res.status(200).json(events);
        
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        
        return res.status(400).json({status: 400, message: e.message});
        
    }
}


exports.getOneEvent = async function(req, res, next){

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 1000; 
    var event_id = req.params.event_id;

    try{
    
        var participants = await ParticipantService.getParticipants({"events": event_id}, page, limit)
        
        // Return the rooms list with the appropriate HTTP Status Code and Message.
        
        return res.status(200).json({status: 200, data: participants, message: "Successfully received participants for one event"});
        
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        
        return res.status(400).json({status: 400, message: e.message});
        
    }
}

exports.createEvent = async function(req, res, next){

    // Req.Body contains the form submit values.

    var event = {
        name: req.body.name,
        location: req.body.location,
        start: req.body.start,
        end: req.body.end,
    }

    try{
        
        // Calling the Service function with the new object from the Request Body
    
        var createdEvent = await EventService.createEvent(event)

        return res.status(201).json({status: 201, data: createdEvent, message: "Successfully created event"})
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        
        return res.status(400).json({status: 400, message: e.message})
    }
}

exports.updateEvent = async function(req, res, next){

    // Id is necessary for the update

    if(!req.body._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body._id;

    console.log(req.body)

    var event = {
        id,
        name: req.body.name ? req.body.name : null,
        location: req.body.location ? req.body.location : null,
        start: req.body.start ? req.body.start : null,
        end: req.body.end ? req.body.end : null,
    }

    try{
        var updatedEvent = await EventService.updateEvent(event)
        return res.status(200).json({status: 200, data: updatedEvent, message: "Successfully updated event"})
    }catch(e){
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeEvent = async function(req, res, next){

    var id = req.params.id;

    try{
        var deleted = await EventService.deleteEvent(id)
        return res.status(204).json({status:204, message: "Successfully deleted event"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }

}