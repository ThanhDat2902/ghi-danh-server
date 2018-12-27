var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var ClassSchema = new mongoose.Schema({
    name: String,
    event: {type: mongoose.Schema.Types.ObjectId, ref: 'Event'},
    describtion: String,
})

ClassSchema.plugin(mongoosePaginate)
const Classes = mongoose.model('Classes', ClassSchema)

module.exports = Classes;