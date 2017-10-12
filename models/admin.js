var mongoose = require('mongoose');
var schema = mongoose.Schema;

var flag = new schema({
	username:{
		type:'string'
	},
	password:{
		type:'string'
	},
	confirmpassword:{
		type:'string'
	},
	current_pres:{
		type:'string'
	},
	total_collection:{
		type:'number'
	}
});
var admin = mongoose.model('admin',flag);
module.exports = admin;
