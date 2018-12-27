var Event = require('../models/event.model')

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the To do List

exports.getEvents = async function(query, page, limit){

    // Options setup for the mongoose paginate

    var options = {
        page,
        limit,
        sort:     { name: 1 },
    }
    
    // Try Catch the awaited promise to handle the error 
    
    try {
        var events = await Event.paginate(query, options)
        
        // Return the room list that was returned by the mongoose promise
        return events.docs;

    } catch (e) {

        // return a Error message describing the reason 

        throw Error(e)
    }
}

exports.createEvent = async function(event){
    
    // Creating a new Mongoose Object by using the new keyword

    var newEvent = new Event({
        name: event.name,
        location: event.location,
        start: event.start,
        end: event.end,
    })

    try{

        // Saving the room 

        var savedEvent = await newEvent.save()

        return savedEvent;

    }catch(e){
      
        // return a Error message describing the reason     

        throw Error(e.message)
    }
}

exports.updateEvent = async function(event){
    var id = event.id

    try{
        //Find the old Room Object by the Id
    
        var oldEvent = await Event.findById(id);
    }catch(e){
        throw Error("Error occurred while finding the event")
    }

    // If no old Room Object exists return false

    if(!oldEvent){
        return false;
    }

    console.log(oldEvent)

    //Edit the Room Object
    oldEvent.name = event.name,
    oldEvent.capacity = event.capacity,
    oldEvent.house = event.house
    oldEvent.geder = event.gender,
    oldEvent.age = event.age

    try{
        var savedEvent = await oldEvent.save()
        return savedEvent;
    }catch(e){
        throw Error("And Error occurred while updating the event");
    }
}

exports.deleteEvent = async function(id){
    
    // Delete the Room

    try{
        var deleted = await Event.remove({_id: id})
        if(deleted.result.n === 0){
            throw Error("Event Could not be deleted")
        }
        return deleted
    }catch(e){
        throw Error(e.message)
    }
}