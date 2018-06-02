// Accessing the Service that we just created

var BedroomService = require('../services/bedrooms.service')
var ParticipantService = require('../services/participants.service')


// Saving the context of this module inside the _the variable

_this = this


// Async Controller function to get the To do List

exports.getBedrooms = async function(req, res, next){

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10; 

    try{
    
        var bedrooms = await BedroomService.getBedrooms({}, page, limit)
        
        // Return the rooms list with the appropriate HTTP Status Code and Message.
        
        return res.status(200).json(bedrooms);
        
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        
        return res.status(400).json({status: 400, message: e.message});
        
    }
}

exports.getParticipantsBedrooms = async function(req, res, next){

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 1000;
    
    try{
            var bedrooms_with_participants = [];

            var list_of_bedrooms = await BedroomService.getBedrooms({}, page, limit)


            list_of_bedrooms.docs.forEach(async function(element, index, array){
                var bedroomJson = {};
                var participants = await ParticipantService.getParticipants({bedroom: element._id}, 1, 1000);
                console.log(participants)
                bedroomJson["bedroom"] = element.name;
                bedroomJson["number_of_participants"] = participants.length;
                bedroomJson["participants"] = participants;
                bedrooms_with_participants.push(bedroomJson);

               if (index === list_of_bedrooms.docs.length - 1){
                    return res.status(200).json({status: 200, data: bedrooms_with_participants, message: "Succesfully recieved a lisf of participants of one class"})
               } 
            });
        
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        
        return res.status(400).json({status: 400, message: e.message});
        
    }
}


exports.getOneBedroom = async function(req, res, next){

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 1000; 
    var bedroom_id = req.params.bedroom_id;

    try{
    
        var participants = await ParticipantService.getParticipants({"bedroom": bedroom_id}, page, limit)
        
        // Return the rooms list with the appropriate HTTP Status Code and Message.
        
        return res.status(200).json({status: 200, data: participants, message: "Succesfully Recieved Participants in one Bedroom"});
        
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        
        return res.status(400).json({status: 400, message: e.message});
        
    }
}

exports.getOneBedroomToday = async function(req, res, next){

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 1000; 
    var bedroom_id = req.params.bedroom_id;

    try{
    
        var participants = await ParticipantService.getParticipants({"bedroom": bedroom_id, 'arriaval.time': {$lte: new Date()}, 'departure.time': {$gte: new Date()}}, page, limit)
        
        // Return the rooms list with the appropriate HTTP Status Code and Message.
        
        return res.status(200).json({status: 200, data: participants, message: "Succesfully Recieved Participants in one Bedroom"});
        
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        
        return res.status(400).json({status: 400, message: e.message});
        
    }
}

exports.createBedroom = async function(req, res, next){

    // Req.Body contains the form submit values.

    var bedroom = {
        name: req.body.name,
        capacity: req.body.capacity,
        house: req.body.house,
        gender: req.body.gender,
        age: req.body.age
    }

    try{
        
        // Calling the Service function with the new object from the Request Body
    
        var createdBedroom = await BedroomService.createBedroom(bedroom)
        return res.status(201).json({status: 201, data: createdBedroom, message: "Succesfully Created Bedroom"})
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        
        return res.status(400).json({status: 400, message: "Bedroom Creation was Unsuccesfull"})
    }
}

exports.updateBedroom = async function(req, res, next){

    // Id is necessary for the update

    if(!req.body._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body._id;

    console.log(req.body)

    var bedroom = {
        id,
        name: req.body.name ? req.body.name : null,
        capacity: req.body.capacity ? req.body.capacity : null,
        house: req.body.house ? req.body.house : null,
        gender: req.body.gender ? req.body.gender : null,
        age: req.body.age ? req.body.age : null,
    }

    try{
        var updatedBedroom = await BedroomService.updateBedroom(bedroom)
        return res.status(200).json({status: 200, data: updatedBedroom, message: "Succesfully Updated Bedroom"})
    }catch(e){
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeBedroom = async function(req, res, next){

    var id = req.params.id;

    try{
        var deleted = await BedroomService.deleteBedroom(id)
        return res.status(204).json({status:204, message: "Succesfully Deleted Bedroom"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }

}