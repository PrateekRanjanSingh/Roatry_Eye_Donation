var mongoose = require('mongoose');
var schema = mongoose.Schema;

var flag = new schema({
	name:{
		type:'string'
	},
	phoneno:{
		type:'string'
	},
	email:{
		type:'string'
	},
	start:{
		type:'string'
	},
	end:{
		type:'string'
	}
});
var president = mongoose.model('president',flag);
module.exports = president;