const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
let User = new Schema(
    {
        first_name: { 
        type: String
        },
        last_name: { 
            type: String
            },
        state:{
            type: String 
        },
        street_address:{
            type: String
        },
        city:{
            type: String
        },
        zip_code: {
            type: Number
        },
        phone: {
            type: Number
        },
        e_mail: {
            type: String
        },
        password: {
            type: String
        },
        username: {
            type: String
        },
    
        applications: {
            type: [String]
        },
        created_at:{
            type:Number
        },
        case_notes:{
            type: String
        }

    },{
        collection: 'users'
    }
)
module.exports = mongoose.model('User', User);
