var Class = require('../models/class.model')

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the To do List

exports.getClasses = async function(query, page, limit){

    // Options setup for the mongoose paginate

    var options = {
        page,
        limit,
        sort:     { name: 1 },
    }
    
    // Try Catch the awaited promise to handle the error 
    
    try {
        var classes = await Class.find().populate('event')
        
        // Return the room list that was returned by the mongoose promise
        return classes;

    } catch (e) {

        // return a Error message describing the reason 

        throw Error(e)
    }
}

exports.createClass = async function(inputClass){
    
    // Creating a new Mongoose Object by using the new keyword

    var newClass = new Class({
        name: inputClass.name,
        event: inputClass.event,
        describtion: inputClass.describtion,
    })

    try{

        // Saving the room 

        var savedClass = await newClass.save()

        return savedClass;

    }catch(e){
      
        // return a Error message describing the reason     

        throw Error(e.message)
    }
}

exports.updateClass = async function(inputClass){
    var id = inputClass.id

    try{
        //Find the old Room Object by the Id
    
        var oldClass = await Class.findById(id);
    }catch(e){
        throw Error("Error occurred while finding the class")
    }

    // If no old Room Object exists return false

    if(!oldClass){
        return false;
    }

    console.log(oldClass)

    //Edit the Room Object
    oldClass.name = inputClass.name,
    oldClass.event = inputClass.event,
    oldClass.describtion = inputClass.describtion

    try{
        var savedClass = await oldClass.save()
        return savedClass;
    }catch(e){
        throw Error("And Error occurred while updating the class");
    }
}

exports.deleteClass = async function(id){
    
    try{
        var deleted = await Class.remove({_id: id})
        if(deleted.result.n === 0){
            throw Error("Class Could not be deleted")
        }
        return deleted
    }catch(e){
        throw Error(e.message)
    }
}