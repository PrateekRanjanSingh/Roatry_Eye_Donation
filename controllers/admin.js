var Admin = require('../models/admin.js');
var express = require('express');
var router = express.Router();

router.get('/',function(req,res){
	console.log("Redirecting.....");
	res.redirect('/admin/login');
});
router.get('/create',function(req,res){
	if(!req.session.authenticated){
		return res.render('admin/login',{err:"Please Login."});
	}
	return res.render('admin/create');
});
router.get('/login',function(req,res){
	return res.render('admin/login');
});
router.post('/login',function(req,res){
	console.log(req.body);
	Admin.findOne({username:req.body.username},function(err,user){
		if(!user){
			return res.render('admin/login',{err:"Invalid Username/Password."});
		}
	 	var bcrypt=require('bcrypt-nodejs');
	 	if(bcrypt.compareSync(req.body.password,user.password)){
	 		req.session.user=user;
	 		req.session.authenticated=true;
	 		return res.redirect('/admin/panel');
	 	}	
	 	return res.render('admin/login',{err:"Invalid Username/Password."});
	});
});
router.get('/panel',function(req,res){
	console.log(req.session.user);
	if(req.session.authenticated){
		return res.render('admin/panel',{user:req.session.user});
	}
	return res.render('admin/login',{err:"Please Login."});
});
router.get('/logout',function(req,res){
	if(req.session.authenticated){
		delete req.session.user;
		req.session.authenticated=false;
	}
	return res.redirect('/admin/login');
});

module.exports = router;