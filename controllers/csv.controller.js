var ParticipantService = require('../services/participants.service')
var createCsvWriter = require('csv-writer').createObjectCsvWriter;

// Saving the context of this module inside the _the variable

_this = this

//Exporting all participants as CSV file

exports.getParticipantsCSV = async function(req,res,next){
	
	const csvWriter = createCsvWriter({
		path: '../file.csv',
		header: [
			{id: 'participant_id', title: 'participant_id'},
			{id: 'surname', title: 'surname'},
			{id: 'name', title: 'name'},
			{id: 'dharma_name', title: 'dharma_name'},
			{id: 'gender', title: 'gender'},
			{id: 'birth_date_read', title: 'birth_date'},
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
			{id: 'fees', title: 'fees'},
			{id: 'semiar_donation', title: 'semiar_donation'},
			{id: 'monk_donation', title: 'monk_donation'}

		]
	});

	var page = req.query.page ? req.query.page : 1
	var limit = req.query.limit ? req.query.limit : 1000;

	ParticipantService.getParticipants({}, page, limit)
		.then(function(value) {
			value.forEach(function(element){
				if (element.birth_date) {

				var d = element.birth_date;
				var mm = d.getMonth() + 1;
				var dd = d.getDate();
				var yy = d.getFullYear();

				element.birth_date_read = dd + '.' + mm + '.' + yy;

				}
			})

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
		path: '../nametag.csv',
		header: [
			{id: 'participant_id', title: 'participant_id'},
			{id: 'surname', title: 'surname'},
			{id: 'name', title: 'name'},
			{id: 'dharma_name', title: 'dharma_name'},
			{id: 'class', title: 'class'},
			{id: 'workgroup', title: 'workgroup'},
			{id: 'address_country', title: 'address_country'},
		]
	});

	var page = req.query.page ? req.query.page : 1
	var limit = req.query.limit ? req.query.limit : 1000;

	ParticipantService.getParticipants(
//		{$and: [
			{recieved_nametag:{$ne:true}
			// {$and:[{name: {$ne: null}}, {lastname: {$ne: ""}}]},
			// {$and:[{surname: {$ne: null}}, {surname: {$ne: ""}}]},
			// {$and:[{class: {$ne: null}}, {class: {$ne: ""}}]},
			// {$and:[{workgroup: {$ne: null}}, {workgroup: {$ne: ""}}]}
			// {$and:[{address_country: {$ne: null}}, {address_country: {$ne: ""}}]}
	//	]
	}
		, page, limit)
		.then(function(participantList) {

			participantList.forEach(function(item){
				//if(item.name != '' && item.surname != '' && item.class != '' && item.workgroup != '' && item.address_country != '' ){
					item.recieved_nametag = true;
					console.log(item);
					var updatedParticipant = ParticipantService.updateParticipant(item)
				//}
			}) ;
			csvWriter.writeRecords(participantList)       // returns a promise
			    .then(() => {
			        return res.status(200).download('../nametag.csv');
			    });
		});
}

exports.getParticipantNametagOverviewCSV = async function(req,res,next){

	const csvWriter = createCsvWriter({
		path: '../nametag.csv',
		header: [
			{id: 'participant_id', title: 'participant_id'},
			{id: 'surname', title: 'surname'},
			{id: 'name', title: 'name'},
			{id: 'dharma_name', title: 'dharma_name'},
			{id: 'class', title: 'class'},
			{id: 'workgroup', title: 'workgroup'},
			{id: 'address_country', title: 'address_country'},
		]
	});

	var page = req.query.page ? req.query.page : 1
	var limit = req.query.limit ? req.query.limit : 1000;

//{$and:[{"lastname": {"$ne": null}}, {"lastname": {"$ne": ""}}]},

	ParticipantService.getParticipants(
//		{$and: [
			{recieved_nametag:{$ne:true}
			// {$and:[{name: {$ne: null}}, {lastname: {$ne: ""}}]},
			// {$and:[{surname: {$ne: null}}, {surname: {$ne: ""}}]},
			// {$and:[{class: {$ne: null}}, {class: {$ne: ""}}]},
			// {$and:[{workgroup: {$ne: null}}, {workgroup: {$ne: ""}}]}
			// {$and:[{address_country: {$ne: null}}, {address_country: {$ne: ""}}]}
	//	]
	}
		, page, limit)
		.then(function(participantList) {

			participantList.forEach(function(item){
			}) ;
			csvWriter.writeRecords(participantList)       // returns a promise
			    .then(() => {
			        return res.status(200).download('../nametag.csv');
			    });
		});
}

//Exporting one participant as CSV file for certificate

exports.getParticipantCertificateCSV = async function(req,res,next){

	const csvWriter = createCsvWriter({
		path: '../certificate.csv',
		header: [
			{id: 'surname', title: 'surname'},
			{id: 'name', title: 'name'},
			{id: 'birth_date_read', title: 'birth_date'},
			{id: 'dharma_name', title: 'dharma_name'},
		]
	});

	var page = req.query.page ? req.query.page : 1
	var limit = req.query.limit ? req.query.limit : 1;

	ParticipantService.getParticipants({_id:req.params.id}, page, limit)
		.then(function(value) {

value.forEach(function(element){
				if (element.birth_date) {

				var d = element.birth_date;
				var mm = d.getMonth() + 1;
				var dd = d.getDate();
				var yy = d.getFullYear();

				element.birth_date_read = dd + '.' + mm + '.' + yy;

				}
			})

			csvWriter.writeRecords(value)       // returns a promise
			    .then(() => {
			        return res.status(200).download('../certificate.csv');
			    });
		});
}

//Exporting all participants as CSV file for p_list

exports.getParticipantsListCSV = async function(req,res,next){

	const csvWriter = createCsvWriter({
		path: '../p_list.csv',
		header: [
			{id: 'surname', title: 'surname'},
			{id: 'name', title: 'name'},
			{id: 'dharma_name', title: 'dharma_name'},
			{id: 'address_country', title: 'address_country'},
		]
	});

	var page = req.query.page ? req.query.page : 1
	var limit = req.query.limit ? req.query.limit : 1000;

	ParticipantService.getParticipants({}, page, limit)
		.then(function(value) {
			
			csvWriter.writeRecords(value)       // returns a promise
			    .then(() => {
			        console.log(value[0]);
			        return res.status(200).download('../p_list.csv');
			    });
		});
}

//Exporting all participants in one class as CSV file

exports.getParticipantsClassCSV = async function(req,res,next){
	
	const csvWriter = createCsvWriter({
		path: '../class.csv',
		header: [
			{id: 'participant_id', title: 'participant_id'},
			{id: 'surname', title: 'surname'},
			{id: 'name', title: 'name'},
			{id: 'dharma_name', title: 'dharma_name'},
			{id: 'address_country', title: 'address_country'},
			{id: 'birth_date_read', title: 'birth_date'},
		]
	});

	var page = req.query.page ? req.query.page : 1
	var limit = req.query.limit ? req.query.limit : 1000;

	ParticipantService.getParticipants({class: req.params.id}, page, limit)
		.then(function(value) {
			value.forEach(function(element){
				if (element.birth_date) {

				var d = element.birth_date;
				var yy = d.getFullYear();

				element.birth_date_read = yy;

				}
			})

			csvWriter.writeRecords(value)       // returns a promise
			    .then(() => {
			        console.log(value[0]);
			        return res.status(200).download('../class.csv');
			    });
		});
}
//Exporting all participants in one bedroom as CSV file

exports.getParticipantsBedroomCSV = async function(req,res,next){
	
	const csvWriter = createCsvWriter({
		path: '../bedroom.csv',
		header: [
			{id: 'surname', title: 'Ho'},
			{id: 'name', title: 'Ten'},
			{id: 'participant_id', title: 'Nr'},
			//{id: 'dharma_name', title: 'dharma_name'},
			//{id: 'arriaval_time', title: 'arriaval_time'},
			//{id: 'departure_time', title: 'departure_time'},
			//{id: 'address_country', title: 'address_country'},
		]
	});

	var page = req.query.page ? req.query.page : 1
	var limit = req.query.limit ? req.query.limit : 1000;

	ParticipantService.getParticipants({bedroom: req.params.id}, page, limit)
		.then(function(value) {
			
			csvWriter.writeRecords(value)       // returns a promise
			    .then(() => {
			        if(value[0]){console.log(value[0].arriaval_time);}
			        return res.status(200).download('../bedroom.csv');
			    });
		});

}

exports.getDonationsCSV = async function(req,res,next){
	
	const csvWriter = createCsvWriter({
		path: '../donations.csv',
		header: [
			{id: 'surname', title: 'surname'},
			{id: 'name', title: 'name'},
			{id: 'dharma_name', title: 'dharma_name'},
			{id: 'semiar_donation', title: 'semiar_donation'},
			{id: 'monk_donation', title: 'monk_donation'},
			{id: 'rice_donation', title: 'rice_donation'},

		]
	});

	var page = req.query.page ? req.query.page : 1
	var limit = req.query.limit ? req.query.limit : 1000;

	ParticipantService.getParticipants({}, page, limit)
		.then(function(value) {

			csvWriter.writeRecords(value)       // returns a promise
			    .then(() => {
			        return res.status(200).download('../donations.csv');
			    });
		});

}

exports.getMissingWorkgroupCSV = async function(req,res,next){

	const csvWriter = createCsvWriter({
		path: '../noWorkgroup.csv',
		header: [
			{id: 'surname', title: 'surname'},
			{id: 'name', title: 'name'},
			{id: 'dharma_name', title: 'dharma_name'},
		]
	});

	var page = req.query.page ? req.query.page : 1
	var limit = req.query.limit ? req.query.limit : 1;

	ParticipantService.getParticipants({$or: [{workgroup:""}, {workgroup: { $exists: false }}]}, page, limit)
		.then(function(value) {

			csvWriter.writeRecords(value)       // returns a promise
			    .then(() => {
			        console.log(value[0]);
			        return res.status(200).download('../noWorkgroup.csv');
			    });
		});
}

exports.getOvCSV = async function(req,res,next){

	const csvWriter = createCsvWriter({
		path: '../OanhVu.csv',
		header: [
			{id: 'surname', title: 'surname'},
			{id: 'name', title: 'name'},
			{id: 'dharma_name', title: 'dharma_name'},
			{id: 'address_country', title: 'address_country'},
			{id: 'birth_date_read', title: 'birth_date'},
		]
	});

	var page = req.query.page ? req.query.page : 1
	var limit = req.query.limit ? req.query.limit : 1000;

	var d = new Date(2006,00);

	ParticipantService.getParticipants({birth_date:{ $gt : d }}, page, limit)
		.then(function(value) {

value.forEach(function(element){
				if (element.birth_date) {

				var d = element.birth_date;
				var mm = d.getMonth() + 1;
				var dd = d.getDate();
				var yy = d.getFullYear();

				element.birth_date_read = dd + '.' + mm + '.' + yy;

				}
			})

			csvWriter.writeRecords(value)       // returns a promise
			    .then(() => {
			        console.log(value[0]);
			        
			        return res.status(200).download('../OanhVu.csv');
			    });
		});
}

exports.getThieuCSV = async function(req,res,next){

	const csvWriter = createCsvWriter({
		path: '../Thieu.csv',
		header: [
			{id: 'surname', title: 'surname'},
			{id: 'name', title: 'name'},
			{id: 'dharma_name', title: 'dharma_name'},
			{id: 'address_country', title: 'address_country'},
			{id: 'birth_date_read', title: 'birth_date'},
		]
	});

	var page = req.query.page ? req.query.page : 1
	var limit = req.query.limit ? req.query.limit : 1000;

	var d = new Date(2006,00);
	var d2 = new Date(2000,00);
		
	ParticipantService.getParticipants({birth_date:{$gt: d2,$lt: d}}, page, limit)
		.then(function(value) {

value.forEach(function(element){
				if (element.birth_date) {

				var d = element.birth_date;
				var mm = d.getMonth() + 1;
				var dd = d.getDate();
				var yy = d.getFullYear();

				element.birth_date_read = dd + '.' + mm + '.' + yy;

				}
			})

			csvWriter.writeRecords(value)       // returns a promise
			    .then(() => {
			        console.log(value[0]);
			        return res.status(200).download('../Thieu.csv');
			    });
		});
}

exports.getFastTrack = async function(req,res,next){
	
	const csvWriter = createCsvWriter({
		path: '../file.csv',
		header: [
			{id: 'participant_id', title: 'participant_id'},
			{id: 'surname', title: 'surname'},
			{id: 'name', title: 'name'},
			{id: 'birth_date_read', title: 'birth_date'},
			{id: 'address_country', title: 'address_country'},
			{id: 'arriaval_time_read', title: 'arriaval_time'},
			{id: 'departure_time_read', title: 'departure_time'},
			{id: 'class', title: 'class'},
			{id: 'workgroup', title: 'workgroup'},
			{id: 'dharma_name', title: 'dharma_name'},
			{id: 'fees', title: 'fees'}
		]
	});

	var page = req.query.page ? req.query.page : 1
	var limit = req.query.limit ? req.query.limit : 1000;

	ParticipantService.getParticipants(		

//noBed
		//{bedroom: {$exists: false}}, page, limit)

	//Fasttrack 


		// {$and: [
		// 	{$and:[{name: {$not: null}}, {name: {$not: ""}}]},
		// 	{$and:[{surname: {$not: null}}, {surname: {$not: ""}}]},
		// 	{$and:[{class: {$not: null}}, {class: {$not: ""}}]},
		// 	{$and:[{workgroup: {$not: null}}, {workgroup: {$not: ""}}]},
		// 	{$and:[{address_country: {$not: null}}, {address_country: {$not: ""}}]},
		// 	{$and:[{arriaval_time: {$not: null}}, {arriaval_time: {$not: ""}}]},
		// 	{$and:[{departure_time: {$not: null}}, {departure_time: {$not: ""}}]}
		// ]}

		{$or: [
			{name: {$exists: false}},
			{surname: {$exists: false}},
			{class: {$exists: false}},
			{workgroup: {$exists: false}},
			{address_country: {$exists: false}},
			{arriaval_time: {$exists: false}},
			{departure_time: {$exists: false}}
			]}
		, page, limit)

		.then(function(value) {
			value.forEach(function(element){
				if (element.birth_date) {

				var d = element.birth_date;
				var mm = d.getMonth() + 1;
				var dd = d.getDate();
				var yy = d.getFullYear();

				element.birth_date_read = dd + '.' + mm + '.' + yy;

				}

				if (element.arriaval_time) {

				var d = element.arriaval_time;
				var mm = d.getMonth() + 1;
				var dd = d.getDate();
				var yy = d.getFullYear();

				element.arriaval_time_read = dd + '.' + mm + '.' + yy;

				}

				if (element.departure_time) {

				var d = element.departure_time;
				var mm = d.getMonth() + 1;
				var dd = d.getDate();
				var yy = d.getFullYear();

				element.departure_time_read = dd + '.' + mm + '.' + yy;

				}
			})

			csvWriter.writeRecords(value)       // returns a promise
			    .then(() => {
			        console.log(value[0]);
			        return res.status(200).download('../file.csv');
			    });
		});

}
