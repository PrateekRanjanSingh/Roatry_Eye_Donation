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
	President.create({name:req.body},function(err,pres){
		pres.phoneno=req.body.phoneno;
		pres.email=req.body.email;
		pres.start=req.body.start;
		pres.end=req.body.end;
		pres.save();
		return res.render('admin/panel',{msg:"President Added Successfully."});
	});
});
router.get('/details',function(req,res){
	President.find(function(err,pres){
		return res.render('president/details',{pres:pres});
	});
});

module.exports = router;