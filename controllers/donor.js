var Donor = require('../models/donor.js');
var Admin = require('../models/admin.js');
var express = require('express');
var router = express.Router();

router.get('/create',function(req,res){
	// if(!req.session.authenticated){
	// 	return res.render('admin/login',{err:"Please Login."});
	// }
	return res.render('donor/create');
});
router.post('/create',function(req,res){
	// if(!req.session.authenticated){
	// 	return res.render('admin/panel',{err:"Please Login."});
	// }
	Donor.create({name:req.body.name},function(err,donor){
		if(err){
			return res.render('admin/panel',{err:"Something Went Wrong."});
		}
		Admin.findOne({username:req.session.user.username},function(err,admin){
			donor.fa_hus_name = req.body.fa_hus_name;
			donor.age=req.body.age;
			donor.deathdate=req.body.deathdate;
			donor.time_of_death=req.body.time_of_death;
			donor.donationdate=req.body.donationdate;
			donor.time_of_donation=req.body.time_of_donation;
			donor.cause_of_death=req.body.cause_of_death;
			donor.medical_history=req.body.medical_history;
			admin.total_collection=admin.total_collection+1;
			admin.save();
			donor.collec_num=admin.total_collection;
			donor.save();
			return res.render('admin/panel',{msg:"Donor Added Successfully."});
		});
	});
});
router.get('/update',function(req,res){
	if(!req.session.authenticated){
		return res.render('admin/login',{err:"Please Login."});
	}
	Donor.findOne({collec_num:req.query.collec_num},function(err,donor){
		if(err){
			return res.render('admin/panel',{err:"Something Went Wrong."});
		}
		return res.render('donor/update',{donor:donor});
	});
});
router.post('/update',function(req,res){
	if(!req.session.authenticated){
		return res.render('admin/login',{err:"Please Login."});
	}
	Donor.findOne({collec_num:req.body.collec_num},function(err,donor){
		if(err){
			return res.render('admin/update',{collec_num:req.body.collec_num});
		}
		donor.fa_hus_name = req.body.fa_hus_name;
		donor.age=req.body.age;
		donor.deathdate=req.body.deathdate;
		donor.time_of_death=req.body.time_of_death;
		donor.donationdate=req.body.donationdate;
		donor.time_of_donation=req.body.time_of_donation;
		donor.cause_of_death=req.body.cause_of_death;
		donor.medical_history=req.body.medical_history;
		donor.total_collection=req.body.total_collection;
		donor.save();
		return res.render('admin/panel',{msg:"Donor Updated Successfully."});
	});
});
router.get('/details',function(req,res){
	Donor.find().sort({collec_num:-1}).exec(function(err,donors){
		console.log(donors);
		return res.render('donor/details',{donors:donors});
	});
});

module.exports = router;