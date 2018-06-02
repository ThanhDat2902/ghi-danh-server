// Accessing the Service that we just created

var ParticipantService = require('../services/participants.service')

// Saving the context of this module inside the _the variable

_this = this

exports.getClasses = async function(req, res, next){

    try{
    
        var classes = await ParticipantService.getDistinctValuesOfField('class')
        
        // Return the rooms list with the appropriate HTTP Status Code and Message.
        
        return res.status(200).json(classes);
        
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        
        return res.status(400).json({status: 400, message: e.message});
        
    }
}

exports.getParticipantsClasses = async function(req, res, next){

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 1000;
    
    try{
            var classes_with_participants = [];

            var list_of_classes = await ParticipantService.getDistinctValuesOfField('class')

            list_of_classes.forEach(async function(element, index, array){
                var classJson = {};
                var participants = await ParticipantService.getParticipants({class: element}, 1, 1000);
                
                classJson["class"] = element;
                classJson["number_of_participants"] = participants.total;
                classJson["participants"] = participants.docs;
                classes_with_participants.push(classJson);

               if (index === list_of_classes.length - 1){
                    return res.status(200).json({status: 200, data: classes_with_participants, message: "Succesfully recieved a lisf of participants of one class"})
               } 
            });
        
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        
        return res.status(400).json({status: 400, message: e.message});
        
    }
}

exports.getOneClass = async function(req, res, next){

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 1000; 
    var class_id = req.params.class_id;

    try{
    
        var participants = await ParticipantService.getParticipants({class: class_id}, page, limit)
        
        // Return the rooms list with the appropriate HTTP Status Code and Message.
        
        return res.status(200).json({status: 200, data: participants, message: "Succesfully recieved a lisf of participants of one class"});
        
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        
        return res.status(400).json({status: 400, message: e.message});
        
    }
}
