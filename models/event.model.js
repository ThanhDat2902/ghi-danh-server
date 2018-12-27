var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var EventSchema = new mongoose.Schema({
    name: String,
    location: String,
    start: Date,
    end: Date,

})

EventSchema.plugin(mongoosePaginate)
const Event = mongoose.model('Event', EventSchema)

module.exports = Event;