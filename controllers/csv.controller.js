var ParticipantService = require('../services/participants.service')
var createCsvWriter = require('csv-writer').createObjectCsvWriter;

// Saving the context of this module inside the _the variable

_this = this

//Exporting all participants as CSV file

exports.getParticipantsCSV = async function(req,res,next){
	
	const csvWriter = createCsvWriter({
		path: '../file.csv',
		header: [
			{id: 'surname', title: 'surname'},
			{id: 'name', title: 'name'},
			{id: 'dharma_name', title: 'dharma_name'},
			{id: 'gender', title: 'gender'},
			{id: 'birth_date', title: 'birth_date'},
			{id: 'address_street', title: 'address_street'},
			{id: 'address_number', title: 'address_number'},
			{id: 'address_zip_code', title: 'address_zip_code'},
			{id: 'address_city', title: 'address_city'},
			{id: 'address_country', title: 'address_country'},
			{id: 'telnr', title: 'telnr'},
			{id: 'email', title: 'email'},
			{id: 'arriaval_time', title: 'arriaval_time'},
			{id: 'arriaval_means_of_transport', title: 'arriaval_means_of_transport'},
			{id: 'arriaval_flightnumber', title: 'arriaval_flightnumber'},
			{id: 'departure_time', title: 'departure_time'},
			{id: 'departure_means_of_transport', title: 'departure_means_of_transport'},
			{id: 'departure_flightnumber', title: 'departure_flightnumber'},
			{id: 'previous_seminars', title: 'previous_seminars'},
			{id: 'class', title: 'class'},
			{id: 'workgroup', title: 'workgroup'},
			{id: 'tho_ngu_gioi', title: 'tho_ngu_gioi'},
			{id: 'tho_bo_tat_gioi', title: 'tho_bo_tat_gioi'},
		]
	});

	var page = req.query.page ? req.query.page : 1
	var limit = req.query.limit ? req.query.limit : 1000;

	ParticipantService.getParticipants({}, page, limit)
		.then(function(value) {

			csvWriter.writeRecords(value)       // returns a promise
			    .then(() => {
			        console.log(value[0]);
			        return res.status(200).download('../file.csv');
			    });
		});

}

//Exporting one participant as CSV file for nametag 

exports.getParticipantNametagCSV = async function(req,res,next){

	const csvWriter = createCsvWriter({
		path: '../file.csv',
		header: [
			{id: 'surname', title: 'surname'},
			{id: 'name', title: 'name'},
			{id: 'dharma_name', title: 'dharma_name'},
			{id: 'class', title: 'class'},
			{id: 'workgroup', title: 'workgroup'},
			{id: 'address_country', title: 'address_country'},
		]
	});

	var page = req.query.page ? req.query.page : 1
	var limit = req.query.limit ? req.query.limit : 1;

	ParticipantService.getParticipants({recieved_nametag:false}, page, limit)
		.then(function(participantList) {

			participantList.forEach(function(item){

				item.recieved_nametag = true;
				console.log(item);
				var updatedParticipant = ParticipantService.updateParticipant(item)
			}) ;
			csvWriter.writeRecords(participantList)       // returns a promise
			    .then(() => {
			        return res.status(200).download('../file.csv');
			    });
		});
}

//Exporting one participant as CSV file for certificate

exports.getParticipantCertificateCSV = async function(req,res,next){

	const csvWriter = createCsvWriter({
		path: '../file.csv',
		header: [
			{id: 'surname', title: 'surname'},
			{id: 'name', title: 'name'},
			{id: 'birth_date', title: 'birth_date'},
			{id: 'dharma_name', title: 'dharma_name'},
		]
	});

	var page = req.query.page ? req.query.page : 1
	var limit = req.query.limit ? req.query.limit : 1;

	ParticipantService.getParticipants({_id:req.params.id}, page, limit)
		.then(function(value) {

			csvWriter.writeRecords(value)       // returns a promise
			    .then(() => {
			        console.log(value[0]);
			        return res.status(200).download('../file.csv');
			    });
		});
}

//Exporting all participants as CSV file for p_list

exports.getParticipantsListCSV = async function(req,res,next){

	const csvWriter = createCsvWriter({
		path: '../file.csv',
		header: [
			{id: 'surname', title: 'surname'},
			{id: 'name', title: 'name'},
			{id: 'dharma_name', title: 'dharma_name'},
			{id: 'address_country', title: 'address_country'},
		]
	});

	var page = req.query.page ? req.query.page : 1
	var limit = req.query.limit ? req.query.limit : 1;

	ParticipantService.getParticipants({}, page, limit)
		.then(function(value) {
			
			csvWriter.writeRecords(value)       // returns a promise
			    .then(() => {
			        console.log(value[0]);
			        return res.status(200).download('../file.csv');
			    });
		});
}

//Exporting all participants in one class as CSV file

exports.getParticipantsClassCSV = async function(req,res,next){
	
	const csvWriter = createCsvWriter({
		path: '../file.csv',
		header: [
			{id: 'surname', title: 'surname'},
			{id: 'name', title: 'name'},
			{id: 'dharma_name', title: 'dharma_name'},
			{id: 'address_country', title: 'address_country'},
		]
	});

	var page = req.query.page ? req.query.page : 1
	var limit = req.query.limit ? req.query.limit : 1000;

	ParticipantService.getParticipants({class: req.params.id}, page, limit)
		.then(function(value) {

			csvWriter.writeRecords(value)       // returns a promise
			    .then(() => {
			        console.log(value[0]);
			        return res.status(200).download('../file.csv');
			    });
		});

}

//Exporting all participants in one bedroom as CSV file

exports.getParticipantsBedroomCSV = async function(req,res,next){
	
	const csvWriter = createCsvWriter({
		path: '../file.csv',
		header: [
			{id: 'surname', title: 'surname'},
			{id: 'name', title: 'name'},
			{id: 'dharma_name', title: 'dharma_name'},
			{id: 'arriaval_time', title: 'arriaval_time'},
			{id: 'departure_time', title: 'departure_time'},
			{id: 'address_country', title: 'address_country'},
		]
	});

	var page = req.query.page ? req.query.page : 1
	var limit = req.query.limit ? req.query.limit : 1000;

	ParticipantService.getParticipants({bedroom: req.params.id}, page, limit)
		.then(function(value) {
			
			csvWriter.writeRecords(value)       // returns a promise
			    .then(() => {
			        if(value[0]){console.log(value[0].arriaval_time);}
			        console.log(new Date());
			        return res.status(200).download('../file.csv');
			    });
		});

}