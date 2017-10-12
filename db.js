var mongoose = require('mongoose');

var state={
	db:null
}
module.exports = {
	connect:function(url,done){
		if(state.db) return done();
		mongoose.connect(url,function(err,db){
			if(err) return done(err);
			state.db=db;
			return state.db;
			done();
 		});
	},
	get:function(){
		return state.db;
	},
	close:function(done){
		if(state.db){
			state.db.close(function(err,rest){
				state.db=null;
				state.mode=null;
				done();
			});
		}
	}
};