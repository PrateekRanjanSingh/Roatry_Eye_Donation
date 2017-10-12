var mongoose = require('mongoose');
var schema = mongoose.Schema;

var flag=new schema({
	name:{
		type:'string'
	},
	fa_hus_name:{
		type:'string'
	},
	age:{
		type:'number'
	},
	deathdate:{
		type:'Date',
	},
	time_of_death:{
		type:'string'
	},
	donationdate:{
		type:'Date'
	},
	time_of_donation:{
		type:'string'
	},
	cause_of_death:{
		type:'string'
	},
	medical_history:{
		type:'string'
	},
	collec_num:{
		type:'number'
	}

});
var donor = mongoose.model('donor',flag);
module.exports = donor;