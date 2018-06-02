var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

var ParticipantSchema = new mongoose.Schema({
    participant_id: Number,
    name: String,
    surname: String,
    gender: String,
    dharma_name: String,
    birth_date: Date,
    previous_seminars: String,
    
    arriaval_time: Date,
    arriaval_means_of_transport: String,
    arriaval_flightnumber: String,
    
    departure_time: Date,
    departure_means_of_transport: String,
    departure_flightnumber: String,
    
    address_street: String,
    address_number: String,
    address_city: String,
    address_zip_code: Number,
    address_country: String,
    
    telnr: Number,
    email: String,
    fees: Number,
    semiar_donation: Number,
    monk_donation: Number,
    rice_donation: Number,
    class: String,
    bedroom: {type: mongoose.Schema.Types.ObjectId, ref: 'Bedroom'},
    workgroup: String,
    tho_bo_tat_gioi: Boolean,
    tho_ngu_gioi: Boolean,
    recieved_nametag: Boolean,
    
})

ParticipantSchema.plugin(mongoosePaginate);
const Participant = mongoose.model('Participant', ParticipantSchema);

module.exports = Participant;