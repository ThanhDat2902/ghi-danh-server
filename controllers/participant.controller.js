var ParticipantService = require('../services/participants.service');
var BedroomService = require('../services/bedrooms.service');
var createCsvWriter = require('csv-writer').createObjectCsvWriter;

// Saving the context of this module inside the _the variable

_this = this

exports.getParticipants = async function(req, res, next){

	// Check the existence of the query parameters, If the exists doesn't exists assign a default value.
	
	var page = req.query.page ? req.query.page : 1
	var limit = req.query.limit ? req.query.limit : 1000; 

	try{
	
		var participants = await ParticipantService.getParticipants({}, page, limit)
		
		// Return the rooms list with the appropriate HTTP Status Code and Message.
		
		return res.status(200).json(participants);
		
	}catch(e){
		
		//Return an Error Response Message with Code and the Error Message.
		
		return res.status(400).json({status: 400, message: e.message});
		
	}
}

exports.getCurrentParticipants = async function(req, res, next){

	// Check the existence of the query parameters, If the exists doesn't exists assign a default value
	
	var page = req.query.page ? req.query.page : 1
	var limit = req.query.limit ? req.query.limit : 1000; 

	try{
		var today = new Date();

		var participants = await ParticipantService.getParticipants({$and: [{arriaval_time: {$lt: today}}, {departure_time: {$gt: today}} ]}, page, limit)
		
		// Return the rooms list with the appropriate HTTP Status Code and Message.
		
		return res.status(200).json(participants);
		
	}catch(e){
		
		//Return an Error Response Message with Code and the Error Message.
		
		return res.status(400).json({status: 400, message: e.message});
		
	}
}

exports.getParticipant = async function(req, res, next){

	// Check the existence of the query parameters, If the exists doesn't exists assign a default value
	
	var page = req.query.page ? req.query.page : 1
	var limit = req.query.limit ? req.query.limit : 1000; 
	var id = req.params.id;

	try{
	
		var participant = await ParticipantService.getParticipants({_id: id}, page, limit)

		// Return the rooms list with the appropriate HTTP Status Code and Message.
		
		return res.status(200).json(participant[0]);
		
	}catch(e){
		
		//Return an Error Response Message with Code and the Error Message.
		
		return res.status(400).json({status: 400, message: e.message});
		
	}
}

exports.getParticipantsInRoom = async function(req, res, next){

	// Check the existence of the query parameters, If the exists doesn't exists assign a default value
	
	var page = req.query.page ? req.query.page : 1
	var limit = req.query.limit ? req.query.limit : 1000; 
	var room_id = req.params.room_id;

	try{
	
		var participants = await ParticipantService.getParticipants({room_id: room_id}, page, limit)
		
		// Return the rooms list with the appropriate HTTP Status Code and Message.
		
		return res.status(200).json({status: 200, data: participants, message: "Successfully received list of participants in one room"});
		
	}catch(e){
		
		//Return an Error Response Message with Code and the Error Message.
		
		return res.status(400).json({status: 400, message: e.message});
		
	}
}

exports.getParticipantsCount = async function(req, res, next){

	// Check the existence of the query parameters, If the exists doesn't exists assign a default value
	
	var page = req.query.page ? req.query.page : 1
	var limit = req.query.limit ? req.query.limit : 1000; 

	try{
	
		var participants = await ParticipantService.countParticipants({}, page, limit)
		
		// Return the rooms list with the appropriate HTTP Status Code and Message.
		
		return res.status(200).json(participants);
		
	}catch(e){
		
		//Return an Error Response Message with Code and the Error Message.
		
		return res.status(400).json({status: 400, message: e.message});
		
	}
}

exports.getParticipantsCurrentCount = async function(req, res, next){

	// Check the existence of the query parameters, If the exists doesn't exists assign a default value
	
	var page = req.query.page ? req.query.page : 1
	var limit = req.query.limit ? req.query.limit : 1000; 

	try{
		var today = new Date();

		var participants = await ParticipantService.countParticipants({$and: [{arriaval_time: {$lt: today}}, {departure_time: {$gt: today}} ]}, page, limit)
		
		// Return the rooms list with the appropriate HTTP Status Code and Message.
		
		return res.status(200).json(participants);
		
	}catch(e){
		
		//Return an Error Response Message with Code and the Error Message.
		
		return res.status(400).json({status: 400, message: e.message});
		
	}
}

exports.getParticipantsMaleCount = async function(req, res, next){

	// Check the existence of the query parameters, If the exists doesn't exists assign a default value
	
	var page = req.query.page ? req.query.page : 1
	var limit = req.query.limit ? req.query.limit : 1000; 

	try{
		var today = new Date();

		var participants = await ParticipantService.countParticipants({gender:"male"}, page, limit)
		
		// Return the rooms list with the appropriate HTTP Status Code and Message.
		
		return res.status(200).json(participants);
		
	}catch(e){
		
		//Return an Error Response Message with Code and the Error Message.
		
		return res.status(400).json({status: 400, message: e.message});
		
	}
}

exports.getParticipantsChildreenCount = async function(req, res, next){

	// Check the existence of the query parameters, If the exists doesn't exists assign a default value
	
	var page = req.query.page ? req.query.page : 1
	var limit = req.query.limit ? req.query.limit : 1000; 

	try{
		var today = new Date();

		var participants = await ParticipantService.countParticipants({age:{$lt: 18}}, page, limit)
		
		// Return the rooms list with the appropriate HTTP Status Code and Message.
		
		return res.status(200).json(participants);
		
	}catch(e){
		
		//Return an Error Response Message with Code and the Error Message.
		
		return res.status(400).json({status: 400, message: e.message});
		
	}
}

exports.getParticipantsOVCount = async function(req, res, next){

	// Check the existence of the query parameters, If the exists doesn't exists assign a default value
	
	var page = req.query.page ? req.query.page : 1
	var limit = req.query.limit ? req.query.limit : 1000; 

	try{
		var today = new Date();

		var participants = await ParticipantService.countParticipants({age:{$lt: 14}}, page, limit)
		
		// Return the rooms list with the appropriate HTTP Status Code and Message.
		
		return res.status(200).json(participants);
		
	}catch(e){
		
		//Return an Error Response Message with Code and the Error Message.
		
		return res.status(400).json({status: 400, message: e.message});
		
	}
}
exports.getParticipantsNametagCount = async function(req, res, next){

	// Check the existence of the query parameters, If the exists doesn't exists assign a default value
	
	var page = req.query.page ? req.query.page : 1
	var limit = req.query.limit ? req.query.limit : 1000; 

	try{
		var today = new Date();

		var participants = await ParticipantService.countParticipants({recieved_nametag:true}, page, limit)
		
		// Return the rooms list with the appropriate HTTP Status Code and Message.
		
		return res.status(200).json(participants);
		
	}catch(e){
		
		//Return an Error Response Message with Code and the Error Message.
		
		return res.status(400).json({status: 400, message: e.message});
		
	}
}

exports.getParticipantsCountry = async function(req, res, next){

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 1000;
    
    try{
            var classes_with_participants = [];

            var list_of_country = await ParticipantService.getDistinctValuesOfField('address_country')

            list_of_country.forEach(async function(element, index, array){
                var classJson = {};
                var participants = await ParticipantService.countParticipants({address_country: element}, 1, 1000);
                
                classJson["country"] = element;
                classJson["count"] = participants;
                classes_with_participants.push(classJson);

               if (index === list_of_country.length - 1){
                    return res.status(200).json(classes_with_participants)
               } 
            });
        
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        
        return res.status(400).json({status: 400, message: e.message});
        
    }
}

exports.getCountry = async function(req, res, next){

    try{
    
        var country = await ParticipantService.getDistinctValuesOfField('address_country')
        
        // Return the rooms list with the appropriate HTTP Status Code and Message.
        
        return res.status(200).json(country);
        
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        
        return res.status(400).json({status: 400, message: e.message});
        
    }
}


exports.createParticipant = async function(req, res, next){

	// Req.Body contains the form submit values.
	if(req.body.birth_date){
		var ageDifMs = Date.now() - new Date(req.body.birth_date).getTime();
	    var ageDate = new Date(ageDifMs); // miliseconds from epoch
	    var p_age = Math.abs(ageDate.getUTCFullYear() - 1970);
	    console.log(p_age);
	}

	var participant = {
		participant_id: req.body.participant_id,
		name: req.body.name,
		surname: req.body.surname,
		gender: req.body.gender,
		dharma_name: req.body.dharma_name,
		birth_date: req.body.birth_date,
		age: p_age,
		previous_seminars: req.body.previous_seminars,

		arriaval_time: req.body.arriaval_time,
		arriaval_means_of_transport: req.body.arriaval_means_of_transport,
		arriaval_flightnumber: req.body.arriaval_flightnumber,

		departure_time: req.body.departure_time,
		departure_means_of_transport: req.body.departure_means_of_transport,
		departure_flightnumber: req.body.departure_flightnumber,

		address_street: req.body.address_street,
		address_number: req.body.address_number,
		address_city: req.body.address_city,
		address_zip_code: req.body.address_zip_code,
		address_country: req.body.address_country,

		telnr: req.body.telnr,
		email: req.body.email,

		fees: req.body.fees,
		semiar_donation: req.body.semiar_donation,
		monk_donation: req.body.monk_donation,
		rice_donation: req.body.rice_donation,

		class: req.body.class,
		bedroom: req.body.bedroom,
		workgroup: req.body.workgroup,
		tho_ngu_gioi: req.body.tho_ngu_gioi,
		tho_bo_tat_gioi: req.body.tho_bo_tat_gioi,
		recieved_nametag: req.body.recieved_nametag,

	}

	try{
		
		// Calling the Service function with the new object from the Request Body
	
		var createdParticipant = await ParticipantService.createParticipant(participant)
		return res.status(201).json({status: 201, data: createdParticipant, message: "Succesfully Created Participant"})
	}catch(e){
		
		//Return an Error Response Message with Code and the Error Message.
		
		return res.status(400).json({status: 400, message: e.message})
	}
}

exports.updateParticipant = async function(req, res, next){

	// Id is necessary for the update

	if(!req.body._id){
		return res.status(400).json({status: 400., message: "Id must be present"})
	}

	var id = req.body._id;

	if(req.body.birth_date){
		var ageDifMs = Date.now() - new Date(req.body.birth_date).getTime();
	    var ageDate = new Date(ageDifMs); // milliseconds from epoch
	    var p_age = Math.abs(ageDate.getUTCFullYear() - 1970);
	    console.log(p_age);
	}

	console.log("updateParticipant: " + req.body.recieved_nametag);

	var participant = {
		id,
		participant_id: req.body.participant_id ? req.body.participant_id : null,
		name: req.body.name ? req.body.name : null,
		surname: req.body.surname ? req.body.surname : null,
		gender: req.body.gender ? req.body.gender : null,
		dharma_name: req.body.dharma_name ? req.body.dharma_name : null,
		birth_date: req.body.birth_date ? req.body.birth_date : null,
		p_age: p_age,
		previous_seminars: req.body.previous_seminars ? req.body.previous_seminars : null,

		arriaval_time: req.body.arriaval_time ? req.body.arriaval_time : null,
		arriaval_means_of_transport: req.body.arriaval_means_of_transport ? req.body.arriaval_means_of_transport : null,
		arriaval_flightnumber: req.body.arriaval_flightnumber ? req.body.arriaval_flightnumber : null,

		departure_time: req.body.departure_time ? req.body.departure_time : null,
		departure_means_of_transport: req.body.departure_means_of_transport ? req.body.departure_means_of_transport : null,
		departure_flightnumber: req.body.departure_flightnumber ? req.body.departure_flightnumber : null,

		address_street: req.body.address_street ? req.body.address_street : null,
		address_number: req.body.address_number ? req.body.address_number : null,
		address_city: req.body.address_city ? req.body.address_city : null,
		address_zip_code: req.body.address_zip_code ? req.body.address_zip_code : null,
		address_country: req.body.address_country ? req.body.address_country : null,

		telnr: req.body.telnr ? req.body.telnr : null,
		email: req.body.email ? req.body.email : null,

		fees: req.body.fees ? req.body.fees : null,
		semiar_donation: req.body.semiar_donation ? req.body.semiar_donation : null,
		monk_donation: req.body.monk_donation ? req.body.monk_donation : null,
		monk_donation: req.body.monk_donation ? req.body.monk_donation : null,

		class: req.body.class ? req.body.class : null,
		bedroom: req.body.bedroom ? req.body.bedroom : null,
		workgroup: req.body.workgroup ? req.body.workgroup : null,

		tho_ngu_gioi: req.body.tho_ngu_gioi ? req.body.tho_ngu_gioi : null,
		tho_bo_tat_gioi: req.body.tho_bo_tat_gioi ? req.body.tho_bo_tat_gioi : null,
		// tho_ngu_gioi: req.body.tho_ngu_gioi,
		// tho_bo_tat_gioi: req.body.tho_bo_tat_gioi,
		recieved_nametag: req.body.recieved_nametag, 
	}

	try{
		var updatedParticipant = await ParticipantService.updateParticipant(participant)
		return res.status(200).json({status: 200, data: updatedParticipant, message: "Successfully Updated Participant"})
	}catch(e){
		return res.status(400).json({status: 400., message: e.message})
	}
}

exports.removeParticipant = async function(req, res, next){

	var id = req.params.id;

	try{
		var deleted = await ParticipantService.deleteParticipant(id)
		return res.status(204).json({status:204, message: "Successfully Deleted Participant"})
	}catch(e){
		return res.status(400).json({status: 400, message: e.message})
	}

}

function _calculateAge(birthday) { // birthday is a date
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // milliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}