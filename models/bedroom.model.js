var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var BedroomSchema = new mongoose.Schema({
    name: String,
    capacity: Number,
    house: String,
    gender: String,
    age: String
})

BedroomSchema.plugin(mongoosePaginate)
const Bedroom = mongoose.model('Bedroom', BedroomSchema)

module.exports = Bedroom;