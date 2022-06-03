const express = require('express');
const UserRoute = express.Router();

// Require user models in our routes module
let User = require('../models/users.model');
let QuickApply = require('../models/quickApply.model');
let RecoveryApply = require('../models/recoveryApply.model');
let ReferralProgram = require('../models/referralProgram.model');
let VolunteerDonation = require('../models/volunteerDonation.model');


UserRoute.route('/add').post(function (req, res){
    console.log("Im Loggin Add!");
    
    console.log(req);
    let user = new User(req.body);
    user.save()
    .then( user => {
        res.status(200).json({'user': 'user logged in sucessfully'});
    })
    .catch(err => {
        res.status(400).send("unable to save to database");
    });
});

UserRoute.route('/logIn').post(function (req, res) {  
    User.findOne({username: req.body.username}, function(err, user){   
        if(!user){
            var resObj = {
                err: "Error, User Not Found"
            }
            var payload = JSON.stringify(resObj)
            res.send(payload)
        }else{
            if(user.password != req.body.password){
                let err = {
                    message: "Your username or password does not match a known user"
                }
                err = JSON.stringify(err) 
                res.send(err)
            }else{
                var payload = {
                    userId: user._id,
                    auth: true
                }
                payload = JSON.stringify(payload)
                console.log(payload);
                res.send(payload)
            }
        }
    })
  });

UserRoute.route('/register').post(function (req, res){
    console.log("User Registered!");
    let customerInfo = JSON.parse(req.headers.payload)
    customerInfo.applications = []
    User.find({e_mail:customerInfo.e_mail}, function (err, results){
        console.log(err)
        console.log(results)
        if(results.length > 0){
            let err = {
                message: "Your E_mail already appears in our system, try logging in or contact our office if you feel you have reached this error by mistake."
            }
            err = JSON.stringify(err)
            res.send(err)
        }else{
            let user = new User(customerInfo);
            user.save()
            .then( user => {
                res.status(200).json({'user': 'user added sucessfully'});
            })
            .catch(err => {
                res.status(400).send("unable to save to database");
            });
        }
    })
});

UserRoute.route('/quickApply').post(function (req, res){
    console.log("Quick Applicant!");
    let payload = JSON.parse(req.headers.payload)
    payload.created_at = Date.now()
    payload.case_notes = ""
    console.log("im a payload",payload);
    User.findById(payload.userId, function (err, results){
        // console.log(`err:${err} ....... results:${results}`);
        let quickApply = new QuickApply(payload);
        quickApply.save() 
        .then( quickApply => {
            results.applications.push("quickApply")
            results.save()
            res.status(200).json({'user': 'info added sucessfully'});  
        })
        .catch(err => {
            res.status(500).send("unable to save to database");
     
        });
    })
});

UserRoute.route('/recoveryApply').post(function (req, res){
    console.log("Yadda House Applicant!");
    let payload = JSON.parse(req.headers.payload)
    console.log(payload);
    payload.created_at = Date.now()
    payload.case_notes = ""
    User.findById(payload.userId, function (err, results){
        // console.log(`err:${err} ....... results:${results}`);
        let recoveryApply = new RecoveryApply(payload);
        recoveryApply.save() 
        .then( recoveryApply => {
            results.applications.push("recoveryApply")
            results.save()
            res.status(200).json({'user': 'info added sucessfully'});  
        })
        .catch(err => {
            res.status(500).send("unable to save to database");
     
        });
    })

    
});


UserRoute.route('/referralProgram').post(function (req, res){
    console.log("referral Program Request!");
    let payload = JSON.parse(req.headers.payload)
    console.log(payload);
    payload.created_at = Date.now()
    payload.case_notes = ""
    User.findById(payload.userId, function (err, results){
        // console.log(`err:${err} ....... results:${results}`);
        let referralProgram = new ReferralProgram(payload);
        referralProgram.save() 
        .then( referralProgram => {
            results.applications.push("referralProgram")
            results.save()
            res.status(200).json({'user': 'Request for referral successfully submitted'});  
        })
        .catch(err => {
            res.status(500).send("unable to process request");
     
        });
    })

    
});


UserRoute.route('/volunteerDonation').post(function (req, res){
    console.log("volunteer and donations arrived!");
    let payload = JSON.parse(req.headers.payload)
    console.log(payload);
    payload.created_at = Date.now()
    payload.case_notes = ""
    User.findById(payload.userId, function (err, results){
        // console.log(`err:${err} ....... results:${results}`);
        let volunteerDonation = new VolunteerDonation(payload);
        volunteerDonation.save() 
        .then( volunteerDonation => {
            results.applications.push("volunteerDonation")
            results.save()
            res.status(200).json({'user': 'Your request to donate has been sent'});  
        })
        .catch(err => {
            res.status(500).send("unable to send your request");
     
        });
    })

    
});

module.exports = UserRoute