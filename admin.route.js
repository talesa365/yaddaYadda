const express = require('express');
const AdminRoute = express.Router();
const path = require('path');
const app = express();
const publicRoot = path.join(__dirname,'../','client');
app.use(express.static(publicRoot));
console.log(publicRoot);
app.use('/admin', (req, res)=>{
    console.log("Im Admin!")
        res.sendFile(publicRoot + '/admin.html')

})

const Admin = require('../models/admin.model');
    let admin = new Admin({
        admin_id: "t1admin",
        admin_password: "password",
        // file: payload
    })
    // admin.save()
const User = require('../models/users.model');
const QuickApply =  require('../models/quickApply.model');          
const RecoveryApply =  require('../models/recoveryApply.model'); 
const ReferralProgram =  require('../models/referralProgram.model'); 
const VolunteerDonation =  require('../models/volunteerDonation.model'); 
AdminRoute.route('/logIn').post(function (req, res) {
    console.log(req.headers);
    const obj = JSON.parse(req.headers.payload)
    console.log(obj.admin_id);
    
    Admin.findOne({admin_id: obj.admin_id}, function(err, admin){
        console.log(admin);
        
        if(!admin){
            var resObj = {
                err: "Error, Administation Not Found"
            }
            var payload = JSON.stringify(resObj)
            console.log(payload);
            
            res.send(payload)
        }else{
            console.log(obj);
            
            if(admin.admin_password != obj.admin_password){
                let err = {
                    message: "Your Administrative Credentials does not match any in the system, check with your supervisor"
                }
                err = JSON.stringify(err)
                console.log("here I am", err);
                
                res.send(err)
            }else{
                var payload = {
                    admin_id: admin._id,
                    auth: true
                }
                payload = JSON.stringify(payload)
                console.log(payload);
                res.send(payload)
            }
        }
    })
  });

  AdminRoute.route('/details').get(function (req, res) {
      let date = Date.now()
      console.log(date);

    QuickApply.find({'case_notes[1]': {'$exists':false}}, function(err, quickResults){ 
        RecoveryApply.find({'case_notes[1]': {'$exists':false}}, function(err, recoveryResults){
            ReferralProgram.find({'case_notes[1]': {'$exists':false}}, function(err, referralResults){
                VolunteerDonation.find({'case_notes[1]': {'$exists':false}}, function(err, volunteerResults){
                    let results = quickResults.concat(recoveryResults, referralResults, volunteerResults)
                    res.send(JSON.stringify(results))
                })
            })
        })


        // console.log("this is the err",err);
        // console.log("this is the client",results);
        // console.log(results);
    })
  });    

  function getUserName(id){
      User.findOne({_id:id}, (err, results)=>{
        return results
      })
  }
    
module.exports = AdminRoute