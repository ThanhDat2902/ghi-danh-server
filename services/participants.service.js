// Gettign the Newly created Mongoose Model we just created 

var Participant = require('../models/participant.model')
var Bedroom = require('../models/bedroom.model')

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the To do List

exports.getParticipants = async function(query, page, limit){

    // Options setup for the mongoose paginate

    var options = {
        page,
        limit
    }
    
    // Try Catch the awaited promise to handle the error 
    
    try {
        //var participants = await Participant.paginate(query, options)
        var participants = await Participant.find(query);

        return participants;
        

    } catch (e) {

        // return a Error message describing the reason 

        throw Error('Error while Paginating Participants')
    }
}

exports.createParticipant = async function(participant){
    
    // Creating a new Mongoose Object by using the new keyword

    var newParticipant = new Participant({
        
        participant_id: participant.participant_id,
        name: participant.name,  
        surname: participant.surname,
        gender: participant.gender,
        dharma_name: participant.dharma_name,
        birth_date: participant.birth_date,
        previous_seminars: participant.previous_seminars,

        arriaval_time: participant.arriaval_time,
        arriaval_means_of_transport: participant.arriaval_means_of_transport,
        arriaval_flightnumber: participant.arriaval_flightnumber,
        
        departure_time: participant.departure_time,
        departure_means_of_transport: participant.departure_means_of_transport,
        departure_flightnumber: participant.departure_flightnumber,
        
        address_street: participant.address_street,
        address_number: participant.address_number,
        address_city: participant.address_city,
        address_zip_code: participant.address_zip_code,
        address_country: participant.address_country,

        telnr: participant.telnr,
        email: participant.email,

        fees: participant.fees,
        semiar_donation: participant.semiar_donation,
        monk_donation: participant.monk_donation,
        rice_donation: participant.rice_donation,

        class: participant.class,
        bedroom: participant.bedroom,
        workgroup: participant.workgroup,
        tho_bo_tat_gioi: participant.tho_bo_tat_gioi,
        tho_ngu_gioi: participant.tho_ngu_gioi,
        recieved_nametag: participant.recieved_nametag,
        })

    try{

        // Saving the room 

        var savedParticipant = await newParticipant.save()

        return savedParticipant;
    }catch(e){
      
        // return a Error message describing the reason     

        throw Error("participants.services" + e.message)
    }
}

exports.updateParticipant = async function(participant){
    var id = participant.id

    try{
        //Find the old Room Object by the Id
    
        var oldParticipant = await Participant.findById(id);
    }catch(e){
        throw Error("Error occured while Finding the Participant")
    }

    // If no old Room Object exists return false

    if(!oldParticipant){
        return false;
    }
    console.log('participants.service.js')

    console.log(oldParticipant)

    //Edit the Participant Object
    
    oldParticipant.participant_id = participant.participant_id  || oldParticipant.participant_id,
    oldParticipant.name = participant.name  || oldParticipant.name,
    oldParticipant.surname = participant.surname || oldParticipant.surname,
    oldParticipant.gender = participant.gender || oldParticipant.gender,
    oldParticipant.dharma_name = participant.dharma_name || oldParticipant.dharma_name,
    
    oldParticipant.birth_date = participant.birth_date || oldParticipant.birth_date,
    oldParticipant.previous_seminars = participant.previous_seminars || oldParticipant.previous_seminars,

    oldParticipant.arriaval_time = participant.arriaval_time || oldParticipant.arriaval_time,
    oldParticipant.arriaval_means_of_transport = participant.arriaval_means_of_transport || oldParticipant.arriaval_means_of_transport,
    oldParticipant.arriaval_flightnumber = participant.arriaval_flightnumber || oldParticipant.arriaval_flightnumber,

    oldParticipant.departure_time = participant.departure_time || oldParticipant.departure_time,
    oldParticipant.departure_means_of_transport = participant.departure_means_of_transport || oldParticipant.departure_means_of_transport,
    oldParticipant.departure_flightnumber = participant.departure_flightnumber || oldParticipant.departure_flightnumber,

    oldParticipant.address_street = participant.address_street || oldParticipant.address_street,
    oldParticipant.address_number = participant.address_number || oldParticipant.address_number,
    oldParticipant.address_city = participant.address_city || oldParticipant.address_city,
    oldParticipant.address_zip_code = participant.address_zip_code || oldParticipant.address_zip_code,
    oldParticipant.address_country = participant.address_country || oldParticipant.address_country,

    oldParticipant.telnr = participant.telnr || oldParticipant.telnr,
    oldParticipant.email = participant.email || oldParticipant.email,

    oldParticipant.fees = participant.fees || oldParticipant.fees,
    oldParticipant.semiar_donation = participant.semiar_donation || oldParticipant.semiar_donation,
    oldParticipant.monk_donation = participant.monk_donation || oldParticipant.monk_donation,
    oldParticipant.rice_donation = participant.rice_donation || oldParticipant.rice_donation,

    oldParticipant.class = participant.class || oldParticipant.class,
    oldParticipant.bedroom = participant.bedroom || oldParticipant.bedroom,
    oldParticipant.workgroup = participant.workgroup || oldParticipant.workgroup,
    oldParticipant.tho_bo_tat_gioi = participant.tho_bo_tat_gioi,
    oldParticipant.tho_ngu_gioi = participant.tho_ngu_gioi,
    oldParticipant.recieved_nametag = participant.recieved_nametag


    console.log(oldParticipant)

    try{
        var savedParticipant = await oldParticipant.save()
        return savedParticipant;
    }catch(e){
        throw Error("And Error occured while updating the Participant");
    }
}

exports.deleteParticipant = async function(id){
    
    // Delete the Room

    try{
        var deleted = await Participant.remove({_id: id})
        return deleted
    }catch(e){
        throw Error(e.message)
    }
}

exports.getDistinctValuesOfField = async function(field){
    //db.collection.distinct(field, query, options)¶
    return Participant.distinct(field)
}