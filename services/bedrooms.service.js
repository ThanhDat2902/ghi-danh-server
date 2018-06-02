// Gettign the Newly created Mongoose Model we just created 

var Bedroom = require('../models/bedroom.model')

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the To do List

exports.getBedrooms = async function(query, page, limit){

    // Options setup for the mongoose paginate

    var options = {
        page,
        limit
    }
    
    // Try Catch the awaited promise to handle the error 
    
    try {
        var bedrooms = await Bedroom.paginate(query, options)
        
        // Return the room list that was retured by the mongoose promise
        return bedrooms.docs;

    } catch (e) {

        // return a Error message describing the reason 

        throw Error('Error while Paginating Bedrooms')
    }
}

exports.createBedroom = async function(bedroom){
    
    // Creating a new Mongoose Object by using the new keyword

    var newBedroom = new Bedroom({
        name: bedroom.name,
        capacity: bedroom.capacity,
        house: bedroom.house,
        gender: bedroom.gender,
        age: bedroom.age
    })

    try{

        // Saving the room 

        var savedBedroom = await newBedroom.save()

        return savedBedroom;
    }catch(e){
      
        // return a Error message describing the reason     

        throw Error("Error while Creating Bedroom")
    }
}

exports.updateBedroom = async function(bedroom){
    var id = bedroom.id

    try{
        //Find the old Room Object by the Id
    
        var oldBedroom = await Bedroom.findById(id);
    }catch(e){
        throw Error("Error occured while Finding the Room")
    }

    // If no old Room Object exists return false

    if(!oldBedroom){
        return false;
    }

    console.log(oldBedroom)

    //Edit the Room Object
    oldBedroom.name = bedroom.name,
    oldBedroom.capacity = bedroom.capacity,
    oldBedroom.house = bedroom.house
    oldBedroom.geder = bedroom.gender,
    oldBedroom.age = bedroom.age


    console.log(oldBedroom)

    try{
        var savedBedroom = await oldBedroom.save()
        return savedBedroom;
    }catch(e){
        throw Error("And Error occured while updating the Bedroom");
    }
}

exports.deleteBedroom = async function(id){
    
    // Delete the Room

    try{
        var deleted = await Bedroom.remove({_id: id})
        if(deleted.result.n === 0){
            throw Error("Bedroom Could not be deleted")
        }
        return deleted
    }catch(e){
        throw Error(e.message)
    }
}