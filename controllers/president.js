var President = require('../models/president.js');
var express = require('express');
var router = express.Router();

router.get('/create',function(req,res){
	// if(!req.session.authenticated){
	// 	console.log(req.originalUrl);
	// 	console.log("TEST");
	// 	return res.render('admin/login',{err:"Please Login."});
	// }
	return res.render('president/create');
});
router.post('/create',function(req,res){
	// if(!req.session.authenticated){
	// 	return res.render('admin/login',{err:"Please Login."});
	// }
	President.create({name:req.body.name},function(err,pres){
		if(err){
			console.log(err);
			return;
		}
		pres.phoneno=req.body.phoneno;
		pres.email=req.body.email;
		pres.start=req.body.start;
		pres.end=req.body.end;
		pres.save();
		return res.render('admin/panel',{msg:"President Added Successfully."});
	});
});

router.get('/update',function(req,res){
	President.findOne({phoneno:req.query.phoneno},function(err,pres){
		if(!pres){
			res.render('admin/panel',{err:"No Such Record Exists."});
		}
		return res.render('president/update',{pres:pres});
	});
});

router.post('/update',function(req,res){
	var obj = {name:req.body.name,email:req.body.email,start:req.body.start,end:req.body.end};
	President.findOne({phoneno:req.body.phone},(err,data) => {
		console.log(data);
	});

	President.findOneAndUpdate({phoneno:req.body.phoneno},obj,{upsert:true},function(err,pres){
		if(err){
			return res.render('admin/panel',{err:"Something Went Wrong."});
		}
		return res.render('admin/panel',{msg:"Record Update Successfully."});
	});
});

router.get('/details',function(req,res){
	President.find(function(err,pres){
		return res.render('president/details',{pres:pres});
	});
});

module.exports = router;