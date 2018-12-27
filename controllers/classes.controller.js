// Accessing the Service that we just created

var ParticipantService = require('../services/participants.service')
var ClassesService = require('../services/classes.service')


// Saving the context of this module inside the _the variable

_this = this

exports.getClasses = async function(req, res, next){

        // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 1000; 

    try{
    
        var classes = await ClassesService.getClasses({}, page, limit)
        
        // Return the rooms list with the appropriate HTTP Status Code and Message.
        
        return res.status(200).json(classes);
        
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        
        return res.status(400).json({status: 400, message: e.message});
        
    }
}

exports.getEventClasses = async function(req, res, next){

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 1000; 

    try{
        
        var classes = await ClassesService.getClasses({event: req.params.class}, page, limit)
        
        // Return the rooms list with the appropriate HTTP Status Code and Message.
        
        return res.status(200).json({status: 200, data: participants, message: "Successfully received a list of classes of one event"});
        
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        
        return res.status(400).json({status: 400, message: e.message});
        
    }
}

exports.createClass = async function(req, res, next){

    // Req.Body contains the form submit values.

    var newclass = {
        name: req.body.name,
        event: req.body.event,
        describtion: req.body.describtion,
    }

    try{
        
        // Calling the Service function with the new object from the Request Body
    
        var createdClass = await ClassesService.createClass(newclass)

        return res.status(201).json({status: 201, data: createdClass, message: "Successfully created class"})
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        
        return res.status(400).json({status: 400, message: e.message})
    }
}

exports.updateClass = async function(req, res, next){

    // Id is necessary for the update

    if(!req.body._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body._id;

    console.log(req.body)

    var newclass = {
        id,
        name: req.body.name ? req.body.name : null,
        event: req.body.event ? req.body.event : null,
        describtion: req.body.describtion ? req.body.describtion : null,
    }

    try{
        var updatedClass = await ClassesService.updateClass(newclass)
        return res.status(200).json({status: 200, data: updatedClass, message: "Successfully updated class"})
    }catch(e){
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeClass = async function(req, res, next){

    var id = req.params.id;

    try{
        var deleted = await ClassesService.deleteClass(id)
        return res.status(204).json({status:204, message: "Successfully deleted class"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }

}
